/* ==================================================================
   AI Roadmap — frontend application
   Hash-routed SPA: catalog → module pages → AI tutor / quizzes /
   agentic use-case advisor (Gemini 2.5 Flash via OpenRouter, proxied
   by the Express server).
   ================================================================== */

const view = document.getElementById('view');
let CATALOG = null;
let AI_ENABLED = false;
let PROFILES = [];
let PROFILE = null; // current learner profile (full object incl. progress)
let MODELS = ['google/gemini-2.5-flash'];
let MODEL_CHOICE = localStorage.getItem('aiacademy.model') || 'google/gemini-2.5-flash';
const moduleCache = new Map();
const PROFILE_LS_KEY = 'aiacademy.profileId';

const modelShort = (id = MODEL_CHOICE) => id.replace(/^google\//, '');

const TRACKS = {
  core: {
    label: 'Core Curriculum',
    title: 'Learn · Build · Lead',
    desc: 'Three progressive stages, taken in order: Learn the essentials, Build working solutions, then Lead organization-wide adoption.',
  },
  industry: {
    label: 'Industry Track',
    title: 'AI Across Functions & Sectors',
    desc: 'Eleven applied modules, each following the same progression — current landscape, emerging operating models, opportunity mapping, and implementation — grounded in current real-world deployments.',
  },
  engineering: {
    label: 'Engineering & Science Track',
    title: 'AI in Engineering & Research',
    desc: 'Five technical modules for practitioners: generative design, thermal analysis, FEA, CFD, and research biology — surrogate models, physics-informed ML, and the verification discipline that keeps them trustworthy.',
  },
};

/* ---------------- utilities ---------------- */

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Minimal markdown: headings, bold, italics, inline code, lists, paragraphs.
function md(text) {
  const lines = esc(text).split('\n');
  let html = '', inList = false;
  const inline = (s) =>
    s.replace(/`([^`]+)`/g, '<code>$1</code>')
     .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
     .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  for (const ln of lines) {
    const h = ln.match(/^(#{1,4})\s+(.*)/);
    const li = ln.match(/^\s*(?:[-*]|\d+\.)\s+(.*)/);
    if (h) {
      if (inList) { html += '</ul>'; inList = false; }
      const level = Math.min(h[1].length + 2, 5); // ## → h4-ish scale inside articles
      html += `<h${level}>${inline(h[2])}</h${level}>`;
    } else if (li) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${inline(li[1])}</li>`;
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      if (ln.trim()) html += `<p>${inline(ln)}</p>`;
    }
  }
  if (inList) html += '</ul>';
  return html;
}

// Fast markdown for streaming previews: marked if available, mini-renderer otherwise.
// LaTeX spans are stashed behind placeholders first so the markdown parser cannot
// mangle their underscores/asterisks, then restored for KaTeX to render.
function mdFast(text) {
  const stash = [];
  const hide = (m) => `@@MATH${stash.push(m) - 1}@@`;
  const t = text
    .replace(/\$\$[\s\S]+?\$\$/g, hide)
    .replace(/\\\[[\s\S]+?\\\]/g, hide)
    .replace(/\\\([\s\S]+?\\\)/g, hide)
    .replace(/\$(?!\s)[^$\n]+?(?<!\s)\$/g, hide);
  let html;
  if (window.marked) {
    try { html = marked.parse(t, { breaks: false }); } catch { html = md(t); }
  } else {
    html = md(t);
  }
  return html.replace(/@@MATH(\d+)@@/g, (m, i) => esc(stash[Number(i)] ?? m));
}

// Full lecture render: markdown → citations → syntax highlighting → math.
function renderRichLecture(container, text, links) {
  container.innerHTML = linkCitations(mdFast(text), links);
  if (window.hljs) {
    container.querySelectorAll('pre code').forEach((el) => {
      try { hljs.highlightElement(el); } catch { /* leave plain */ }
    });
  }
  if (window.renderMathInElement) {
    try {
      renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\[', right: '\\]', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
        ],
        throwOnError: false,
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'a'],
      });
    } catch { /* math stays as source */ }
  }
}

// Turn [n] / [n, m] citations into links once the source list is known.
function linkCitations(html, links) {
  if (!links?.length) return html;
  return html.replace(/\[(\d{1,2}(?:\s*,\s*\d{1,2})*)\]/g, (m, group) => {
    const parts = group.split(',').map((s) => s.trim());
    if (!parts.every((n) => links[Number(n) - 1])) return m;
    return parts
      .map((n) => {
        const src = links[Number(n) - 1];
        return `<a class="cite" href="${esc(src.url)}" target="_blank" rel="noopener" title="${esc(src.title)}">[${n}]</a>`;
      })
      .join('');
  });
}

async function getJSON(url, opts) {
  const r = await fetch(url, opts);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || `Request failed (${r.status})`);
  return data;
}

function pips(n) {
  return '●'.repeat(Math.max(0, Math.min(5, n))) + '○'.repeat(5 - Math.max(0, Math.min(5, n)));
}

/* ---------------- boot ---------------- */

(async function boot() {
  try {
    const status = await getJSON('/api/status');
    AI_ENABLED = status.aiEnabled;
    MODELS = status.models?.length ? status.models : [status.model];
    if (!MODELS.includes(MODEL_CHOICE)) MODEL_CHOICE = status.model;
    renderModelCtl();
    updateKeyStatus();
  } catch { /* status badge stays neutral */ }
  CATALOG = await getJSON('/api/curriculum');
  await loadProfiles();
  initProfileModal();
  route();
})();

/* ---------------- model selection ---------------- */

function updateKeyStatus() {
  const el = document.getElementById('keyStatus');
  if (!el) return;
  el.classList.remove('on', 'off');
  el.classList.add(AI_ENABLED ? 'on' : 'off');
  el.querySelector('.lbl').textContent = AI_ENABLED ? `${modelShort()} live` : 'AI offline — add API key';
}

function renderModelCtl() {
  const el = document.getElementById('modelCtl');
  if (!el) return;
  el.innerHTML = `
    <select id="modelSel" title="Model powering tutor, lectures, quizzes, advisor, and audits">
      ${MODELS.map((m) => `<option value="${esc(m)}" ${m === MODEL_CHOICE ? 'selected' : ''}>${esc(modelShort(m))}</option>`).join('')}
    </select>`;
  document.getElementById('modelSel').addEventListener('change', (e) => {
    MODEL_CHOICE = e.target.value;
    localStorage.setItem('aiacademy.model', MODEL_CHOICE);
    updateKeyStatus();
    route(); // refresh visible model labels
  });
}

/* ---------------- learner profiles ---------------- */

async function loadProfiles() {
  try {
    PROFILES = await getJSON('/api/profiles');
    const savedId = localStorage.getItem(PROFILE_LS_KEY);
    if (savedId && PROFILES.some((p) => p.id === savedId)) {
      PROFILE = await getJSON(`/api/profiles/${savedId}`);
    }
  } catch { PROFILES = []; }
  renderProfileCtl();
}

function renderProfileCtl() {
  const el = document.getElementById('profileCtl');
  if (!el) return;
  el.innerHTML = `
    <span class="p-ico">${PROFILE ? '●' : '○'}</span>
    <select id="profileSel" title="Learner profile">
      ${PROFILE ? '' : `<option value="" selected>No profile — progress not saved</option>`}
      ${PROFILES.map((p) => `<option value="${p.id}" ${PROFILE?.id === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
      <option value="__new">＋ New profile…</option>
    </select>`;
  document.getElementById('profileSel').addEventListener('change', async (e) => {
    const v = e.target.value;
    if (v === '__new') {
      openProfileModal();
      renderProfileCtl(); // reset selection
      return;
    }
    if (!v) return;
    PROFILE = await getJSON(`/api/profiles/${v}`);
    localStorage.setItem(PROFILE_LS_KEY, v);
    renderProfileCtl();
    route(); // re-render current view with this learner's progress
  });
}

function openProfileModal() {
  const m = document.getElementById('profileModal');
  m.hidden = false;
  document.getElementById('pmErr').textContent = '';
  document.getElementById('pmName').value = '';
  document.getElementById('pmRole').value = '';
  document.getElementById('pmName').focus();
}

function initProfileModal() {
  const m = document.getElementById('profileModal');
  document.getElementById('pmCancel').addEventListener('click', () => { m.hidden = true; });
  m.addEventListener('click', (e) => { if (e.target === m) m.hidden = true; });
  document.getElementById('pmCreate').addEventListener('click', createProfile);
  document.getElementById('pmName').addEventListener('keydown', (e) => { if (e.key === 'Enter') createProfile(); });
}

async function createProfile() {
  const name = document.getElementById('pmName').value.trim();
  const role = document.getElementById('pmRole').value.trim();
  const err = document.getElementById('pmErr');
  if (!name) { err.textContent = 'Please enter a name.'; return; }
  try {
    PROFILE = await getJSON('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role }),
    });
    localStorage.setItem(PROFILE_LS_KEY, PROFILE.id);
    PROFILES = await getJSON('/api/profiles');
    document.getElementById('profileModal').hidden = true;
    renderProfileCtl();
    route();
  } catch (e) {
    err.textContent = e.message;
  }
}

/* ---------------- progress helpers ---------------- */

function isLectureDone(modId, ci, li) {
  return Boolean(PROFILE?.progress?.lectures?.[`${modId}/${ci}/${li}`]);
}

function courseProgress(mod, ci) {
  const total = mod.courses[ci].lessons.length;
  let done = 0;
  for (let li = 0; li < total; li++) if (isLectureDone(mod.id, ci, li)) done++;
  return { done, total };
}

// % of a module's lectures completed, computed from progress keys.
function modulePct(modId, lessonCount) {
  if (!PROFILE || !lessonCount) return 0;
  const prefix = modId + '/';
  const done = Object.keys(PROFILE.progress.lectures).filter((k) => k.startsWith(prefix)).length;
  return Math.round((done / lessonCount) * 100);
}

function quizBest(modId, ci) {
  return PROFILE?.progress?.quizzes?.[`${modId}/${ci}`] || null;
}

async function recordProgress(payload) {
  if (!PROFILE) return false;
  try {
    PROFILE = await getJSON(`/api/profiles/${PROFILE.id}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (e) {
    console.warn('Progress save failed:', e.message);
    return false;
  }
}

window.addEventListener('hashchange', route);

function route() {
  const hash = location.hash || '#/';
  closeTutor();
  ttsStop(); // never carry narration across pages
  document.querySelectorAll('.site-nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === hash || (a.getAttribute('href') === '#/' && hash === '#/'));
  });
  const lec = hash.match(/^#\/module\/([\w-]+)\/lecture\/(\d+)\/(\d+)/);
  if (lec) return renderLecture(lec[1], Number(lec[2]), Number(lec[3]));
  const m = hash.match(/^#\/module\/([\w-]+)/);
  if (m) return renderModule(m[1]);
  if (hash.startsWith('#/advisor')) return renderAdvisor();
  if (hash.startsWith('#/profile')) return renderProfilePage();
  if (hash.startsWith('#/about')) return renderAbout();
  renderCatalog();
  window.scrollTo(0, 0);
}

/* ---------------- catalog ---------------- */

function renderCatalog() {
  const stats = {
    modules: CATALOG.length,
    courses: CATALOG.reduce((n, m) => n + m.courseCount, 0),
  };
  let html = `
  <section class="hero">
    <div class="hero-kicker">Applied AI Curriculum — Catalog № 1</div>
    <h1>Learn AI. Then <em>ship it</em> where you work.</h1>
    <p class="hero-sub">Nineteen modules spanning business functions, industries, and hard engineering —
    from first principles to production deployment. Every module pairs structured curriculum with a live AI tutor,
    generated knowledge checks, and an agentic advisor that maps AI to your actual job.</p>
    <div class="hero-stats">
      <div><b>${stats.modules}</b><span>Modules</span></div>
      <div><b>${stats.courses}</b><span>Courses</span></div>
      <div><b>3</b><span>Tracks</span></div>
      <div><b>∞</b><span>AI knowledge checks</span></div>
    </div>
    <div class="hero-coords">FIG. 01 — CURRICULUM MAP<br/>SCALE: SELF-PACED<br/>ENGINE: GEMINI · OPENROUTER</div>
  </section>
  <section class="catalog">`;

  for (const key of ['core', 'industry', 'engineering']) {
    const t = TRACKS[key];
    const mods = CATALOG.filter((m) => m.track === key);
    html += `
    <div class="catalog-track track-${key}">
      <div class="track-head">
        <span class="track-tag">${t.label}</span>
        <h2>${t.title}</h2>
      </div>
      <p class="track-desc">${t.desc}</p>
      <div class="module-list">
        ${mods.map((m) => {
          const pct = modulePct(m.id, m.lessonCount);
          return `
        <a class="module-row" href="#/module/${m.id}">
          <span class="num">№ ${m.number}</span>
          <span>
            <span class="m-title">${m.stage ? `<span class="stage-chip">${esc(m.stage)}</span>` : ''}${esc(m.title)}</span>
            <div class="m-tagline">${esc(m.tagline)}</div>
            ${PROFILE && pct > 0 ? `<div class="row-prog" title="${pct}% of lectures attended"><i style="width:${pct}%"></i></div>` : ''}
          </span>
          <span class="m-meta">${esc(m.level)}<br/>${m.courseCount} courses · ${esc(m.duration)}${PROFILE && pct > 0 ? `<br/><span class="m-pct">${pct === 100 ? '✓ complete' : pct + '%'}</span>` : ''}</span>
          <span class="arrow">→</span>
        </a>`;}).join('')}
      </div>
    </div>`;
  }
  html += `</section>`;
  view.innerHTML = html;
}

/* ---------------- module page ---------------- */

async function loadModule(id) {
  let mod = moduleCache.get(id);
  if (!mod) {
    mod = await getJSON(`/api/curriculum/${id}`);
    moduleCache.set(id, mod);
  }
  return mod;
}

async function renderModule(id) {
  let mod;
  try {
    view.innerHTML = `<div class="about-page"><p class="mono-eyebrow">Loading module…</p></div>`;
    mod = await loadModule(id);
  } catch (e) {
    view.innerHTML = `<div class="about-page"><h1>Not found</h1><p>${esc(e.message)}</p></div>`;
    return;
  }

  view.innerHTML = `
  <article class="module-page track-${mod.track}-page">
    <header class="module-hero">
      <div class="crumb"><a href="#/">Catalog</a> / ${TRACKS[mod.track].label}</div>
      <span class="big-num">MODULE ${mod.number}</span>
      <h1>${esc(mod.title)}</h1>
      <p class="tagline">${esc(mod.tagline)}</p>
      <div class="module-meta-strip">
        <div><b>Level</b>${esc(mod.level)}</div>
        <div><b>Duration</b>${esc(mod.duration)}</div>
        <div><b>Courses</b>${mod.courses.length} + exam</div>
        <div><b>Certificate</b>Professional</div>
      </div>
    </header>
    <div class="module-body">
      <div class="module-main">
        <p class="section-label">Overview</p>
        <p class="module-desc">${esc(mod.description)}</p>
        <p class="section-label">Syllabus</p>
        <p class="syllabus-hint">Click any lesson to attend a live AI-generated lecture on it.</p>
        <div id="courses">
          ${mod.courses.map((c, i) => courseHTML(mod, c, i)).join('')}
        </div>
      </div>
      <aside class="module-side">
        ${PROFILE ? (() => {
          const total = mod.courses.reduce((n, c) => n + c.lessons.length, 0);
          const pct = modulePct(mod.id, total);
          const quizPasses = mod.courses.filter((c, i) => (quizBest(mod.id, i)?.pct ?? 0) >= 80).length;
          return `
        <div class="progress-box">
          <h4>Your progress — ${esc(PROFILE.name)}</h4>
          <div class="prog-bar"><i style="width:${pct}%"></i></div>
          <p class="prog-line">${pct}% of lectures attended · ${quizPasses}/${mod.courses.length} knowledge checks passed${pct === 100 ? ' · <b>module complete — exam-ready</b>' : ''}</p>
        </div>`;
        })() : `
        <div class="progress-box">
          <h4>Track your progress</h4>
          <p class="prog-line">Create a learner profile (top right) to save completed lectures and quiz scores.</p>
        </div>`}
        <div><h4>You will learn to</h4><ul>${mod.outcomes.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></div>
        <div><h4>Who it’s for</h4><ul>${mod.audience.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div>
        <div><h4>Deliverables</h4><ul>${mod.deliverables.map((d) => `<li>${esc(d)}</li>`).join('')}</ul></div>
        <div class="exam-box"><h4>Certification</h4><p>${esc(mod.exam)}</p></div>
        <div class="audit-box">
          <h4>Curriculum currency</h4>
          <p class="audit-blurb">AI moves fast. Run a live check of this module’s structure — courses, lessons, and cited examples — against the current state of the technology (web search + ${esc(modelShort())}).</p>
          <button class="btn accent" id="auditBtn">⟳ Verify currency</button>
          <div id="auditOut"></div>
        </div>
      </aside>
    </div>
  </article>
  <button class="tutor-fab" id="tutorFab">◆ Ask the AI Tutor</button>
  ${tutorPanelHTML(mod)}`;

  // course accordion + quiz wiring
  const courses = view.querySelectorAll('.course');
  courses.forEach((el, i) => {
    el.querySelector('.course-head').addEventListener('click', () => {
      el.classList.toggle('open');
      tutorState.courseIndex = el.classList.contains('open') ? i : null;
      updateTutorCtx(mod);
    });
    const qBtn = el.querySelector('.gen-quiz');
    if (qBtn) qBtn.addEventListener('click', () => generateQuiz(mod.id, i, el, qBtn));
    const tBtn = el.querySelector('.ask-tutor');
    if (tBtn) tBtn.addEventListener('click', () => { tutorState.courseIndex = i; updateTutorCtx(mod); openTutor(); });
  });
  if (courses[0]) { courses[0].classList.add('open'); tutorState.courseIndex = 0; }

  initTutor(mod);

  // Curriculum currency audit
  const auditBtn = document.getElementById('auditBtn');
  auditBtn.addEventListener('click', () => runAudit(mod, auditBtn.dataset.ran === '1'));
  if (auditClientCache.has(mod.id)) {
    paintAudit(auditClientCache.get(mod.id));
    auditBtn.textContent = '⟳ Re-verify now';
    auditBtn.dataset.ran = '1';
  }

  window.scrollTo(0, 0);
}

/* ---------------- curriculum currency audit ---------------- */

const auditClientCache = new Map(); // moduleId → audit result

async function runAudit(mod, force) {
  const out = document.getElementById('auditOut');
  const btn = document.getElementById('auditBtn');
  if (!AI_ENABLED) {
    out.innerHTML = `<div class="notice" style="margin:14px 0 0">The audit runs on <code>google/gemini-2.5-flash</code> plus live web search. Add <code>OPENROUTER_API_KEY</code> to <code>.env</code> and restart the server.</div>`;
    return;
  }
  btn.disabled = true;
  btn.textContent = '… auditing (searching the web)';
  try {
    const audit = await getJSON('/api/ai/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId: mod.id, force: Boolean(force), model: MODEL_CHOICE }),
    });
    auditClientCache.set(mod.id, audit);
    paintAudit(audit);
    btn.dataset.ran = '1';
  } catch (e) {
    out.innerHTML = `<div class="notice" style="margin:14px 0 0">⚠ ${esc(e.message)}</div>`;
  } finally {
    btn.disabled = false;
    btn.textContent = '⟳ Re-verify now';
  }
}

function paintAudit(audit) {
  const out = document.getElementById('auditOut');
  if (!out) return;
  const verdictLabel = {
    'current': 'Current',
    'minor-updates': 'Minor updates suggested',
    'needs-revision': 'Needs revision',
  };
  const statusBadge = (s) => `<span class="a-status a-${esc(s)}">${esc(s)}</span>`;
  const when = audit.auditedAt ? new Date(audit.auditedAt).toLocaleString() : '';
  out.innerHTML = `
    <div class="audit-verdict v-${esc(audit.verdict)}">${verdictLabel[audit.verdict] || esc(audit.verdict)}</div>
    <p class="audit-summary">${esc(audit.summary || '')}</p>
    ${audit.findings?.length ? `
      <div class="audit-findings">
        ${audit.findings.map((f) => `
          <div class="a-finding">
            <div class="a-head"><b>${esc(f.target)}</b>${statusBadge(f.status)}</div>
            <p>${esc(f.note)}</p>
            ${f.suggestion ? `<p class="a-fix">↳ ${esc(f.suggestion)}</p>` : ''}
          </div>`).join('')}
      </div>` : ''}
    ${audit.emergingTopics?.length ? `
      <h5 class="a-sub">Emerging topics to consider</h5>
      ${audit.emergingTopics.map((t) => `
        <div class="a-emerging"><b>${esc(t.topic)}</b><p>${esc(t.why)}</p></div>`).join('')}` : ''}
    ${audit.sources?.length ? `
      <h5 class="a-sub">Checked against</h5>
      <div class="a-sources">${audit.sources.map((s) =>
        `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(new URL(s.url).hostname.replace(/^www\./, ''))}</a>`).join(' · ')}</div>` : ''}
    <div class="a-when">Audited ${esc(when)}</div>`;
}

function courseHTML(mod, c, i) {
  const prog = PROFILE ? courseProgress(mod, i) : null;
  const quiz = PROFILE ? quizBest(mod.id, i) : null;
  return `
  <div class="course ${prog && prog.done === prog.total ? 'complete' : ''}">
    <button class="course-head">
      <span class="c-num">C·${String(i + 1).padStart(2, '0')}</span>
      <h3>${esc(c.title)}</h3>
      <span class="c-prog ${prog && prog.done === prog.total ? 'full' : ''}">${prog ? (prog.done === prog.total ? '✓' : `${prog.done}/${prog.total}`) : ''}</span>
      <span class="chev">+</span>
    </button>
    <div class="course-body">
      <p class="course-summary">${esc(c.summary)}</p>
      ${c.lessons.map((l, j) => {
        const done = isLectureDone(mod.id, i, j);
        return `
        <a class="lesson ${done ? 'done' : ''}" href="#/module/${mod.id}/lecture/${i}/${j}">
          <span class="l-num">${done ? '✓' : `${i + 1}.${j + 1}`}</span>
          <span><b>${esc(l.title)}</b><p>${esc(l.detail)}</p></span>
          <span class="l-go">${done ? '↻ Revisit' : '▶ Lecture'}</span>
        </a>`;}).join('')}
      ${quiz ? `<p class="quiz-best">Best knowledge check: ${quiz.score}/${quiz.total} (${quiz.pct}%) ${quiz.pct >= 80 ? '— passed ✓' : '— 80% to pass'}</p>` : ''}
      ${c.examples.length ? `
      <div class="examples">
        <h4>In the field — current implementations</h4>
        <ul>${c.examples.map((e) => `<li><b>${esc(e.name)}.</b> <span>${esc(e.detail)}</span></li>`).join('')}</ul>
      </div>` : ''}
      <div class="course-actions">
        <button class="btn accent gen-quiz">✎ Generate knowledge check</button>
        <button class="btn ask-tutor">◆ Ask the tutor about this course</button>
      </div>
      <div class="quiz-slot"></div>
    </div>
  </div>`;
}

/* ---------------- quiz ---------------- */

async function generateQuiz(moduleId, courseIndex, courseEl, btn) {
  const slot = courseEl.querySelector('.quiz-slot');
  if (!AI_ENABLED) {
    slot.innerHTML = `<div class="notice">Knowledge checks are generated live by <code>google/gemini-2.5-flash</code>.
      Add your OpenRouter key to <code>.env</code> (see README) and restart the server to enable them.</div>`;
    return;
  }
  btn.disabled = true; btn.textContent = `… generating with ${modelShort()}`;
  try {
    const quiz = await getJSON('/api/ai/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId, courseIndex, model: MODEL_CHOICE }),
    });
    renderQuiz(slot, quiz, moduleId, courseIndex);
  } catch (e) {
    slot.innerHTML = `<div class="notice">Quiz generation failed: ${esc(e.message)}</div>`;
  } finally {
    btn.disabled = false; btn.textContent = '✎ Regenerate knowledge check';
  }
}

function renderQuiz(slot, quiz, moduleId, courseIndex) {
  const qs = quiz.questions;
  slot.innerHTML = `
  <div class="quiz-wrap">
    <h4>Knowledge check — ${qs.length} questions <span style="color:var(--ink-faint)">(AI-generated)</span></h4>
    ${qs.map((q, qi) => `
      <div class="q-item" data-q="${qi}">
        <div class="q-text">${qi + 1}. ${esc(q.q)}</div>
        ${q.options.map((o, oi) => `<label class="q-opt" data-o="${oi}">${esc(o)}</label>`).join('')}
        <div class="q-why">${esc(q.why || '')}</div>
      </div>`).join('')}
    <button class="btn primary grade-btn">Grade my answers</button>
    <div class="quiz-score"></div>
  </div>`;

  const picks = new Array(qs.length).fill(null);
  slot.querySelectorAll('.q-item').forEach((item) => {
    const qi = Number(item.dataset.q);
    item.querySelectorAll('.q-opt').forEach((opt) => {
      opt.addEventListener('click', () => {
        if (item.dataset.graded) return;
        item.querySelectorAll('.q-opt').forEach((o) => o.classList.remove('sel'));
        opt.classList.add('sel');
        picks[qi] = Number(opt.dataset.o);
      });
    });
  });

  slot.querySelector('.grade-btn').addEventListener('click', () => {
    let score = 0;
    slot.querySelectorAll('.q-item').forEach((item) => {
      const qi = Number(item.dataset.q);
      const correct = qs[qi].answer;
      item.dataset.graded = '1';
      item.querySelectorAll('.q-opt').forEach((o) => {
        const oi = Number(o.dataset.o);
        if (oi === correct) o.classList.add('correct');
        else if (picks[qi] === oi) o.classList.add('wrong');
      });
      item.querySelector('.q-why').style.display = 'block';
      if (picks[qi] === correct) score++;
    });
    const pct = Math.round((score / qs.length) * 100);
    slot.querySelector('.quiz-score').textContent =
      `Score: ${score}/${qs.length} (${pct}%) — ${pct >= 80 ? 'pass. Exam-ready on this course.' : 'review the lessons above and regenerate a fresh check.'}` +
      (PROFILE ? '' : ' (Create a profile to save scores.)');
    slot.querySelector('.grade-btn').disabled = true;
    recordProgress({ type: 'quiz', key: `${moduleId}/${courseIndex}`, data: { score, total: qs.length, pct } });
  });
}

/* ---------------- lecture ---------------- */

const lectureCache = new Map(); // "moduleId/ci/li" → { text, links }

async function renderLecture(id, ci, li) {
  let mod;
  try {
    view.innerHTML = `<div class="about-page"><p class="mono-eyebrow">Loading…</p></div>`;
    mod = await loadModule(id);
  } catch (e) {
    view.innerHTML = `<div class="about-page"><h1>Not found</h1><p>${esc(e.message)}</p></div>`;
    return;
  }
  const course = mod.courses[ci];
  const lesson = course?.lessons?.[li];
  if (!lesson) {
    view.innerHTML = `<div class="about-page"><h1>Lesson not found</h1></div>`;
    return;
  }

  const prev = li > 0 ? `#/module/${id}/lecture/${ci}/${li - 1}` : null;
  const next = li < course.lessons.length - 1 ? `#/module/${id}/lecture/${ci}/${li + 1}` : null;

  view.innerHTML = `
  <article class="lecture-page track-${mod.track}-page">
    <header class="module-hero lecture-hero">
      <div class="crumb">
        <a href="#/">Catalog</a> / <a href="#/module/${id}">${esc(mod.title)}</a> / ${esc(course.title)}
      </div>
      <span class="big-num">LECTURE ${mod.number}.${ci + 1}.${li + 1}</span>
      <h1>${esc(lesson.title)}</h1>
      <p class="tagline">${esc(lesson.detail)}</p>
      <div class="lecture-meta">
        <span class="mono-eyebrow">Instructor: ${esc(modelShort())} · sources: live DuckDuckGo search</span>
        <span class="lec-done-chip" id="lecDoneChip" hidden>✓ Completed</span>
      </div>
    </header>
    <div class="lecture-body-wrap">
      <div class="lecture-main">
        <div class="lecture-status" id="lecStatus"></div>
        ${listenBarHTML()}
        <div class="lecture-body" id="lecBody"></div>
        <div class="lecture-actions" id="lecActions" style="display:none">
          <button class="btn primary" id="lecReader">⧉ Open in reader window</button>
          <button class="btn" id="lecMark"></button>
          <button class="btn accent" id="lecRegen">↻ Regenerate lecture</button>
          ${prev ? `<a class="btn" href="${prev}">← Previous lesson</a>` : ''}
          ${next ? `<a class="btn" href="${next}">Next lesson →</a>` : ''}
          <a class="btn" href="#/module/${id}">Back to syllabus</a>
        </div>
      </div>
      <aside class="lecture-side">
        <div id="lecLinks">
          <h4>Explore further</h4>
          <p class="lec-links-empty">Sources appear here once found…</p>
        </div>
      </aside>
    </div>
  </article>
  <button class="tutor-fab" id="tutorFab">◆ Ask the AI Tutor</button>
  ${tutorPanelHTML(mod)}`;

  tutorState.courseIndex = ci;
  initTutor(mod);
  window.scrollTo(0, 0);

  const key = `${id}/${ci}/${li}`;
  document.getElementById('lecRegen').addEventListener('click', () => {
    lectureCache.delete(key);
    streamLecture(key, mod, ci, li);
  });
  document.getElementById('lecMark').addEventListener('click', async () => {
    if (!PROFILE) { openProfileModal(); return; }
    const nowDone = !isLectureDone(id, ci, li);
    if (await recordProgress({ type: 'lecture', key, done: nowDone })) updateLectureDoneUI(id, ci, li);
  });
  updateLectureDoneUI(id, ci, li);
  initListenBar(() => lectureCache.get(key)?.text || '');

  document.getElementById('lecReader').addEventListener('click', () => openReader(mod, course, lesson, key));

  if (lectureCache.has(key)) {
    const { text, links } = lectureCache.get(key);
    paintLectureLinks(links);
    renderRichLecture(document.getElementById('lecBody'), text, links);
    document.getElementById('lecActions').style.display = 'flex';
  } else {
    streamLecture(key, mod, ci, li);
  }
}

/* Open the finished lecture in a standalone white reader window with
   highlighted code, rendered math, and the source list. */
function openReader(mod, course, lesson, key) {
  const cached = lectureCache.get(key);
  if (!cached) return;
  const tmp = document.createElement('div');
  renderRichLecture(tmp, cached.text, cached.links);

  const sourcesHtml = cached.links?.length
    ? `<h2 class="r-sources-h">Explore further</h2><ol class="r-sources">` +
      cached.links.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.title)}</a><br/><span>${esc(l.url)}</span></li>`).join('') +
      `</ol>`
    : '';

  const w = window.open('', '_blank');
  if (!w) { alert('Pop-up blocked — allow pop-ups for this site to use the reader.'); return; }
  w.document.write(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<title>${esc(lesson.title)} — AI Roadmap Reader</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,900&family=Spectral:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
  body { background:#fff; color:#1c1d18; font-family:'Spectral',Georgia,serif; font-size:18px;
         line-height:1.7; margin:0; padding:48px 24px; }
  .page { max-width:760px; margin:0 auto; }
  .crumb { font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.16em;
           text-transform:uppercase; color:#8a8878; margin-bottom:18px; }
  h1.title { font-family:'Fraunces',serif; font-weight:900; font-size:40px; line-height:1.05;
             letter-spacing:-.015em; margin:0 0 10px; }
  .lede { font-style:italic; color:#44453c; font-size:19px; margin:0 0 36px; border-bottom:1px solid #ddd6c2; padding-bottom:24px; }
  h2,h3,h4 { font-family:'Fraunces',serif; font-weight:600; letter-spacing:-.01em; margin:34px 0 12px; }
  h2 { font-size:27px; } h3 { font-size:22px; } h4 { font-size:19px; }
  p { margin:0 0 16px; color:#33342c; }
  ul,ol { margin:0 0 16px; padding-left:26px; color:#33342c; } li { margin-bottom:7px; }
  strong { color:#1c1d18; }
  code { font-family:'IBM Plex Mono',monospace; font-size:.82em; background:#f3f1e9; padding:1px 5px; border-radius:3px; }
  pre { background:#f6f8fa; border:1px solid #e4e1d4; border-radius:6px; padding:16px 18px;
        overflow-x:auto; margin:0 0 18px; }
  pre code { background:none; padding:0; font-size:13.5px; line-height:1.55; }
  a { color:#b53a0a; } a.cite { font-family:'IBM Plex Mono',monospace; font-size:11px;
        text-decoration:none; vertical-align:super; }
  .katex-display { overflow-x:auto; padding:4px 0; }
  .r-sources-h { border-top:1.5px solid #1c1d18; padding-top:24px; margin-top:44px; }
  .r-sources li { margin-bottom:12px; font-size:15px; }
  .r-sources span { font-family:'IBM Plex Mono',monospace; font-size:11px; color:#8a8878; }
  @media print { body { padding:0; font-size:12pt; } }
</style></head><body><div class="page">
<div class="crumb">AI Roadmap · Module ${esc(mod.number)} — ${esc(mod.title)} · ${esc(course.title)}</div>
<h1 class="title">${esc(lesson.title)}</h1>
<p class="lede">${esc(lesson.detail)}</p>
${tmp.innerHTML}
${sourcesHtml}
</div></body></html>`);
  w.document.close();
}

/* ---------------- text-to-speech (kokoro-82m via OpenRouter) ---------------- */

const TTS_VOICES = [
  { id: 'af_heart', label: 'Heart — US female' },
  { id: 'af_bella', label: 'Bella — US female' },
  { id: 'am_michael', label: 'Michael — US male' },
  { id: 'am_adam', label: 'Adam — US male' },
  { id: 'bf_emma', label: 'Emma — UK female' },
  { id: 'bm_george', label: 'George — UK male' },
];
const TTS_VOICE_LS = 'aiacademy.ttsVoice';

// Convert lecture markdown to clean spoken prose: drop citations and
// formatting marks, keep heading text as its own sentence for a natural pause.
function speechText(mdText) {
  return mdText
    .replace(/```[\s\S]*?```/g, ' See the code example on screen. ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' See the equation on screen. ')
    .replace(/\\\[[\s\S]*?\\\]/g, ' See the equation on screen. ')
    .replace(/\$([^$\n]+)\$/g, '$1')                        // inline math → bare text
    .replace(/\\\(([^)]*)\\\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(\d{1,2}(?:\s*,\s*\d{1,2})*)\]/g, '')      // [n] citations
    .replace(/^#+\s*(.+)$/gm, (m, h) => `${h.replace(/[.:]?\s*$/, '')}.`) // headings → sentence
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^\s*(?:[-*]|\d+\.)\s+/gm, '')                 // list markers
    .replace(/\s+/g, ' ')
    .trim();
}

// Split prose into ≤maxLen chunks on sentence boundaries.
function chunkSpeech(text, maxLen = 1600) {
  const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [text];
  const chunks = [];
  let cur = '';
  for (const s of sentences) {
    if (cur && cur.length + s.length > maxLen) { chunks.push(cur.trim()); cur = ''; }
    cur += s;
  }
  if (cur.trim()) chunks.push(cur.trim());
  return chunks;
}

const tts = {
  chunks: [], idx: 0, audio: null, playing: false, voice:
    localStorage.getItem(TTS_VOICE_LS) || 'af_heart',
  prefetched: null, prefetchedIdx: -1, token: 0,
};

function ttsStop() {
  tts.token++; // invalidates in-flight fetches/handlers
  if (tts.audio) { tts.audio.pause(); tts.audio.src = ''; tts.audio = null; }
  tts.chunks = []; tts.idx = 0; tts.playing = false;
  tts.prefetched = null; tts.prefetchedIdx = -1;
  updateListenBar('idle');
}

async function fetchChunkAudio(i) {
  const r = await fetch('/api/ai/speak', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: tts.chunks[i], voice: tts.voice }),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.error || `TTS failed (${r.status})`);
  }
  return URL.createObjectURL(await r.blob());
}

async function ttsPlayFrom(i) {
  const myToken = ++tts.token;
  tts.idx = i;
  tts.playing = true;
  updateListenBar('loading');
  try {
    const url = (tts.prefetchedIdx === i && tts.prefetched)
      ? tts.prefetched
      : await fetchChunkAudio(i);
    if (myToken !== tts.token) return; // superseded
    tts.prefetched = null; tts.prefetchedIdx = -1;

    const audio = new Audio(url);
    tts.audio = audio;
    audio.onended = () => {
      URL.revokeObjectURL(url);
      if (myToken !== tts.token) return;
      if (tts.idx + 1 < tts.chunks.length) ttsPlayFrom(tts.idx + 1);
      else ttsStop();
    };
    await audio.play();
    updateListenBar('playing');

    // Prefetch the next chunk while this one plays.
    if (i + 1 < tts.chunks.length) {
      fetchChunkAudio(i + 1)
        .then((u) => { if (myToken === tts.token) { tts.prefetched = u; tts.prefetchedIdx = i + 1; } })
        .catch(() => {});
    }
  } catch (e) {
    if (myToken !== tts.token) return;
    ttsStop();
    const status = document.getElementById('listenStatus');
    if (status) status.textContent = `⚠ ${e.message}`;
  }
}

function ttsToggle() {
  if (!tts.audio) return;
  if (tts.playing) { tts.audio.pause(); tts.playing = false; updateListenBar('paused'); }
  else { tts.audio.play(); tts.playing = true; updateListenBar('playing'); }
}

function listenBarHTML() {
  return `
  <div class="listen-bar" id="listenBar" style="display:none">
    <button class="btn primary" id="listenPlay">🔊 Listen to this lecture</button>
    <button class="btn" id="listenPause" style="display:none">⏸ Pause</button>
    <button class="btn" id="listenStop" style="display:none">■ Stop</button>
    <select id="listenVoice" title="Narrator voice">
      ${TTS_VOICES.map((v) => `<option value="${v.id}" ${v.id === tts.voice ? 'selected' : ''}>${v.label}</option>`).join('')}
    </select>
    <span class="listen-status" id="listenStatus"></span>
  </div>`;
}

function initListenBar(getText) {
  const bar = document.getElementById('listenBar');
  if (!bar) return;
  if (!AI_ENABLED) { bar.style.display = 'none'; return; }
  bar.style.display = 'flex';
  document.getElementById('listenVoice').addEventListener('change', (e) => {
    tts.voice = e.target.value;
    localStorage.setItem(TTS_VOICE_LS, tts.voice);
    if (tts.chunks.length) { // restart current chunk in the new voice
      const at = tts.idx;
      const chunks = tts.chunks;
      ttsStop();
      tts.chunks = chunks;
      ttsPlayFrom(at);
    }
  });
  document.getElementById('listenPlay').addEventListener('click', () => {
    if (tts.audio && !tts.playing) { ttsToggle(); return; } // resume
    ttsStop();
    const text = getText();
    if (!text) {
      document.getElementById('listenStatus').textContent = 'wait for the lecture to finish generating…';
      return;
    }
    tts.chunks = chunkSpeech(speechText(text));
    if (tts.chunks.length) ttsPlayFrom(0);
  });
  document.getElementById('listenPause').addEventListener('click', ttsToggle);
  document.getElementById('listenStop').addEventListener('click', ttsStop);
}

function updateListenBar(state) {
  const play = document.getElementById('listenPlay');
  const pause = document.getElementById('listenPause');
  const stop = document.getElementById('listenStop');
  const status = document.getElementById('listenStatus');
  if (!play) return;
  const n = tts.chunks.length;
  if (state === 'idle') {
    play.style.display = ''; play.textContent = '🔊 Listen to this lecture';
    pause.style.display = 'none'; stop.style.display = 'none';
    status.textContent = '';
  } else if (state === 'loading') {
    play.style.display = 'none'; pause.style.display = 'none'; stop.style.display = '';
    status.textContent = `synthesizing ${tts.idx + 1}/${n}…`;
  } else if (state === 'playing') {
    play.style.display = 'none'; pause.style.display = ''; stop.style.display = '';
    status.textContent = `part ${tts.idx + 1} of ${n} · kokoro-82m`;
  } else if (state === 'paused') {
    play.style.display = ''; play.textContent = '▶ Resume';
    pause.style.display = 'none'; stop.style.display = '';
    status.textContent = `paused at part ${tts.idx + 1} of ${n}`;
  }
}

function updateLectureDoneUI(modId, ci, li) {
  const done = isLectureDone(modId, ci, li);
  const chip = document.getElementById('lecDoneChip');
  const btn = document.getElementById('lecMark');
  if (chip) chip.hidden = !done;
  if (btn) {
    btn.textContent = PROFILE
      ? (done ? '✗ Mark incomplete' : '✓ Mark complete')
      : '✓ Mark complete (create profile)';
  }
}

function paintLectureLinks(links) {
  const el = document.getElementById('lecLinks');
  if (!el) return;
  el.innerHTML = `<h4>Explore further</h4>` + (links?.length
    ? links.map((l, i) => `
      <a class="src-link" href="${esc(l.url)}" target="_blank" rel="noopener">
        <span class="src-n">[${i + 1}]</span>
        <span><b>${esc(l.title)}</b>
        ${l.snippet ? `<p>${esc(l.snippet)}</p>` : ''}
        <span class="src-host">${esc(new URL(l.url).hostname.replace(/^www\./, ''))}</span></span>
      </a>`).join('')
    : `<p class="lec-links-empty">No web sources found for this topic — the lecture relies on the instructor model alone.</p>`);
}

async function streamLecture(key, mod, ci, li) {
  const body = document.getElementById('lecBody');
  const status = document.getElementById('lecStatus');
  const actions = document.getElementById('lecActions');
  actions.style.display = 'none';
  body.innerHTML = '';

  if (!AI_ENABLED) {
    body.innerHTML = `<div class="notice">Lectures are generated live by <code>google/gemini-2.5-flash</code>.
      Add <code>OPENROUTER_API_KEY</code> to <code>.env</code> and restart the server.</div>`;
    return;
  }

  status.innerHTML = `<span class="thinking"><i></i><i></i><i></i></span> Searching the web and preparing your lecture…`;

  let links = [], full = '';
  try {
    const r = await fetch('/api/ai/lecture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId: mod.id, courseIndex: ci, lessonIndex: li, model: MODEL_CHOICE }),
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error(err.error || `Lecture request failed (${r.status})`);
    }
    const reader = r.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const ln of lines) {
        if (!ln.startsWith('data: ')) continue;
        const payload = ln.slice(6).trim();
        if (payload === '[DONE]') continue;
        let msg;
        try { msg = JSON.parse(payload); } catch { continue; }
        if (msg.links) { links = msg.links; paintLectureLinks(links); status.textContent = 'Instructor is speaking…'; }
        if (msg.error) throw new Error(msg.error);
        if (msg.delta) {
          full += msg.delta;
          body.innerHTML = mdFast(full);
        }
      }
    }
    renderRichLecture(body, full, links);
    lectureCache.set(key, { text: full, links });
    status.textContent = '';
    actions.style.display = 'flex';
    // Attending a lecture to the end counts as completing the lesson.
    if (PROFILE && full && !isLectureDone(mod.id, ci, li)) {
      if (await recordProgress({ type: 'lecture', key, done: true })) updateLectureDoneUI(mod.id, ci, li);
    }
  } catch (e) {
    status.textContent = '';
    body.insertAdjacentHTML('beforeend', `<div class="notice">⚠ ${esc(e.message)}</div>`);
    actions.style.display = 'flex';
  }
}

/* ---------------- AI tutor ---------------- */

const tutorState = { history: [], courseIndex: 0, moduleId: null, busy: false };

function tutorPanelHTML(mod) {
  return `
  <div class="tutor-panel" id="tutorPanel">
    <div class="tutor-head">
      <span class="t-title"><em>◆</em> AI Tutor — <span style="color:var(--ink-faint)">${esc(modelShort())}</span></span>
      <button id="tutorClose" aria-label="Close">✕</button>
    </div>
    <div class="tutor-ctx" id="tutorCtx"></div>
    <div class="tutor-log" id="tutorLog">
      <div class="msg ai"><div class="who">Tutor</div><div class="bubble">
        <p>I’m grounded in <strong>${esc(mod.title)}</strong>. Ask me to explain a concept, go deeper on a real-world example, or pressure-test how you’d apply this module in your own work.</p>
      </div></div>
    </div>
    <div class="tutor-input">
      <textarea id="tutorText" placeholder="Ask anything about this module…"></textarea>
      <button id="tutorSend">SEND</button>
    </div>
  </div>`;
}

function initTutor(mod) {
  tutorState.history = [];
  tutorState.moduleId = mod.id;
  tutorState.busy = false;
  updateTutorCtx(mod);
  document.getElementById('tutorFab').addEventListener('click', openTutor);
  document.getElementById('tutorClose').addEventListener('click', closeTutor);
  document.getElementById('tutorSend').addEventListener('click', () => sendTutor(mod));
  document.getElementById('tutorText').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendTutor(mod); }
  });
}

function updateTutorCtx(mod) {
  const el = document.getElementById('tutorCtx');
  if (!el) return;
  const c = mod.courses[tutorState.courseIndex];
  el.textContent = c ? `CONTEXT: ${mod.title} → ${c.title}` : `CONTEXT: ${mod.title} (module overview)`;
}

function openTutor() { document.getElementById('tutorPanel')?.classList.add('open'); document.getElementById('tutorText')?.focus(); }
function closeTutor() { document.getElementById('tutorPanel')?.classList.remove('open'); }

async function sendTutor(mod) {
  const ta = document.getElementById('tutorText');
  const text = ta.value.trim();
  if (!text || tutorState.busy) return;
  const log = document.getElementById('tutorLog');

  if (!AI_ENABLED) {
    log.insertAdjacentHTML('beforeend',
      `<div class="msg ai"><div class="who">Tutor</div><div class="bubble"><p>The tutor runs on <code>google/gemini-2.5-flash</code> via OpenRouter. Add <code>OPENROUTER_API_KEY</code> to <code>.env</code> and restart the server to bring me online.</p></div></div>`);
    log.scrollTop = log.scrollHeight;
    return;
  }

  ta.value = '';
  tutorState.busy = true;
  tutorState.history.push({ role: 'user', content: text });
  log.insertAdjacentHTML('beforeend',
    `<div class="msg user"><div class="who">You</div><div class="bubble">${esc(text)}</div></div>
     <div class="msg ai"><div class="who">Tutor</div><div class="bubble"><span class="thinking"><i></i><i></i><i></i></span></div></div>`);
  log.scrollTop = log.scrollHeight;
  const bubble = log.lastElementChild.querySelector('.bubble');

  try {
    const r = await fetch('/api/ai/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        moduleId: tutorState.moduleId,
        courseIndex: tutorState.courseIndex,
        messages: tutorState.history,
        model: MODEL_CHOICE,
      }),
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error(err.error || `Tutor request failed (${r.status})`);
    }
    const reader = r.body.getReader();
    const dec = new TextDecoder();
    let buf = '', full = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const ln of lines) {
        if (!ln.startsWith('data: ')) continue;
        const payload = ln.slice(6).trim();
        if (payload === '[DONE]') continue;
        try {
          const { delta } = JSON.parse(payload);
          if (delta) { full += delta; bubble.innerHTML = md(full); log.scrollTop = log.scrollHeight; }
        } catch { /* partial frame */ }
      }
    }
    tutorState.history.push({ role: 'assistant', content: full });
  } catch (e) {
    bubble.innerHTML = `<p>⚠ ${esc(e.message)}</p>`;
  } finally {
    tutorState.busy = false;
  }
}

/* ---------------- opportunity advisor (agentic) ---------------- */

function renderAdvisor() {
  view.innerHTML = `
  <section class="advisor-page">
    <p class="mono-eyebrow" style="color:var(--signal); margin-bottom:14px;">Agentic component — three-step pipeline on ${esc(modelShort())}</p>
    <h1>The Opportunity Advisor</h1>
    <p class="lede">The Building AI Solutions method, run live by an agent: it decomposes your role into tasks,
    scores each for AI <em>value</em> and <em>ability</em>, mines your stated challenges
    for problems worth solving, and synthesizes a prioritized pilot plan — Quick Wins, Strategic Bets,
    Moonshots — with recommended tools and your personalized learning path.</p>

    ${AI_ENABLED ? '' : `<div class="notice">The advisor requires a Gemini model via OpenRouter.
      Add <code>OPENROUTER_API_KEY</code> to <code>.env</code> (see README) and restart the server.</div>`}

    <form class="advisor-form" id="advForm">
      <div class="row2">
        <label><b>Your role *</b><input name="role" required placeholder="e.g. Senior thermal engineer" /></label>
        <label><b>Industry *</b><input name="industry" required placeholder="e.g. EV powertrain / consumer electronics" /></label>
      </div>
      <label><b>What you actually do all week</b><textarea name="tasks" rows="3" placeholder="e.g. CHT simulations of battery packs, test correlation, design reviews, reporting to program management…"></textarea></label>
      <label><b>Biggest challenges / bottlenecks</b><textarea name="challenges" rows="3" placeholder="e.g. each simulation takes 14 hours, test correlation is manual, reports take a full day…"></textarea></label>
      <button class="btn primary" type="submit" ${AI_ENABLED ? '' : 'disabled'}>▶ Run the advisor</button>
    </form>

    <div id="advRun"></div>
  </section>`;

  document.getElementById('advForm').addEventListener('submit', runAdvisor);
}

async function runAdvisor(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = { ...Object.fromEntries(fd.entries()), model: MODEL_CHOICE };
  const out = document.getElementById('advRun');
  e.target.querySelector('button').disabled = true;

  const stepDefs = ['Decompose role into tasks', 'Score AI value × ability', 'Synthesize pilot roadmap'];
  out.innerHTML = `
    <div class="agent-steps">
      ${stepDefs.map((s, i) => `
        <div class="agent-step" data-step="${i + 1}">
          <span class="s-n">${i + 1}</span><span>${s}</span><span class="s-status">queued</span>
        </div>`).join('')}
    </div>
    <div class="adv-results" id="advResults"></div>`;

  const setStep = (n, state, label) => {
    const el = out.querySelector(`[data-step="${n}"]`);
    if (!el) return;
    el.classList.remove('active', 'done');
    if (state) el.classList.add(state);
    el.querySelector('.s-status').textContent = label;
  };

  const results = document.getElementById('advResults');

  try {
    const r = await fetch('/api/ai/advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error(err.error || `Advisor failed (${r.status})`);
    }
    const reader = r.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const ln of lines) {
        if (!ln.startsWith('data: ')) continue;
        let msg;
        try { msg = JSON.parse(ln.slice(6)); } catch { continue; }
        handleAdvisorEvent(msg, { setStep, results });
      }
    }
  } catch (err) {
    results.insertAdjacentHTML('beforeend', `<div class="notice">⚠ ${esc(err.message)}</div>`);
  } finally {
    e.target.querySelector('button').disabled = false;
  }
}

function handleAdvisorEvent(msg, { setStep, results }) {
  const { event, data } = msg;
  if (event === 'step') {
    for (let i = 1; i < data.n; i++) setStep(i, 'done', 'done');
    setStep(data.n, 'active', 'running…');
  }
  if (event === 'profile') {
    setStep(1, 'done', `${data.tasks.length} tasks`);
    results.insertAdjacentHTML('beforeend', `
      <div class="adv-card">
        <h3>① Your role, decomposed</h3>
        <table class="task-grid"><thead><tr><th>Task</th><th>Time share</th></tr></thead>
        <tbody>${data.tasks.map((t) => `<tr><td>${esc(t.task)}</td><td>${esc(t.timeShare || '—')}</td></tr>`).join('')}</tbody></table>
      </div>`);
  }
  if (event === 'scored') {
    setStep(2, 'done', 'done');
    results.insertAdjacentHTML('beforeend', `
      <div class="adv-card">
        <h3>② AI exposure scoring</h3>
        <table class="task-grid"><thead><tr><th>Task</th><th>Value</th><th>AI ability</th><th>Note</th></tr></thead>
        <tbody>${data.scored.map((t) => `
          <tr><td>${esc(t.task)}</td>
          <td><span class="score-pips">${pips(t.value)}</span></td>
          <td><span class="score-pips ability">${pips(t.ability)}</span></td>
          <td>${esc(t.note || '')}</td></tr>`).join('')}</tbody></table>
        ${data.problems?.length ? `
          <h3 style="margin-top:22px;">Problems worth solving</h3>
          ${data.problems.map((p) => `<div class="pilot"><div class="p-head"><b>${esc(p.problem)}</b></div><p>${esc(p.impact)}</p></div>`).join('')}` : ''}
      </div>`);
  }
  if (event === 'roadmap') {
    setStep(3, 'done', 'done');
    const typeLabel = { quickWin: 'Quick Win', strategicBet: 'Strategic Bet', moonshot: 'Moonshot' };
    results.insertAdjacentHTML('beforeend', `
      <div class="adv-card">
        <h3>③ Your pilot roadmap</h3>
        <p class="adv-summary">${esc(data.summary || '')}</p>
        <div style="margin-top:18px;">
        ${data.pilots.map((p) => `
          <div class="pilot">
            <div class="p-head"><b>${esc(p.name)}</b><span class="pilot-type ${esc(p.type)}">${typeLabel[p.type] || esc(p.type)}</span></div>
            <p>${esc(p.detail)}</p>
            ${p.tools?.length ? `<div class="p-tools">TOOLS: ${p.tools.map(esc).join(' · ')}</div>` : ''}
            ${p.firstStep ? `<div class="p-first"><b>First step (30-90 Rule):</b> ${esc(p.firstStep)}</div>` : ''}
          </div>`).join('')}
        </div>
        ${data.learningPath?.length ? `
        <h3 style="margin-top:24px;">Your learning path</h3>
        ${data.learningPath.map((lp) => {
          const m = CATALOG.find((c) => c.id === lp.id);
          return m
            ? `<a class="path-link" href="#/module/${m.id}"><b>№ ${m.number} — ${esc(m.title)}</b><span>${esc(lp.reason || '')}</span></a>`
            : '';
        }).join('')}` : ''}
      </div>`);
  }
  if (event === 'error') {
    results.insertAdjacentHTML('beforeend', `<div class="notice">⚠ ${esc(data.message)}</div>`);
  }
}

/* ---------------- progress page ---------------- */

function renderProfilePage() {
  if (!PROFILE) {
    view.innerHTML = `
    <section class="about-page">
      <p class="mono-eyebrow" style="margin-bottom:14px;">Learner profile</p>
      <h1>No profile selected</h1>
      <p>Create a learner profile to track which modules, courses, and lectures you’ve completed.
      Progress is stored on the server, so it survives restarts and works across browsers on this machine.</p>
      <p style="margin-top:20px;"><button class="btn primary" id="mkProfile">＋ Create a profile</button></p>
    </section>`;
    document.getElementById('mkProfile').addEventListener('click', openProfileModal);
    return;
  }

  const lecturesDone = Object.keys(PROFILE.progress.lectures).length;
  const totalLessons = CATALOG.reduce((n, m) => n + m.lessonCount, 0);
  const quizzes = Object.values(PROFILE.progress.quizzes);
  const quizPasses = quizzes.filter((q) => q.pct >= 80).length;
  const modulesComplete = CATALOG.filter((m) => modulePct(m.id, m.lessonCount) === 100).length;
  const started = CATALOG.filter((m) => modulePct(m.id, m.lessonCount) > 0);

  view.innerHTML = `
  <section class="about-page profile-page">
    <p class="mono-eyebrow" style="margin-bottom:14px;">Learner profile</p>
    <h1>${esc(PROFILE.name)}</h1>
    <p class="lede">${PROFILE.role ? esc(PROFILE.role) + ' · ' : ''}Learning since ${new Date(PROFILE.createdAt).toLocaleDateString()}</p>

    <div class="hero-stats" style="margin-top:28px;">
      <div><b>${lecturesDone}</b><span>Lectures attended</span></div>
      <div><b>${totalLessons}</b><span>Lectures total</span></div>
      <div><b>${quizPasses}</b><span>Checks passed</span></div>
      <div><b>${modulesComplete}</b><span>Modules complete</span></div>
    </div>

    <h2 style="margin-top:48px;">Module progress</h2>
    ${started.length === 0 ? `<p>Nothing attended yet — open any module and click a lesson to attend your first lecture.</p>` : ''}
    <div class="prof-modules">
      ${CATALOG.map((m) => {
        const pct = modulePct(m.id, m.lessonCount);
        if (pct === 0) return '';
        const passes = Array.from({ length: m.courseCount }, (_, i) => quizBest(m.id, i)).filter((q) => q && q.pct >= 80).length;
        return `
        <a class="prof-mod" href="#/module/${m.id}">
          <span class="num">№ ${m.number}</span>
          <span class="pm-main">
            <b>${esc(m.title)}</b>
            <span class="prog-bar"><i style="width:${pct}%"></i></span>
          </span>
          <span class="pm-meta">${pct}%${pct === 100 ? ' ✓' : ''}<br/><span>${passes}/${m.courseCount} checks</span></span>
        </a>`;
      }).join('')}
    </div>

    <h2 style="margin-top:44px;">Manage</h2>
    <p>Switch or create profiles with the selector in the header. Progress lives in
    <code>storage/profiles.json</code> on the server.</p>
    <p style="margin-top:12px;"><button class="btn" id="delProfile">Delete this profile…</button></p>
  </section>`;

  document.getElementById('delProfile').addEventListener('click', async () => {
    if (!confirm(`Delete profile "${PROFILE.name}" and all its progress? This cannot be undone.`)) return;
    await fetch(`/api/profiles/${PROFILE.id}`, { method: 'DELETE' });
    localStorage.removeItem(PROFILE_LS_KEY);
    PROFILE = null;
    PROFILES = await getJSON('/api/profiles');
    renderProfileCtl();
    renderProfilePage();
  });
  window.scrollTo(0, 0);
}

/* ---------------- about ---------------- */

function renderAbout() {
  view.innerHTML = `
  <section class="about-page">
    <p class="mono-eyebrow" style="margin-bottom:14px;">Method</p>
    <h1>How AI Roadmap works</h1>
    <p>Every applied module follows the same original four-part progression: understand the
    <em>current landscape</em> of AI in your field, see the <em>emerging operating models</em>, <em>map the
    opportunities</em> with task-based and problem-first methods, then move to <em>implementation</em> — tools,
    deployment, and a hands-on lab. The core curriculum runs Learn → Build → Lead (AI Essentials → Building AI
    Solutions → Enterprise AI Strategy); the engineering track extends the same progression into surrogate
    modeling, physics-informed ML, and verification discipline.</p>

    <h2>The generative layer</h2>
    <p>The AI features run on your choice of Gemini model via OpenRouter (long context, reasoning-capable,
    priced for high-volume tutoring):</p>
    <ul>
      <li><b>Interactive lectures</b> — web-grounded, streamed lessons with syntax-highlighted code, rendered math, citations, a reader window, and optional narration.</li>
      <li><b>AI Tutor</b> — a streaming chat grounded in the module and course you’re viewing via system-prompt context injection.</li>
      <li><b>Knowledge checks</b> — five-question applied quizzes generated on demand with structured JSON output, graded in the browser with explanations.</li>
      <li><b>Opportunity Advisor</b> — an agentic three-step pipeline (decompose → score → synthesize) that produces your personal pilot plan and learning path.</li>
    </ul>

    <h2>The platform as courseware</h2>
    <p>The application itself is a teaching artifact. <code>server.js</code> demonstrates the patterns taught in
    AI Essentials (agents), Building AI Solutions (custom assistants), and Software Engineering &amp; AI
    (building AI features): server-side key handling, context grounding, streaming, structured outputs, and a
    multi-step agent loop. Read the source as the lab manual.</p>

    <h2>Completion model</h2>
    <p>Each module ends with a comprehensive assessment (practice with the generated knowledge checks — 80% is the
    pass bar per course). Industry modules take ~4 hours; the core curriculum runs 3–6 hours per module.</p>
  </section>`;
  window.scrollTo(0, 0);
}
