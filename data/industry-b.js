const { makeModule } = require('./factory');

module.exports = [
  makeModule({
    id: 'ai-for-hr',
    number: '10',
    title: 'AI for HR',
    name: 'HR',
    track: 'industry',
    tagline: 'Talent intelligence, augmented HR service delivery — and the compliance line you must not cross.',
    description:
      'For people leaders applying AI across recruiting, internal mobility, HR service delivery, and workforce planning — with the bias, privacy, and regulatory obligations (EEOC, NYC Local Law 144, EU AI Act) treated as first-class design constraints.',
    audience: [
      'CHROs and HR business partners',
      'Talent acquisition and people-operations teams',
      'HRIS, people-analytics, and total-rewards professionals',
    ],
    outcomes: [
      'Deploy AI in recruiting workflows while meeting bias-audit and disclosure obligations',
      'Stand up an HR service assistant grounded in your policies',
      'Use skills inference for internal mobility and workforce planning',
      'Run an AI-in-employment risk assessment for any proposed tool',
    ],
    state: {
      summary: 'The state of HR AI: screening and scheduling automation are widespread, HR chatbots are mature, and employment AI is the most regulated application domain.',
      lessons: [
        { title: 'The HR AI landscape', detail: 'Sourcing, screening, scheduling, service delivery, people analytics — adoption and maturity by area.' },
        { title: 'The regulatory perimeter', detail: 'NYC Local Law 144 bias audits, EEOC guidance, Illinois AI Video Interview Act, EU AI Act high-risk classification for employment systems.' },
        { title: 'Cautionary tales', detail: 'Amazon’s scrapped resume model (gender bias) and the iTutorGroup EEOC settlement — what they teach about training data and accountability.' },
      ],
      examples: [
        { name: 'IBM AskHR', detail: 'HR service assistant handling millions of employee queries; IBM publicly reported a large share of routine HR tasks automated.' },
        { name: 'HireVue', detail: 'Structured AI-assisted interviewing at scale — and the public scrutiny that led it to drop facial analysis; a live case in responsible iteration.' },
      ],
    },
    future: {
      summary: 'Skills-based organizations: AI infers skills from work, matches people to opportunity, and HR shifts from administration to talent strategy.',
      lessons: [
        { title: 'The skills graph', detail: 'Inferring skills from resumes, work artifacts, and learning history; internal talent marketplaces.' },
        { title: 'Augmented HRBPs', detail: 'AI-drafted job architectures, comp benchmarking, and policy guidance with human judgment on top.' },
        { title: 'Workforce planning with scenarios', detail: 'Modeling AI’s own impact on roles — HR as steward of the org’s AI transition.' },
      ],
      examples: [
        { name: 'Eightfold & Gloat', detail: 'Talent-intelligence platforms powering internal mobility marketplaces at enterprises like Schneider Electric.' },
        { name: 'Workday Illuminate', detail: 'Embedded AI across the dominant HCM suite — the "AI arrives in your system of record" pattern.' },
      ],
    },
    advantage: {
      summary: 'Find your HR AI advantage with the Use Case and Problem-Based models, with a compliance overlay on every candidate.',
      lessons: [
        { title: 'Decompose HR roles', detail: 'Recruiter, HRBP, people-ops: task-level exposure scoring.' },
        { title: 'The compliance overlay', detail: 'Tag every use case: does it influence employment decisions? If yes, audit and disclosure requirements attach.' },
        { title: 'Your HR AI roadmap', detail: 'Service-delivery Quick Wins; skills-inference Sweetspots; decision-support Moonshots (never decision automation).' },
      ],
      examples: [],
    },
    applied: {
      summary: 'Implementation: HR assistants, recruiting tools, and the governance artifacts regulators and works councils expect.',
      lessons: [
        { title: 'Building the HR assistant', detail: 'Policy-grounded retrieval, escalation to humans, multilingual support, and privacy boundaries.' },
        { title: 'Evaluating recruiting AI', detail: 'Validation evidence, adverse-impact testing, candidate disclosure, and vendor audit rights.' },
        { title: 'People analytics with LLMs', detail: 'Engagement-survey synthesis and attrition narratives — with anonymity thresholds.' },
        { title: 'Implementation lab', detail: 'Run a full risk assessment and pilot design for one HR use case.' },
      ],
      examples: [
        { name: 'Paradox (Olivia)', detail: 'Conversational scheduling/screening for hourly hiring at McDonald’s and others — high-volume, low-risk task automation done well.' },
      ],
    },
    deliverables: [
      'HR task heatmap with compliance overlay',
      'AI-in-employment risk assessment for one tool',
      'HR assistant grounding-and-escalation design',
    ],
  }),

  makeModule({
    id: 'ai-for-legal',
    number: '11',
    title: 'AI for Legal',
    name: 'Legal',
    track: 'industry',
    tagline: 'Research, review, and drafting transformed — with verification as a professional duty.',
    description:
      'For legal professionals applying AI to research, contract lifecycle, e-discovery, and drafting — grounded in the duty of competence, confidentiality obligations, and the hard lessons of hallucinated citations.',
    audience: [
      'General counsel and in-house legal teams',
      'Law-firm partners, associates, and knowledge managers',
      'Legal operations and contract managers',
    ],
    outcomes: [
      'Apply AI to research, review, and drafting with verification workflows that satisfy professional duty',
      'Evaluate legal AI tools on grounding, citation integrity, and confidentiality terms',
      'Modernize contract lifecycle with AI extraction, playbooks, and redline assistance',
      'Write the firm/department AI use policy',
    ],
    state: {
      summary: 'Legal AI’s breakout: research copilots and contract intelligence in production at major firms, with citation hallucination as the defining cautionary tale.',
      lessons: [
        { title: 'The legal AI landscape', detail: 'Research, CLM, e-discovery, drafting — what is production-ready versus demo-ready.' },
        { title: 'Mata v. Avianca and its successors', detail: 'Hallucinated citations, sanctions, and the verification workflows every legal team now needs.' },
        { title: 'Confidentiality and privilege', detail: 'Data handling terms, training opt-outs, and when client consent is required.' },
      ],
      examples: [
        { name: 'Harvey at A&O Shearman', detail: 'Firm-wide deployment of an LLM platform across thousands of lawyers — the highest-profile big-law adoption.' },
        { name: 'Thomson Reuters CoCounsel', detail: 'Casetext’s research/review assistant, acquired for $650M, now embedded in Westlaw workflows with citation grounding.' },
      ],
    },
    future: {
      summary: 'The leveraged lawyer: AI handles first-pass review and drafting at scale, shifting value to judgment, strategy, and client counsel.',
      lessons: [
        { title: 'First-pass everything', detail: 'Review, summarization, and draft generation as defaults; the associate role redefined around verification and judgment.' },
        { title: 'Contracts as data', detail: 'Portfolio-wide obligation extraction, risk scoring, and playbook-driven negotiation.' },
        { title: 'Access-to-justice implications', detail: 'AI-assisted services expanding coverage for routine matters; regulatory responses.' },
      ],
      examples: [
        { name: 'Ironclad AI', detail: 'CLM with AI redlining against playbooks — legal ops teams clearing routine contracts without attorney touches.' },
        { name: 'Relativity aiR', detail: 'Generative AI review in the dominant e-discovery platform, cutting privilege-review hours on large matters.' },
      ],
    },
    advantage: {
      summary: 'Apply the Use Case and Problem-Based models to the legal function, weighted by risk and verification cost.',
      lessons: [
        { title: 'Decompose legal work', detail: 'Research, review, drafting, negotiation, counseling: exposure scoring per task.' },
        { title: 'Verification-cost weighting', detail: 'A use case is only valuable net of the checking it requires; model that explicitly.' },
        { title: 'Your legal AI roadmap', detail: 'Summarization Quick Wins; contract-extraction Sweetspots; negotiation-agent Moonshots.' },
      ],
      examples: [],
    },
    applied: {
      summary: 'Implementation: tool evaluation, grounded workflows, and the policies that make adoption defensible.',
      lessons: [
        { title: 'Evaluating legal AI', detail: 'Citation grounding, retrieval sources, confidentiality terms, and benchmark testing on your own matters.' },
        { title: 'Verification workflows', detail: 'Cite-checking gates, source-linked outputs, and sign-off records.' },
        { title: 'Prompting for legal work', detail: 'Issue-spotting, clause comparison, and jurisdiction-constrained research patterns.' },
        { title: 'Implementation lab', detail: 'Pilot one matter type end-to-end with before/after hour tracking.' },
      ],
      examples: [
        { name: 'Run the Use-Case Advisor', detail: 'Generate your legal-team task heatmap with this platform’s agent as the course exercise.' },
      ],
    },
    deliverables: [
      'Legal task heatmap with verification-cost weighting',
      'AI tool evaluation scorecard on one real matter',
      'Department AI use policy draft',
    ],
  }),

  makeModule({
    id: 'ai-for-software-technology',
    number: '12',
    title: 'AI for Software & Technology',
    name: 'Software & Technology',
    track: 'industry',
    tagline: 'AI-assisted engineering, agentic coding, and AI-native product strategy.',
    description:
      'For engineering and product leaders navigating the fastest-moving AI adoption curve: coding assistants and agents, AI in the SDLC, AIOps, and building AI features into your own products.',
    audience: [
      'CTOs, VPs of engineering, and engineering managers',
      'Software engineers, SREs, and QA professionals',
      'Product managers building AI-powered features',
    ],
    outcomes: [
      'Roll out coding assistants and agentic tools with measured productivity and quality outcomes',
      'Redesign SDLC stages — review, testing, incident response — around AI leverage',
      'Architect AI features: model selection, RAG, agents, evals, and cost control',
      'Govern AI-generated code: security, licensing, and review standards',
    ],
    state: {
      summary: 'Software is AI’s most penetrated profession: assistants are ubiquitous, agentic coding is in production, and the data on productivity is real but nuanced.',
      lessons: [
        { title: 'The coding assistant era', detail: 'Completion → chat → agents: GitHub Copilot’s controlled study (~55% faster on a benchmark task) and what it does and does not prove.' },
        { title: 'Agentic development', detail: 'Claude Code, Cursor, and autonomous PR agents (Devin, Copilot Workspace): current capability boundaries.' },
        { title: 'Quality and security evidence', detail: 'Studies on churn, duplication, and vulnerability rates in AI-assisted code; what review standards must change.' },
      ],
      examples: [
        { name: 'GitHub Copilot at scale', detail: 'Deployed to millions of developers; enterprise telemetry shows acceptance-rate and satisfaction patterns worth studying before your rollout.' },
        { name: 'Google’s internal adoption', detail: 'Google reports ~25%+ of new code AI-assisted with mandatory human review — the governance pattern at scale.' },
      ],
    },
    future: {
      summary: 'The orchestration shift: engineers specify, review, and own outcomes while agents implement; products become AI-native by default.',
      lessons: [
        { title: 'From writing to orchestrating', detail: 'Spec-driven development, parallel agent runs, and the rising premium on review skill and system design.' },
        { title: 'The AI-native product', detail: 'Products that converse, act, and personalize: new UX patterns and cost/latency budgets.' },
        { title: 'Team topology changes', detail: 'Smaller, more senior-leaning teams; what happens to the junior pipeline and how to rebuild it deliberately.' },
      ],
      examples: [
        { name: 'Cursor’s rise', detail: 'AI-native editor reaching mass adoption among professional engineers in under two years — evidence of how fast tooling shifts.' },
      ],
    },
    advantage: {
      summary: 'Find your engineering-org AI advantage with the Use Case and Problem-Based models across the SDLC.',
      lessons: [
        { title: 'Decompose the SDLC', detail: 'Design, implementation, review, testing, deployment, incident response: exposure scoring per stage.' },
        { title: 'Problem-first candidates', detail: 'Cycle time, escaped defects, on-call load, onboarding time: quantify before tooling.' },
        { title: 'Your engineering AI roadmap', detail: 'Assistant rollout Quick Wins; test-generation and review Sweetspots; autonomous-agent Moonshots.' },
      ],
      examples: [],
    },
    applied: {
      summary: 'Implementation: tooling rollout, building AI features (RAG, agents, evals), and AIOps.',
      lessons: [
        { title: 'Rolling out assistants well', detail: 'Policy, training, measurement (DORA + quality), and license/security scanning for generated code.' },
        { title: 'Building AI features', detail: 'Model selection (e.g., Gemini 2.5 Flash via OpenRouter — the stack running this platform), RAG, structured outputs, and agent loops; read server.js as a worked example.' },
        { title: 'Evals and observability', detail: 'Golden sets, LLM-as-judge with calibration, regression gates in CI, token-cost monitoring.' },
        { title: 'AIOps and incident response', detail: 'Anomaly detection, AI-drafted incident summaries, and runbook agents (PagerDuty, Datadog Bits AI).' },
      ],
      examples: [
        { name: 'This platform’s architecture', detail: 'Express proxy + system-prompt grounding + streaming + structured JSON outputs + a three-step agent pipeline: a complete reference implementation you can read and extend.' },
      ],
    },
    deliverables: [
      'SDLC AI exposure map with measurement plan',
      'AI feature architecture sketch (model, grounding, evals, cost budget)',
      'AI-generated-code governance standard',
    ],
  }),

  makeModule({
    id: 'ai-for-retail-cpg',
    number: '13',
    title: 'AI for Retail & CPG',
    name: 'Retail & CPG',
    track: 'industry',
    tagline: 'Demand sensing, personalization, and the AI-run shelf.',
    description:
      'For retail and consumer-goods professionals applying AI across demand forecasting, pricing, supply chain, in-store operations, personalization, and product innovation.',
    audience: [
      'Retail and CPG executives and category leaders',
      'Merchandising, supply chain, and store-operations teams',
      'E-commerce, growth, and consumer-insights professionals',
    ],
    outcomes: [
      'Apply ML demand forecasting and inventory optimization to your category data',
      'Evaluate dynamic pricing and promotion optimization with guardrails',
      'Deploy personalization across e-commerce and loyalty programs',
      'Use generative AI for product innovation and content at retail scale',
    ],
    state: {
      summary: 'Retail runs on prediction: forecasting and replenishment are decades-mature, personalization defines e-commerce leaders, and generative AI is rewriting content and innovation cycles.',
      lessons: [
        { title: 'The prediction backbone', detail: 'Demand forecasting, replenishment, and markdown optimization — where the established ROI lives.' },
        { title: 'Personalization economics', detail: 'Recommendation engines as revenue drivers; the data-scale divide between leaders and the rest.' },
        { title: 'Generative AI hits the category', detail: 'Product content at SKU scale, AI shopping assistants, and synthetic concept testing.' },
      ],
      examples: [
        { name: 'Amazon', detail: 'Forecasting, recommendation (a large share of sales attributed), and Rufus shopping assistant — the integrated benchmark.' },
        { name: 'Walmart', detail: 'AI demand forecasting across thousands of stores, shelf-scanning, and generative AI for product catalog enrichment at SKU scale.' },
      ],
    },
    future: {
      summary: 'Agentic commerce: AI shopping agents change discovery, supply chains plan themselves, and innovation cycles compress from years to months.',
      lessons: [
        { title: 'When the customer is an agent', detail: 'AI shopping assistants intermediating purchase decisions — implications for brand, pricing, and retail media.' },
        { title: 'The self-planning supply chain', detail: 'Demand sensing plus autonomous replenishment and allocation; S&OP as exception management.' },
        { title: 'AI-speed innovation', detail: 'Generative concept exploration, synthetic panels, and rapid iteration on formulation and packaging.' },
      ],
      examples: [
        { name: 'Zara / Inditex', detail: 'Demand-led fast fashion: AI-supported trend detection and replenishment underpinning industry-leading inventory turns.' },
        { name: 'Coca-Cola Y3000', detail: 'AI co-created product flavor and campaign — a template (and cautionary debate) for AI-led innovation marketing.' },
      ],
    },
    advantage: {
      summary: 'Find your retail/CPG AI advantage with the Use Case and Problem-Based models.',
      lessons: [
        { title: 'Decompose the value chain', detail: 'Plan, buy, move, sell, serve: task-level AI exposure by function.' },
        { title: 'Problem-first candidates', detail: 'Out-of-stocks, shrink, markdown loss, content cycle time: quantify and rank.' },
        { title: 'Your retail AI roadmap', detail: 'Content-generation Quick Wins; forecasting Sweetspots; agentic-commerce Moonshots.' },
      ],
      examples: [],
    },
    applied: {
      summary: 'Implementation: forecasting stacks, personalization platforms, store-ops AI, and content pipelines.',
      lessons: [
        { title: 'Forecasting and replenishment tooling', detail: 'Blue Yonder, RELEX, o9, and cloud-native builds; backtest discipline and exception design.' },
        { title: 'Personalization platforms', detail: 'Dynamic Yield, Bloomreach, Algolia; identity, consent, and measurement foundations.' },
        { title: 'Store operations AI', detail: 'Computer vision for shelf and shrink; task management from prediction.' },
        { title: 'Implementation lab', detail: 'Pick one category or banner; design a 30-90 pilot with holdout measurement.' },
      ],
      examples: [
        { name: 'Starbucks Deep Brew', detail: 'Personalized offers and store-level demand planning in one program — the loyalty-data flywheel in action.' },
      ],
    },
    deliverables: [
      'Value-chain AI exposure map',
      'One quantified problem statement (e.g., OOS rate, content cycle time)',
      '30-90 pilot with holdout design',
    ],
  }),

  makeModule({
    id: 'ai-for-healthcare',
    number: '14',
    title: 'AI for Healthcare',
    name: 'Healthcare',
    track: 'industry',
    tagline: 'Relieving the administrative burden and augmenting clinical work — under HIPAA and FDA rules.',
    description:
      'For healthcare leaders, clinicians, and non-clinical professionals addressing administrative waste, clinician burnout, and diagnostic delay with AI — inside the regulatory and safety constraints the domain demands.',
    audience: [
      'Hospital executives, practice managers, and department heads',
      'Physicians, nurses, and allied health professionals',
      'Non-clinical staff in revenue cycle, operations, HR, and marketing',
    ],
    outcomes: [
      'Identify high-value, lower-risk administrative AI wins (documentation, coding, prior auth)',
      'Understand the clinical AI evidence bar: FDA clearance, validation, and monitoring',
      'Apply HIPAA-compliant patterns for any AI tool touching PHI',
      'Build an AI roadmap that sequences administrative wins before clinical decision support',
    ],
    state: {
      summary: 'Healthcare’s AI moment: ambient documentation is the breakout application, imaging AI is FDA-cleared at scale, and admin automation is attacking the cost crisis.',
      lessons: [
        { title: 'The systemic problem AI targets', detail: 'Administrative spend share, clinician burnout from documentation, and diagnostic delays — quantified.' },
        { title: 'The breakout: ambient clinical documentation', detail: 'Ambient scribes drafting notes from the patient conversation; published reductions in after-hours "pajama time".' },
        { title: 'Clinical AI’s evidence bar', detail: '1,000+ FDA-cleared AI/ML devices (mostly imaging); what clearance does and does not guarantee.' },
      ],
      examples: [
        { name: 'Abridge & Microsoft DAX Copilot', detail: 'Ambient documentation deployed across major systems (Kaiser Permanente, Emory); studies report meaningful reductions in documentation burden and burnout measures.' },
        { name: 'Viz.ai & Aidoc', detail: 'FDA-cleared triage AI flagging stroke and other critical findings, with published door-to-treatment time improvements.' },
      ],
    },
    future: {
      summary: 'Three shifts: automating the previously non-automatable, the clinician-copilot model, and reactive-to-predictive care.',
      lessons: [
        { title: 'The copilot model of care', detail: 'AI drafts, summarizes, and flags; clinicians decide — preserving accountability while recovering hours.' },
        { title: 'From reactive to predictive', detail: 'Risk stratification, deterioration prediction, and population-health outreach driven by models.' },
        { title: 'The patient-facing layer', detail: 'Triage assistants, message drafting (with disclosure), and access expansion — benefits and safety limits.' },
      ],
      examples: [
        { name: 'Epic + generative AI', detail: 'In-basket message drafting and chart summarization embedded in the dominant EHR — AI arriving inside the system of record.' },
      ],
    },
    advantage: {
      summary: 'Find your healthcare AI advantage: Use Case and Problem-Based models with a risk-tiering overlay (administrative → operational → clinical).',
      lessons: [
        { title: 'Decompose roles across the system', detail: 'Front desk, coding, nursing, physicians: task exposure scoring.' },
        { title: 'Risk tiering', detail: 'Administrative (low) → operational (medium) → clinical decision support (high): sequence accordingly.' },
        { title: 'Your healthcare AI roadmap', detail: 'Documentation and prior-auth Quick Wins; throughput Sweetspots; predictive-care Moonshots.' },
      ],
      examples: [],
    },
    applied: {
      summary: 'Implementation: HIPAA-compliant architecture, vendor evaluation, prompting for clinical-adjacent work, and monitoring.',
      lessons: [
        { title: 'HIPAA-compliant AI patterns', detail: 'BAAs, de-identification, zero-retention API terms, and audit logging for any PHI-touching tool.' },
        { title: 'Evaluating clinical AI vendors', detail: 'Validation populations, drift monitoring, workflow fit, and the local-validation imperative.' },
        { title: 'Revenue-cycle AI', detail: 'Coding assistance, denial prediction, and prior-auth automation — the strongest near-term ROI pool.' },
        { title: 'Implementation lab', detail: 'Design one administrative pilot with PHI data-flow mapping and a clinician review gate.' },
      ],
      examples: [
        { name: 'Prior-auth automation', detail: 'Payers and providers deploying LLM document processing against the prior-authorization burden, accelerated by CMS interoperability mandates.' },
      ],
    },
    deliverables: [
      'Role-based task heatmap with risk tiering',
      'PHI data-flow map for one proposed tool',
      'Administrative pilot design with clinician review gates',
    ],
  }),
];
