# AI Roadmap

Training, education, and real-world implementation guidance for AI applications —
**19 modules** across three tracks, with interactive AI lectures, a live AI tutor, on-demand
knowledge checks, and an agentic opportunity advisor powered by **selectable Gemini models
via OpenRouter**.

## Quick start

```bash
npm install
copy .env.example .env     # then add your OpenRouter key
npm start                  # → http://localhost:3000
```

Get a key at <https://openrouter.ai/keys> and put it in `.env`:

```
OPENROUTER_API_KEY=sk-or-...
```

The app runs fully without a key (all curriculum is browsable); the generative
features — tutor, lectures, quizzes, advisor, audits — light up once the key is
set and the server restarted. The header badge shows the current status.

**Model selection:** a selector in the header switches every generative feature
between `google/gemini-2.5-flash` (default), `google/gemini-3-flash-preview`,
`google/gemini-3.5-flash`, and `google/gemini-3.1-pro-preview`. The choice is
per-browser (saved in localStorage) and sent with each request; the server
validates it against the allowlist in `server.js` and falls back to
`OPENROUTER_MODEL` for anything off-list. Narration always uses Kokoro-82M.

## The curriculum

**Core curriculum (01–03)** — a three-stage practitioner path, taken in order:

| № | Stage | Module | Structure |
|---|-------|--------|-----------|
| 01 | Learn | AI Essentials | 8 courses, 6 h — literacy: concepts, current state, generative AI, prompting, agents |
| 02 | Build | Building AI Solutions | 4 courses, 3 h — task-based & problem-first methods, time-boxed pilots, custom assistants |
| 03 | Lead | Enterprise AI Strategy | 7 courses, 5 h — AI-ready culture, education, governance, policy, responsible AI, strategic plan |

**Industry track (04–14)** — eleven modules (Manufacturing, Operations, Finance,
Customer Success, Sales, Marketing, People & HR, Legal, Software Engineering, Retail & CPG,
Healthcare), each following the same four-course progression: *The Current Landscape →
Emerging Operating Models → Mapping Opportunities → Implementation & Tooling*, plus a final
assessment. Every course cites current real-world implementations (Intercom Fin, Harvey,
GitHub Copilot, Abridge, Augury, …).

**Engineering & Science track (15–19)** — same progression, deeper technical content:

| № | Module | Signature topics |
|---|--------|------------------|
| 15 | Generative Mechanical Design | Generative design (Autodesk/GM bracket), nTop, ML surrogates, CAD copilots |
| 16 | ML-Driven Thermal Analysis | Thermal surrogates, PINNs, DeepMind data-center cooling, PhysicsNeMo |
| 17 | Neural Surrogates for Finite-Element Analysis | Neural operators (FNO/DeepONet), MeshGraphNets, Ansys SimAI, Altair physicsAI |
| 18 | ML-Driven Computational Fluid Dynamics | Flow-field surrogates, ML turbulence closures, Neural Concept, Luminary Cloud |
| 19 | Computational Research Biology | AlphaFold, RFdiffusion/ProteinMPNN, single-cell foundation models, ColabFold |

## Generative & agentic components

All run on [`google/gemini-2.5-flash`](https://openrouter.ai/google/gemini-2.5-flash)
(1M-token context), proxied server-side so the key never reaches the browser:

- **Interactive lectures** (`POST /api/ai/lecture`) — every lesson in every syllabus is
  clickable. The server first runs a DuckDuckGo web search (neo-ddg-search pattern: the
  keyless `html.duckduckgo.com` endpoint with `uddg` redirect decoding) for current
  sources on the lesson topic, then streams a 700–1000-word instructor-voice lecture
  from Gemini — grounded in the module/course/lesson context, citing the found sources
  inline as clickable `[n]` references, ending with key takeaways and a hands-on
  exercise. Sources render in an "Explore further" sidebar; lectures are cached
  client-side per session and can be regenerated.
- **AI Tutor** (`POST /api/ai/tutor`) — streaming chat grounded in the currently open
  module/course via system-prompt context injection (SSE).
- **Knowledge checks** (`POST /api/ai/quiz`) — five applied questions per course,
  structured JSON output, graded in the browser with explanations.
- **Lecture narration / TTS** (`POST /api/ai/speak`) — every finished lecture has a
  "🔊 Listen" bar with six narrator voices, powered by
  [`hexgrad/kokoro-82m`](https://openrouter.ai/hexgrad/kokoro-82m) through OpenRouter's
  OpenAI-compatible `/v1/audio/speech` endpoint ($0.62/M characters ≈ $0.004 per
  lecture). The client strips markdown and citations to spoken prose, splits it into
  sentence-boundary chunks, and plays them sequentially while prefetching the next
  chunk — playback starts in seconds rather than waiting for the full lecture to
  synthesize. Override the voice model with `OPENROUTER_TTS_MODEL` in `.env`.
- **Rich lecture rendering** — lectures render on a white reading sheet with full
  markdown (marked.js), fenced code blocks with automatic language detection and
  syntax highlighting (highlight.js), and LaTeX equations via KaTeX (`$...$` inline,
  `$$...$$` display; math spans are shielded from the markdown parser so underscores
  in LaTeX survive). "⧉ Open in reader window" pops the finished lecture into a
  standalone white page — same highlighted code, rendered math, citation links, and
  source list — that is also print-friendly. The lecture prompt instructs the model
  to emit language-tagged code fences and LaTeX, and the TTS cleanup speaks
  "see the code example on screen" instead of reading code or equations aloud.
- **Curriculum currency audit** (`POST /api/ai/audit`) — because AI moves faster than
  any static curriculum, every module page has a "Verify currency" panel. The server
  runs live web searches on the module's field, then has Gemini review the module's
  structure (courses, lessons, cited examples) against the current state of the
  technology. It returns a verdict (current / minor-updates / needs-revision), specific
  findings with per-item status (current / dated / obsolete) and suggested fixes,
  emerging topics the module should consider covering, and the sources checked against.
  Results are cached server-side for 24 h; "Re-verify now" forces a fresh audit.
- **Opportunity Advisor** (`POST /api/ai/advisor`) — a three-step agentic pipeline:
  ① decompose the learner's role into tasks → ② score each for AI value × ability and
  mine problems → ③ synthesize a Quick Win / Strategic Bet / Moonshot pilot plan with
  tool recommendations and a personalized learning path. Progress streams to
  the UI step by step.

## Learner profiles & progress tracking

Create a profile from the header selector (＋ New profile…). Per learner, the platform
tracks:

- **Lectures attended** — attending a generated lecture to the end auto-completes the
  lesson; a manual "Mark complete / incomplete" toggle is on every lecture page.
- **Course completion** — derived: all lessons in a course attended (course headers show
  `n/m` and a ✓ when full). Best knowledge-check score per course is also recorded
  (80% = passed).
- **Module completion** — derived: all courses complete. Catalog rows and module sidebars
  show live progress bars; **My Progress** (header nav) gives the full overview.

Storage: `storage/profiles.json` on the server — survives restarts, works across
browsers, no database required. Profiles API: `GET/POST /api/profiles`,
`GET/DELETE /api/profiles/:id`, `POST /api/profiles/:id/progress`.

## Project layout

```
server.js            Express server: static hosting, curriculum API, OpenRouter proxy
data/
  curriculum.js      Index assembling all 19 modules
  core.js            Modules 01–03
  industry-a.js      Modules 04–09
  industry-b.js      Modules 10–14
  engineering.js     Modules 15–19
  factory.js         Shared four-course module factory
public/
  index.html         Shell
  styles.css         Editorial paper-and-ink design system
  app.js             Hash-routed SPA: catalog, module pages, lectures, tutor, quiz, advisor
```

## API

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/status` | GET | AI availability + model id |
| `/api/curriculum` | GET | Catalog summaries |
| `/api/curriculum/:id` | GET | Full module |
| `/api/ai/lecture` | POST | DDG search + streamed instructor lecture for one lesson (SSE) |
| `/api/ai/audit` | POST | Curriculum-currency audit of a module vs. current state of tech |
| `/api/ai/speak` | POST | TTS narration chunk via kokoro-82m (returns audio/mpeg) |
| `/api/ai/tutor` | POST | Streaming grounded tutor chat |
| `/api/ai/quiz` | POST | Generate a knowledge check |
| `/api/ai/advisor` | POST | Run the agentic advisor (SSE progress) |

The platform doubles as courseware: `server.js` is the worked example for the
patterns taught in *AI Essentials* (agents), *Building AI Solutions* (custom
assistants), and *Software Engineering & AI* (building AI features).


