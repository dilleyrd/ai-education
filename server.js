/**
 * AI Roadmap — server
 *
 * Serves the static frontend, the curriculum API, and proxies all
 * generative/agentic AI features to Gemini 2.5 Flash via OpenRouter
 * (https://openrouter.ai/google/gemini-2.5-flash).
 *
 * The OpenRouter key never reaches the browser; every model call goes
 * through this server.
 */
require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { randomUUID } = require('crypto');
const curriculum = require('./data/curriculum');

const app = express();
const PORT = process.env.PORT || 3000;

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash';
const API_KEY = process.env.OPENROUTER_API_KEY;

// Models the client may select for generative features. The env default is
// always included; requests asking for anything off this list fall back to it.
const MODELS = Array.from(
  new Set([
    MODEL,
    'google/gemini-2.5-flash',
    'google/gemini-3-flash-preview',
    'google/gemini-3.5-flash',
    'google/gemini-3.1-pro-preview',
  ])
);
const pickModel = (body) => (MODELS.includes(body?.model) ? body.model : MODEL);

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

/* ------------------------------------------------------------------ */
/* Curriculum API                                                      */
/* ------------------------------------------------------------------ */

app.get('/api/status', (req, res) => {
  res.json({ aiEnabled: Boolean(API_KEY), model: MODEL, models: MODELS });
});

/* ------------------------------------------------------------------ */
/* Learner profiles & progress                                         */
/*                                                                     */
/* Storage: storage/profiles.json — a flat JSON file persisted on      */
/* every mutation (debounced). Each profile records completed lectures */
/* (keyed moduleId/courseIdx/lessonIdx) and best knowledge-check       */
/* scores (keyed moduleId/courseIdx); course and module completion are */
/* derived from those on the client.                                   */
/* ------------------------------------------------------------------ */

const STORE_DIR = path.join(__dirname, 'storage');
const PROFILES_FILE = path.join(STORE_DIR, 'profiles.json');

let profiles = {};
try {
  profiles = JSON.parse(fs.readFileSync(PROFILES_FILE, 'utf8'));
} catch {
  profiles = {};
}

let saveTimer = null;
function saveProfiles() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      fs.mkdirSync(STORE_DIR, { recursive: true });
      fs.writeFileSync(PROFILES_FILE, JSON.stringify(profiles, null, 2));
    } catch (e) {
      console.error('Failed to persist profiles:', e.message);
    }
  }, 100);
}

app.get('/api/profiles', (req, res) => {
  res.json(
    Object.values(profiles)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .map(({ id, name, role, createdAt }) => ({ id, name, role, createdAt }))
  );
});

app.post('/api/profiles', (req, res) => {
  const name = String(req.body.name || '').trim().slice(0, 60);
  const role = String(req.body.role || '').trim().slice(0, 80);
  if (!name) return res.status(400).json({ error: 'A profile name is required' });
  const id = randomUUID();
  profiles[id] = {
    id,
    name,
    role,
    createdAt: new Date().toISOString(),
    progress: { lectures: {}, quizzes: {} },
  };
  saveProfiles();
  res.status(201).json(profiles[id]);
});

app.get('/api/profiles/:id', (req, res) => {
  const p = profiles[req.params.id];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  res.json(p);
});

app.delete('/api/profiles/:id', (req, res) => {
  if (!profiles[req.params.id]) return res.status(404).json({ error: 'Profile not found' });
  delete profiles[req.params.id];
  saveProfiles();
  res.json({ ok: true });
});

// Record progress. Lecture: { type:'lecture', key:'modId/ci/li', done:true|false }
// Quiz:                    { type:'quiz', key:'modId/ci', data:{score,total,pct} }
app.post('/api/profiles/:id/progress', (req, res) => {
  const p = profiles[req.params.id];
  if (!p) return res.status(404).json({ error: 'Profile not found' });
  const { type, key, done = true, data } = req.body;

  if (type === 'lecture') {
    const m = String(key || '').match(/^([\w-]+)\/(\d+)\/(\d+)$/);
    const mod = m && curriculum.find((c) => c.id === m[1]);
    const lesson = mod?.courses?.[Number(m[2])]?.lessons?.[Number(m[3])];
    if (!lesson) return res.status(400).json({ error: 'Invalid lecture key' });
    if (done) p.progress.lectures[key] = new Date().toISOString();
    else delete p.progress.lectures[key];
  } else if (type === 'quiz') {
    const m = String(key || '').match(/^([\w-]+)\/(\d+)$/);
    const mod = m && curriculum.find((c) => c.id === m[1]);
    if (!mod?.courses?.[Number(m[2])]) return res.status(400).json({ error: 'Invalid quiz key' });
    const pct = Number(data?.pct) || 0;
    const prev = p.progress.quizzes[key];
    if (!prev || pct >= prev.pct) {
      p.progress.quizzes[key] = {
        score: Number(data?.score) || 0,
        total: Number(data?.total) || 0,
        pct,
        at: new Date().toISOString(),
      };
    }
  } else {
    return res.status(400).json({ error: 'Unknown progress type' });
  }

  saveProfiles();
  res.json(p);
});

// Catalog: summaries only (keeps the payload light).
app.get('/api/curriculum', (req, res) => {
  res.json(
    curriculum.map((m) => ({
      id: m.id,
      number: m.number,
      title: m.title,
      track: m.track,
      level: m.level,
      duration: m.duration,
      tagline: m.tagline,
      stage: m.stage || null,
      courseCount: m.courses.length,
      lessonCount: m.courses.reduce((n, c) => n + c.lessons.length, 0),
    }))
  );
});

app.get('/api/curriculum/:id', (req, res) => {
  const mod = curriculum.find((m) => m.id === req.params.id);
  if (!mod) return res.status(404).json({ error: 'Module not found' });
  res.json(mod);
});

/* ------------------------------------------------------------------ */
/* OpenRouter helpers                                                  */
/* ------------------------------------------------------------------ */

function requireKey(res) {
  if (!API_KEY) {
    res.status(503).json({
      error:
        'OPENROUTER_API_KEY is not configured. Copy .env.example to .env, add your key from https://openrouter.ai/keys, and restart the server.',
    });
    return false;
  }
  return true;
}

async function callModel(messages, { temperature = 0.7, json = false, model = MODEL } = {}) {
  const body = {
    model,
    messages,
    temperature,
  };
  if (json) body.response_format = { type: 'json_object' };

  const r = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:' + PORT,
      'X-Title': 'AI Roadmap',
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`OpenRouter ${r.status}: ${text.slice(0, 500)}`);
  }
  const data = await r.json();
  return data.choices?.[0]?.message?.content ?? '';
}

// Extract a JSON object even if the model wraps it in markdown fences.
function parseModelJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object in model response');
  return JSON.parse(raw.slice(start, end + 1));
}

/* ------------------------------------------------------------------ */
/* DuckDuckGo web search (neo-ddg-search pattern: no API key, scrape   */
/* the HTML endpoint and decode the uddg redirect parameter).          */
/* ------------------------------------------------------------------ */

async function ddgSearch(query, max = 6) {
  const r = await fetch(
    'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(query),
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      },
    }
  );
  if (!r.ok) throw new Error(`DuckDuckGo ${r.status}`);
  const html = await r.text();

  const results = [];
  const linkRe = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  const snipRe = /<a[^>]+class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;
  const strip = (s) =>
    s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;/g, "'")
     .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();

  const snippets = [];
  let sm;
  while ((sm = snipRe.exec(html)) !== null) snippets.push(strip(sm[1]));

  let m;
  while ((m = linkRe.exec(html)) !== null && results.length < max) {
    let url = m[1];
    // DDG wraps targets: //duckduckgo.com/l/?uddg=<encoded>&rut=...
    const uddg = url.match(/uddg=([^&]+)/);
    if (uddg) url = decodeURIComponent(uddg[1]);
    if (!/^https?:\/\//.test(url)) continue;
    if (/duckduckgo\.com/.test(url)) continue;
    results.push({
      title: strip(m[2]),
      url,
      snippet: snippets[results.length] || '',
    });
  }
  return results;
}

function moduleContext(moduleId, courseIndex) {
  const mod = curriculum.find((m) => m.id === moduleId);
  if (!mod) return '';
  let ctx = `MODULE: ${mod.title}\nLEVEL: ${mod.level}\nSUMMARY: ${mod.description}\n`;
  const course = mod.courses[courseIndex];
  if (course) {
    ctx += `\nCURRENT COURSE: ${course.title}\n${course.summary}\nLESSONS:\n`;
    for (const l of course.lessons) ctx += `- ${l.title}: ${l.detail}\n`;
    if (course.examples?.length) {
      ctx += `REAL-WORLD IMPLEMENTATIONS DISCUSSED:\n`;
      for (const e of course.examples) ctx += `- ${e.name}: ${e.detail}\n`;
    }
  } else {
    ctx += `\nCOURSES IN THIS MODULE:\n`;
    for (const c of mod.courses) ctx += `- ${c.title}: ${c.summary}\n`;
  }
  return ctx;
}

/* ------------------------------------------------------------------ */
/* AI Tutor — streaming chat grounded in the current lesson            */
/* ------------------------------------------------------------------ */

app.post('/api/ai/tutor', async (req, res) => {
  if (!requireKey(res)) return;
  const { moduleId, courseIndex, messages = [] } = req.body;

  const system = [
    'You are the AI Roadmap Tutor, an expert instructor on applied AI for business and engineering.',
    `Today's date is ${new Date().toISOString().slice(0, 10)}; AI moves fast, so prefer the most`,
    'current tools and examples you know, date your claims, and tell the learner when something',
    'is changing quickly enough that they should re-verify it.',
    'Answer questions grounded in the course context below. Be concrete and practical;',
    'cite real tools, vendors, and implementations when relevant. Keep answers tight —',
    'a few short paragraphs or a list. Use plain markdown. If a question is outside the',
    'course scope, answer briefly and steer the learner back to the material.',
    '',
    moduleContext(moduleId, courseIndex),
  ].join('\n');

  try {
    const upstream = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:' + PORT,
        'X-Title': 'AI Roadmap',
      },
      body: JSON.stringify({
        model: pickModel(req.body),
        stream: true,
        temperature: 0.6,
        messages: [{ role: 'system', content: system }, ...messages.slice(-12)],
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      return res.status(502).json({ error: `OpenRouter ${upstream.status}: ${text.slice(0, 300)}` });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') continue;
        try {
          const delta = JSON.parse(payload).choices?.[0]?.delta?.content;
          if (delta) res.write(`data: ${JSON.stringify({ delta })}\n\n`);
        } catch {
          /* partial frame — ignored */
        }
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    if (!res.headersSent) res.status(500).json({ error: err.message });
    else res.end();
  }
});

/* ------------------------------------------------------------------ */
/* Knowledge check — generates a graded quiz for a course              */
/* ------------------------------------------------------------------ */

app.post('/api/ai/quiz', async (req, res) => {
  if (!requireKey(res)) return;
  const { moduleId, courseIndex } = req.body;
  const ctx = moduleContext(moduleId, courseIndex);
  if (!ctx) return res.status(400).json({ error: 'Unknown module' });

  const prompt = [
    'Generate a knowledge check for the course below. Return ONLY a JSON object:',
    '{"questions":[{"q":"...","options":["...","...","...","..."],"answer":0,"why":"one-sentence explanation"}]}',
    'Rules: exactly 5 questions, 4 options each, "answer" is the index of the correct option,',
    'questions must test applied understanding (scenarios, trade-offs, real implementations),',
    'not trivia. Vary which index is correct.',
    '',
    ctx,
  ].join('\n');

  try {
    const text = await callModel([{ role: 'user', content: prompt }], {
      temperature: 0.8,
      json: true,
      model: pickModel(req.body),
    });
    const quiz = parseModelJson(text);
    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
      throw new Error('Model returned no questions');
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------------------------------------------------------ */
/* Lecture — interactive lesson delivery                               */
/*                                                                     */
/* 1. DuckDuckGo search finds current sources for the lesson topic.    */
/* 2. Gemini 2.5 Flash delivers the lecture as a course instructor,    */
/*    grounded in module + course + lesson context, citing the found   */
/*    sources as [1]..[n].                                             */
/* SSE events: {links:[...]}, {delta:"..."}, [DONE]                    */
/* ------------------------------------------------------------------ */

app.post('/api/ai/lecture', async (req, res) => {
  if (!requireKey(res)) return;
  const { moduleId, courseIndex, lessonIndex } = req.body;

  const mod = curriculum.find((m) => m.id === moduleId);
  const course = mod?.courses?.[courseIndex];
  const lesson = course?.lessons?.[lessonIndex];
  if (!lesson) return res.status(400).json({ error: 'Unknown module/course/lesson' });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  const send = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);

  // 1. Find sources for further exploration (best-effort — the lecture
  //    proceeds even if the search fails).
  let links = [];
  try {
    // Year-stamped query biases results toward current material.
    links = await ddgSearch(`${lesson.title} ${course.title} AI ${new Date().getFullYear()}`, 6);
    if (links.length < 3) {
      links = links.concat(await ddgSearch(`${lesson.title} ${mod.title}`, 6 - links.length));
    }
  } catch (e) {
    console.warn('DDG search failed:', e.message);
  }
  send({ links });

  // 2. Stream the lecture.
  const sourceList = links.length
    ? links.map((l, i) => `[${i + 1}] ${l.title} — ${l.url}\n    ${l.snippet}`).join('\n')
    : '(no web sources available — rely on your own knowledge)';

  const today = new Date().toISOString().slice(0, 10);
  const system = [
    `You are a subject-matter expert at AI Roadmap presenting a professional briefing to one`,
    `practitioner. Your register is that of a polished conference speaker or technical keynote —`,
    `authoritative, direct, and engaging, but NOT a schoolteacher addressing a classroom.`,
    `Do NOT open with classroom theatrics ("Okay class, take your seats", "Welcome back, everyone",`,
    `"Today we'll learn..."), do not address a group ("you all", "class"), and do not use chalkboard`,
    `filler. Open immediately with a sharp, substantive hook that lands on the topic. Address the`,
    `single reader as "you". Be clear, concrete, and never fluffy.`,
    ``,
    `TODAY'S DATE: ${today}. AI technology moves extremely fast and your training data may lag.`,
    `RECENCY RULES (critical — stale information destroys this academy's credibility):`,
    `- Prioritize the MOST CURRENT data, tools, model names, and deployments you know of, and prefer`,
    `  facts from the web sources below (they are live search results) over older memorized examples.`,
    `- Attach dates or timeframes to claims and examples wherever possible ("as of 2025...", "in the`,
    `  2024 study...") so the student can judge freshness.`,
    `- If a well-known example is more than ~2 years old, either replace it with a newer one or`,
    `  explicitly label it as an older landmark case.`,
    `- Where the field is moving fast (model capabilities, vendor landscape, pricing, regulations),`,
    `  say so explicitly and tell the student what to re-verify before acting.`,
    ``,
    `LECTURE ASSIGNMENT`,
    `Module ${mod.number}: ${mod.title} (${mod.level})`,
    `Course: ${course.title}`,
    `Lesson (the focus of this lecture): "${lesson.title}" — ${lesson.detail}`,
    ``,
    `COURSE CONTEXT`,
    moduleContext(moduleId, courseIndex),
    ``,
    `WEB SOURCES (cite inline as [1], [2]... where relevant; the student sees these as clickable links):`,
    sourceList,
    ``,
    `REQUIREMENTS`,
    `- 700-1000 words of markdown. Structure: a 1-2 sentence hook, then 3-5 sections with ## headings,`,
    `  then a "## Key takeaways" list, then "## Try this now" with one concrete exercise the student`,
    `  can do today.`,
    `- Include at least two CONCRETE, CURRENT implementation examples (real companies, tools, or`,
    `  published deployments) with specifics — numbers, product names, what was actually built.`,
    `- Where a web source supports a claim, cite it inline as [n].`,
    `- Stay focused on this one lesson; do not re-teach the whole course.`,
    `- FORMATTING: when code helps, use fenced code blocks with a language tag (e.g. \`\`\`python).`,
    `  Write equations in LaTeX — $...$ inline, $$...$$ display — never as plain-text approximations.`,
    `  The student's reader renders syntax highlighting and math properly.`,
  ].join('\n');

  try {
    const upstream = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:' + PORT,
        'X-Title': 'AI Roadmap',
      },
      body: JSON.stringify({
        model: pickModel(req.body),
        stream: true,
        temperature: 0.7,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: `Deliver the lecture on "${lesson.title}" now.` },
        ],
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      send({ error: `OpenRouter ${upstream.status}: ${text.slice(0, 300)}` });
      return res.end();
    }

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') continue;
        try {
          const delta = JSON.parse(payload).choices?.[0]?.delta?.content;
          if (delta) send({ delta });
        } catch { /* partial frame */ }
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    send({ error: err.message });
    res.end();
  }
});

/* ------------------------------------------------------------------ */
/* Text-to-speech — reads lecture text aloud                           */
/*                                                                     */
/* Proxies OpenRouter's OpenAI-compatible speech endpoint with         */
/* hexgrad/kokoro-82m ($0.62/M characters). The client sends one       */
/* cleaned text chunk at a time and queues playback; this keeps        */
/* time-to-first-audio low and stays within the model's comfortable    */
/* input size.                                                         */
/* ------------------------------------------------------------------ */

const TTS_MODEL = process.env.OPENROUTER_TTS_MODEL || 'hexgrad/kokoro-82m';
const TTS_VOICES = new Set([
  'af_heart', 'af_bella', 'af_nicole', 'af_sky',
  'am_adam', 'am_michael',
  'bf_emma', 'bf_isabella',
  'bm_george', 'bm_lewis',
]);

app.post('/api/ai/speak', async (req, res) => {
  if (!requireKey(res)) return;
  const input = String(req.body.text || '').trim().slice(0, 4000);
  const voice = TTS_VOICES.has(req.body.voice) ? req.body.voice : 'af_heart';
  if (!input) return res.status(400).json({ error: 'No text to speak' });

  try {
    const upstream = await fetch('https://openrouter.ai/api/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:' + PORT,
        'X-Title': 'AI Roadmap',
      },
      body: JSON.stringify({
        model: TTS_MODEL,
        input,
        voice,
        response_format: 'mp3',
      }),
    });
    if (!upstream.ok) {
      const text = await upstream.text();
      return res.status(502).json({ error: `OpenRouter TTS ${upstream.status}: ${text.slice(0, 300)}` });
    }
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');
    res.send(Buffer.from(await upstream.arrayBuffer()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------------------------------------------------------ */
/* Curriculum currency audit                                           */
/*                                                                     */
/* Checks a module's structure (courses, lessons, cited examples)      */
/* against the current state of the technology: live DDG searches      */
/* establish what is happening in the field right now, then Gemini     */
/* reviews the curriculum for dated framing, stale examples, and       */
/* missing emerging topics. Returns structured JSON.                   */
/* ------------------------------------------------------------------ */

const auditCache = new Map(); // moduleId → { result, at } (server-side, 24h)

app.post('/api/ai/audit', async (req, res) => {
  if (!requireKey(res)) return;
  const { moduleId, force } = req.body;
  const mod = curriculum.find((m) => m.id === moduleId);
  if (!mod) return res.status(400).json({ error: 'Unknown module' });

  const auditModel = pickModel(req.body);
  const cacheKey = `${moduleId}::${auditModel}`;
  const cached = auditCache.get(cacheKey);
  if (cached && !force && Date.now() - cached.at < 24 * 60 * 60 * 1000) {
    return res.json(cached.result);
  }

  const year = new Date().getFullYear();
  let sources = [];
  try {
    const [a, b] = await Promise.all([
      ddgSearch(`${mod.title} latest developments ${year}`, 5),
      ddgSearch(`state of ${mod.title.replace(/^AI for /i, 'AI in ')} ${year} trends`, 5),
    ]);
    const seen = new Set();
    sources = [...a, ...b].filter((s) => !seen.has(s.url) && seen.add(s.url)).slice(0, 8);
  } catch (e) {
    console.warn('Audit search failed:', e.message);
  }

  // Compact structural snapshot for review.
  const structure = {
    title: mod.title,
    tagline: mod.tagline,
    courses: mod.courses.map((c) => ({
      title: c.title,
      summary: c.summary,
      lessons: c.lessons.map((l) => `${l.title}: ${l.detail}`),
      examples: c.examples.map((e) => `${e.name}: ${e.detail}`),
    })),
  };

  const prompt = [
    `You are the curriculum steward for AI Roadmap. Today's date is ${new Date().toISOString().slice(0, 10)}.`,
    `Audit the module below: is its structure still valid given the CURRENT state of AI technology?`,
    `Judge against the live web search results provided and your most recent knowledge. Look for:`,
    `- courses or lessons whose framing is dated (the field has moved past it),`,
    `- cited real-world examples that are stale, superseded, acquired, renamed, or shut down,`,
    `- important new developments of the last ~12 months that the module fails to cover.`,
    `Be specific and calibrated: most well-built curriculum should be "current" or need only "minor-updates".`,
    ``,
    `Return ONLY JSON:`,
    `{"verdict":"current|minor-updates|needs-revision",`,
    ` "summary":"2-3 sentence overall assessment",`,
    ` "findings":[{"target":"course/lesson/example name","status":"current|dated|obsolete","note":"what changed","suggestion":"specific fix"}],`,
    ` "emergingTopics":[{"topic":"...","why":"one line on why it now belongs in this module"}]}`,
    `Limit findings to the 3-8 most material items; emergingTopics to 2-4.`,
    ``,
    `MODULE STRUCTURE:`,
    JSON.stringify(structure, null, 1),
    ``,
    `LIVE WEB SEARCH RESULTS (current state of the field):`,
    sources.length
      ? sources.map((s, i) => `[${i + 1}] ${s.title} — ${s.url}\n    ${s.snippet}`).join('\n')
      : '(search unavailable — audit from your own knowledge and say so in the summary)',
  ].join('\n');

  try {
    const text = await callModel([{ role: 'user', content: prompt }], { temperature: 0.3, json: true, model: auditModel });
    const audit = parseModelJson(text);
    const result = {
      ...audit,
      auditedAt: new Date().toISOString(),
      model: auditModel,
      sources: sources.map(({ title, url }) => ({ title, url })),
    };
    auditCache.set(cacheKey, { result, at: Date.now() });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------------------------------------------------------ */
/* Opportunity Advisor — agentic multi-step pipeline                   */
/*                                                                     */
/* Step 1  PROFILE   — analyze the learner's role and decompose it     */
/*                     into discrete tasks (task-based method).        */
/* Step 2  SCORE     — rate each task for AI value & ability, identify */
/*                     problems worth solving (problem-first method).  */
/* Step 3  ROADMAP   — synthesize a prioritized pilot plan with        */
/*                     Quick Wins / Strategic Bets / Moonshots, tools, */
/*                     and a recommended learning path.                */
/* ------------------------------------------------------------------ */

app.post('/api/ai/advisor', async (req, res) => {
  if (!requireKey(res)) return;
  const { role, industry, tasks, challenges } = req.body;
  if (!role || !industry) return res.status(400).json({ error: 'role and industry are required' });
  const advisorModel = pickModel(req.body);

  // Stream step-by-step progress so the UI can show the agent working.
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  const emit = (event, data) => res.write(`data: ${JSON.stringify({ event, data })}\n\n`);

  const catalogSummary = curriculum
    .map((m) => `${m.id} | ${m.title} (${m.track}): ${m.tagline}`)
    .join('\n');

  try {
    /* Step 1 — task decomposition */
    emit('step', { n: 1, label: 'Decomposing role into discrete tasks' });
    const profileText = await callModel(
      [
        {
          role: 'user',
          content:
            `Using a task-decomposition method, decompose this professional's job into 8-12 discrete, ` +
            `concrete tasks. Return ONLY JSON: {"tasks":[{"task":"...","timeShare":"e.g. 15%"}]}\n\n` +
            `ROLE: ${role}\nINDUSTRY: ${industry}\nSELF-DESCRIBED ACTIVITIES: ${tasks || 'not provided'}`,
        },
      ],
      { temperature: 0.5, json: true, model: advisorModel }
    );
    const profile = parseModelJson(profileText);
    emit('profile', profile);

    /* Step 2 — value/ability scoring + problems */
    emit('step', { n: 2, label: 'Scoring tasks for AI value and ability' });
    const scoredText = await callModel(
      [
        {
          role: 'user',
          content:
            `Score each task for AI opportunity. value = business value of automating/augmenting it with AI (1-5), ` +
            `ability = how capable today's AI (LLMs, agents, prediction models) is at the task (1-5). ` +
            `Also identify the 2-3 biggest PROBLEMS implied by the stated challenges. Return ONLY JSON:\n` +
            `{"scored":[{"task":"...","value":1,"ability":1,"note":"one line"}],` +
            `"problems":[{"problem":"...","impact":"one line"}]}\n\n` +
            `TASKS: ${JSON.stringify(profile.tasks)}\nSTATED CHALLENGES: ${challenges || 'not provided'}\n` +
            `INDUSTRY: ${industry}`,
        },
      ],
      { temperature: 0.4, json: true, model: advisorModel }
    );
    const scored = parseModelJson(scoredText);
    emit('scored', scored);

    /* Step 3 — roadmap synthesis */
    emit('step', { n: 3, label: 'Synthesizing pilot roadmap and learning path' });
    const roadmapText = await callModel(
      [
        {
          role: 'user',
          content:
            `Build an AI pilot plan from the scored tasks and problems below. Classify pilots as ` +
            `"quickWin" (high ability, immediate), "strategicBet" (high value + high ability), or "moonshot" ` +
            `(high value, emerging ability). Recommend specific, real, current tools/vendors per pilot. ` +
            `Then pick the 3 most relevant modules from the catalog (use their ids). Return ONLY JSON:\n` +
            `{"pilots":[{"name":"...","type":"quickWin|strategicBet|moonshot","detail":"2 sentences","tools":["..."],"firstStep":"one concrete action"}],` +
            `"learningPath":[{"id":"module-id","reason":"one line"}],"summary":"3-sentence executive summary"}\n\n` +
            `SCORED TASKS: ${JSON.stringify(scored.scored)}\nPROBLEMS: ${JSON.stringify(scored.problems)}\n` +
            `ROLE: ${role} | INDUSTRY: ${industry}\n\nACADEMY CATALOG:\n${catalogSummary}`,
        },
      ],
      { temperature: 0.6, json: true, model: advisorModel }
    );
    const roadmap = parseModelJson(roadmapText);
    emit('roadmap', roadmap);
    emit('done', {});
  } catch (err) {
    emit('error', { message: err.message });
  }
  res.end();
});

/* ------------------------------------------------------------------ */

app.listen(PORT, () => {
  console.log(`AI Roadmap running at http://localhost:${PORT}`);
  console.log(`Model: ${MODEL} via OpenRouter ${API_KEY ? '(key configured)' : '(NO KEY — AI features disabled)'}`);
});
