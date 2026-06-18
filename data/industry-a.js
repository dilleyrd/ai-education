const { makeModule } = require('./factory');

module.exports = [
  makeModule({
    id: 'ai-for-manufacturing',
    number: '04',
    title: 'AI for Manufacturing',
    name: 'Manufacturing',
    track: 'industry',
    tagline: 'From reactive plants to self-optimizing production systems.',
    description:
      'Equips manufacturing professionals with strategic understanding and tactical execution for AI across production, quality, maintenance, and supply chain — from predictive maintenance to vision-based inspection and digital twins.',
    audience: [
      'Manufacturing executives leading digital transformation',
      'Manufacturing, process, and industrial engineers',
      'Operations, supply chain, maintenance, and plant management staff',
    ],
    outcomes: [
      'Map AI capability to the core manufacturing value drivers: OEE, quality, throughput, downtime',
      'Evaluate predictive maintenance and machine-vision solutions against your line data',
      'Build a prioritized plant-level AI roadmap using the Use Case and Problem-Based models',
      'Select tools across the Three Tiers of AI Technology and plan a 30-90 pilot',
    ],
    state: {
      summary:
        'How AI is transforming manufacturing: the traditional operating model, the forces accelerating change, and the emerging AI-native plant.',
      lessons: [
        { title: 'The traditional plant and its limits', detail: 'Reactive maintenance, manual inspection, spreadsheet scheduling — where margin and uptime leak today.' },
        { title: 'Forces accelerating AI adoption', detail: 'Labor shortages, sensor/IIoT data abundance, cheap edge compute, and competitive pressure from AI-native entrants.' },
        { title: 'The AI-native workflow', detail: 'Closed-loop production: sense → predict → optimize → act, with humans supervising exceptions.' },
      ],
      examples: [
        { name: 'BMW iFactory', detail: 'AI-based visual inspection and logistics robotics across press, body, and assembly shops; AIQX platform automates quality checks on the line.' },
        { name: 'Foxconn "lights-out" lines', detail: 'High-volume electronics lines operating with minimal human presence using vision and robotics.' },
      ],
    },
    future: {
      summary:
        'How AI reshapes production systems, value chains, and manufacturing economics — comparing legacy and AI-forward operating models.',
      lessons: [
        { title: 'The self-optimizing plant', detail: 'Digital twins simulate before lines move; reinforcement learning tunes schedules and process parameters continuously.' },
        { title: 'Value-chain compression', detail: 'AI-assisted design-to-manufacture shortens NPI cycles; demand sensing tightens the plan-make-deliver loop.' },
        { title: 'New manufacturing economics', detail: 'Downtime, scrap, and energy as the first-order AI profit pools; how to model them for your site.' },
      ],
      examples: [
        { name: 'Siemens Industrial Copilot', detail: 'Generative AI assistant for PLC code (TIA Portal) deployed with customers like thyssenkrupp Automation Engineering — engineering time on automation tasks reduced measurably.' },
        { name: 'NVIDIA Omniverse digital twins', detail: 'BMW and Foxconn build full-factory digital twins to validate layout and robot behavior before physical changes.' },
      ],
    },
    advantage: {
      summary:
        'Hands-on identification of AI opportunities in your plant using the Use Case Model and Problem-Based Model, ending in an actionable roadmap.',
      lessons: [
        { title: 'Task mining the plant floor', detail: 'Decompose roles — quality tech, planner, maintenance lead — into tasks and score AI exposure.' },
        { title: 'Problem-first candidates', detail: 'Unplanned downtime, scrap rate, changeover time: quantify cost, then match AI capability.' },
        { title: 'Your plant AI roadmap', detail: 'Sequence Quick Wins (vision QC), Sweetspots (predictive maintenance), Moonshots (closed-loop optimization).' },
      ],
      examples: [
        { name: 'Run the Use-Case Advisor', detail: 'Use this platform’s agentic advisor with your actual role to produce the course workbook output.' },
      ],
    },
    applied: {
      summary:
        'Navigating the technology landscape with the Three Tiers framework: embedded AI in existing systems, point solutions, and custom builds.',
      lessons: [
        { title: 'Predictive maintenance in practice', detail: 'Vibration/thermal sensor data to remaining-useful-life models; evaluating Senseye (Siemens), Augury, and SKF offerings.' },
        { title: 'Machine vision for quality', detail: 'Deep-learning inspection with Cognex VisionPro Deep Learning, Landing AI LandingLens, and Instrumental; sample-size and drift realities.' },
        { title: 'Scheduling and process optimization', detail: 'Constraint-based + ML scheduling; process parameter optimization with Bayesian methods.' },
        { title: 'Implementation lab', detail: 'Score one line for a 30-90 pilot: data audit, vendor shortlist, baseline metric, review gates.' },
      ],
      examples: [
        { name: 'Augury at Frito-Lay/PepsiCo', detail: 'Machine-health monitoring publicly credited with eliminating unplanned downtime on monitored lines and adding capacity without capex.' },
        { name: 'Landing AI LandingLens', detail: 'Low-data visual inspection used by electronics and automotive suppliers; built around "data-centric AI" iteration on small defect sets.' },
      ],
    },
    deliverables: [
      'Plant AI exposure heatmap (from the Use-Case Advisor)',
      'Quantified problem statement for one line or cell',
      '30-90 pilot plan with vendor shortlist and baseline metrics',
    ],
  }),

  makeModule({
    id: 'ai-for-operations',
    number: '05',
    title: 'AI for Operations',
    name: 'Operations',
    track: 'industry',
    tagline: 'Process intelligence, intelligent automation, and the agentic back office.',
    description:
      'For operations leaders modernizing core business processes: process mining, document automation, forecasting, logistics, and the shift from brittle RPA to agentic automation with human oversight.',
    audience: [
      'COOs, VPs of operations, and shared-services leaders',
      'Process-excellence, Lean/Six Sigma, and transformation teams',
      'Supply chain, logistics, and procurement professionals',
    ],
    outcomes: [
      'Use process mining to find the highest-value automation targets objectively',
      'Distinguish RPA, intelligent document processing, and agentic automation — and when each fits',
      'Quantify operational AI value in cycle time, cost-to-serve, and error rate',
      'Design human-in-the-loop controls for automated operational decisions',
    ],
    state: {
      summary: 'Where operations AI stands: mature wins in forecasting, routing, and document processing; the agentic wave arriving in the back office.',
      lessons: [
        { title: 'The ops AI landscape', detail: 'Four mature families: forecasting, optimization, document intelligence, conversational service — and the new agentic layer on top.' },
        { title: 'Why ops is AI’s best ROI hunting ground', detail: 'High volume, repetitive, measurable processes are exactly where models pay back fastest.' },
        { title: 'Lessons from the RPA era', detail: 'Why brittle screen-scraping automations stalled, and what LLM-based automation changes.' },
      ],
      examples: [
        { name: 'UPS ORION', detail: 'Route optimization across ~66,000 routes, reported ~10M gallons of fuel saved annually — the canonical operations-optimization case.' },
        { name: 'Amazon fulfillment network', detail: 'Demand forecasting, robotic storage (750K+ mobile robots), and ML-driven inventory placement as one integrated operating system.' },
      ],
    },
    future: {
      summary: 'The autonomous back office: processes that monitor, reconcile, and escalate themselves, with humans managing exceptions and policy.',
      lessons: [
        { title: 'From dashboards to agents', detail: 'Process KPIs become triggers: agents investigate variances, draft fixes, and route approvals.' },
        { title: 'The exception-management operating model', detail: 'Redesigning roles around exception handling, QA sampling, and policy tuning.' },
        { title: 'Supply chains that re-plan themselves', detail: 'Demand sensing plus scenario simulation; continuous S&OP instead of monthly cycles.' },
      ],
      examples: [
        { name: 'UiPath agentic automation', detail: 'Production shift from rule-based RPA to LLM-driven agents that handle unstructured inputs and recover from UI changes.' },
        { name: 'Maersk & Flexport', detail: 'ML ETAs and exception prediction in global logistics — operational AI as customer-facing differentiation.' },
      ],
    },
    advantage: {
      summary: 'Find your operational AI advantage with process mining evidence plus the Use Case and Problem-Based models.',
      lessons: [
        { title: 'Process mining as ground truth', detail: 'Use event logs (Celonis, UiPath Process Mining) to find rework loops and waiting time before guessing at use cases.' },
        { title: 'Scoring the automation portfolio', detail: 'Volume × variance × value framework for ranking candidate processes.' },
        { title: 'Your operations roadmap', detail: 'Sequence document-heavy Quick Wins, forecasting Sweetspots, and agentic Moonshots.' },
      ],
      examples: [
        { name: 'Celonis Process Copilot', detail: 'LLM interface over process-mining data: ask "where is my order-to-cash slowest" in natural language.' },
      ],
    },
    applied: {
      summary: 'Tool selection and implementation across document intelligence, forecasting, and workflow agents — with governance built in.',
      lessons: [
        { title: 'Intelligent document processing', detail: 'Invoices, claims, POs: evaluating Azure Document Intelligence, Google Document AI, and LLM-native extraction.' },
        { title: 'Forecasting stacks', detail: 'Classical + ML ensembles; when gradient boosting beats deep learning; backtesting discipline.' },
        { title: 'Human-in-the-loop design', detail: 'Confidence thresholds, sampling QA, audit trails — the controls that make automation auditable.' },
        { title: 'Implementation lab', detail: 'Pick one process; define baseline cycle time and error rate; design the 30-90 pilot.' },
      ],
      examples: [
        { name: 'Klarna’s internal AI shift', detail: 'Beyond the service assistant: company-wide internal assistant adoption changed staffing and cost-to-serve economics.' },
        { name: 'Ramp & Bill.com AP automation', detail: 'LLM-based invoice coding and approval routing now standard in mid-market finance ops.' },
      ],
    },
    deliverables: [
      'Process-mining-backed shortlist of automation candidates',
      'Exception-handling operating model sketch for one process',
      '30-90 pilot plan with HITL control design',
    ],
  }),

  makeModule({
    id: 'ai-for-finance',
    number: '06',
    title: 'AI for Finance',
    name: 'Finance',
    track: 'industry',
    tagline: 'From scorekeeper to strategic engine: AI across FP&A, accounting, audit, and risk.',
    description:
      'For finance professionals applying AI to close acceleration, forecasting, fraud and risk, and decision support — with the controls, auditability, and skepticism the function demands.',
    audience: [
      'CFOs, controllers, and FP&A leaders',
      'Accounting, audit, treasury, and risk professionals',
      'Finance transformation and systems teams',
    ],
    outcomes: [
      'Identify high-ROI AI applications across record-to-report, FP&A, and risk',
      'Evaluate AI-native finance tools against ERP-embedded capabilities',
      'Apply LLMs safely to variance analysis, commentary, and contract review',
      'Design controls and audit trails for AI-assisted finance processes',
    ],
    state: {
      summary: 'The current state: mature ML in fraud and credit, fast-moving LLM adoption in close, FP&A commentary, and document work.',
      lessons: [
        { title: 'Where finance AI is already mature', detail: 'Decades of ML in fraud scoring and credit underwriting — and what that maturity teaches about validation.' },
        { title: 'The LLM wave in the office of the CFO', detail: 'Variance commentary, flux analysis, policy Q&A, and contract extraction as the first wins.' },
        { title: 'Trust, controls, and the auditor', detail: 'Why finance adoption is gated on explainability, lineage, and SOX-compatible controls.' },
      ],
      examples: [
        { name: 'JPMorgan COiN & IndexGPT', detail: 'Contract intelligence saving ~360K legal-review hours annually; LLM-assisted investment products under regulatory scrutiny.' },
        { name: 'Stripe Radar', detail: 'Fraud models scoring billions of transactions with basis-point-level precision — the benchmark for production ML rigor.' },
      ],
    },
    future: {
      summary: 'The continuous, self-explaining finance function: always-on close, driver-based forecasts that update themselves, and agents that prepare the analysis.',
      lessons: [
        { title: 'The continuous close', detail: 'Transaction-level anomaly detection and auto-reconciliation compress month-end into days.' },
        { title: 'Forecasting as a living system', detail: 'Driver-based ML forecasts re-run on new data; finance shifts from producing numbers to interrogating them.' },
        { title: 'The analyst agent', detail: 'Agents that assemble board packs, draft commentary, and flag the three things worth a human’s attention.' },
      ],
      examples: [
        { name: 'BlackRock Aladdin Copilot', detail: 'LLM layer over the industry’s dominant risk platform — pattern for "copilot over system of record".' },
        { name: 'HighRadius & BlackLine', detail: 'Autonomous receivables and close automation with ML matching now mainstream in shared services.' },
      ],
    },
    advantage: {
      summary: 'Apply the Use Case and Problem-Based models to your finance org, balancing value against control requirements.',
      lessons: [
        { title: 'Task mining the finance calendar', detail: 'Close week, forecast cycles, audit prep: decompose and score for AI exposure.' },
        { title: 'Risk-weighted prioritization', detail: 'Add a control-risk dimension to Value × Ability: assistive first where assertions are at stake.' },
        { title: 'Your finance AI roadmap', detail: 'Commentary and reconciliation Quick Wins; forecasting Sweetspots; autonomous close Moonshots.' },
      ],
      examples: [
        { name: 'Run the Use-Case Advisor', detail: 'Generate your finance task heatmap with this platform’s agent as the course exercise.' },
      ],
    },
    applied: {
      summary: 'Tooling and implementation: ERP-embedded AI, finance-native point solutions, and LLM workflows with auditable controls.',
      lessons: [
        { title: 'The finance AI stack', detail: 'ERP-embedded (SAP Joule, Oracle AI) vs. point solutions (Ramp, HighRadius, MindBridge) vs. custom LLM workflows.' },
        { title: 'LLMs on financial documents', detail: 'Contract extraction, lease abstraction (ASC 842), policy chatbots — with retrieval grounding and citation requirements.' },
        { title: 'Model risk management', detail: 'SR 11-7-style validation, challenger models, and documentation that satisfies internal audit.' },
        { title: 'Implementation lab', detail: 'Design one AI-assisted close task with full audit trail: inputs, model, reviewer, sign-off.' },
      ],
      examples: [
        { name: 'MindBridge AI auditing', detail: 'Anomaly scoring across 100% of journal entries instead of sampling — used by audit firms and internal audit teams.' },
        { name: 'Ramp', detail: 'AI-first spend platform: auto-categorization, receipt matching, and policy enforcement as product defaults.' },
      ],
    },
    deliverables: [
      'Finance task heatmap with control-risk overlay',
      'One quantified problem statement (e.g., close duration, forecast error)',
      'Pilot design with model-risk documentation outline',
    ],
  }),

  makeModule({
    id: 'ai-for-customer-success',
    number: '07',
    title: 'AI for Customer Success',
    name: 'Customer Success',
    track: 'industry',
    tagline: 'Scale human relationships: AI across support, success, and retention.',
    description:
      'For CS and support leaders deploying AI assistants, churn prediction, and voice-of-customer intelligence — raising resolution rates and net retention without losing the human relationship.',
    audience: [
      'VPs of customer success and support leaders',
      'CS operations and enablement teams',
      'CSMs and support engineers adapting their craft',
    ],
    outcomes: [
      'Deploy and govern AI support agents with measurable resolution and CSAT targets',
      'Build churn and health-score models that CSMs actually trust and use',
      'Mine support conversations for product and onboarding insight at scale',
      'Redesign CS roles around AI-augmented coverage models',
    ],
    state: {
      summary: 'The state of the art: AI agents resolving a large share of tier-1 volume, health scoring maturing, and conversation intelligence going mainstream.',
      lessons: [
        { title: 'The AI support agent landscape', detail: 'Resolution-rate economics: what 40-60% autonomous resolution does to cost-to-serve and queue times.' },
        { title: 'Churn prediction reality check', detail: 'Why most health scores fail (lagging inputs, no actions attached) and what good looks like.' },
        { title: 'Voice of customer at scale', detail: 'Clustering and summarizing every ticket, call, and NPS verbatim instead of sampling.' },
      ],
      examples: [
        { name: 'Intercom Fin', detail: 'Publicly reported autonomous resolution of ~50%+ of conversations for many customers, with per-resolution pricing — the reference case for support agents.' },
        { name: 'Klarna assistant', detail: '2.3M conversations in month one, work of ~700 agents, with equal CSAT — and the later rebalancing toward humans for complex cases.' },
      ],
    },
    future: {
      summary: 'From reactive support to predictive success: AI monitors product usage, intervenes early, and gives every customer a concierge experience.',
      lessons: [
        { title: 'Predictive success motions', detail: 'Usage telemetry → risk signal → AI-drafted playbook → CSM-approved intervention.' },
        { title: 'The augmented CSM', detail: 'Pre-call briefs, auto-drafted QBR decks, and account memory — coverage ratios double without burnout.' },
        { title: 'Support as product intelligence', detail: 'Ticket clusters feeding the roadmap directly; closing the loop publicly with customers.' },
      ],
      examples: [
        { name: 'Gainsight AI', detail: 'Health scoring plus AI-drafted success plans and meeting summaries embedded in the dominant CS platform.' },
        { name: 'Salesforce Agentforce Service', detail: 'Agentic service deployments with escalation policies — pattern for governed autonomy at enterprise scale.' },
      ],
    },
    advantage: {
      summary: 'Apply the Use Case and Problem-Based models to your support and success motion.',
      lessons: [
        { title: 'Decompose the CSM and support roles', detail: 'Score every task — triage, KB authoring, QBR prep, renewal forecasting — for AI exposure.' },
        { title: 'Problem-first candidates', detail: 'First-response time, cost per ticket, NRR: quantify and match to AI capability.' },
        { title: 'Your CS AI roadmap', detail: 'KB-grounded agent Quick Wins; conversation-intelligence Sweetspots; predictive-success Moonshots.' },
      ],
      examples: [],
    },
    applied: {
      summary: 'Implementation: choosing and grounding an AI agent, building trust in health scores, and measuring what matters.',
      lessons: [
        { title: 'Grounding and guardrails', detail: 'Knowledge-base quality as the #1 driver of agent performance; escalation design; tone control.' },
        { title: 'Evaluating agent vendors', detail: 'Fin, Forethought, Decagon, Zendesk AI: resolution-rate claims, pricing models, and pilot design.' },
        { title: 'Health scores that drive action', detail: 'Leading indicators, explainable features, and playbooks attached to every alert.' },
        { title: 'Implementation lab', detail: 'Design a 30-90 agent pilot: scope tier-1 intents, set resolution/CSAT targets, define escalation rules.' },
      ],
      examples: [
        { name: 'Decagon', detail: 'AI-native support agents used by Notion, Duolingo, and Rippling, with per-conversation economics.' },
      ],
    },
    deliverables: [
      'CS task heatmap and quantified problem statement',
      'Agent pilot scope: intents, grounding sources, escalation rules',
      'Health-score design doc with attached playbooks',
    ],
  }),

  makeModule({
    id: 'ai-for-sales',
    number: '08',
    title: 'AI for Sales',
    name: 'Sales',
    track: 'industry',
    tagline: 'Revenue intelligence, AI SDRs, and the augmented seller.',
    description:
      'For sales leaders and revenue operations applying AI across prospecting, conversation intelligence, forecasting, and deal execution — more selling time, better calls, and forecasts grounded in evidence.',
    audience: [
      'CROs, sales VPs, and frontline managers',
      'Revenue operations and enablement teams',
      'AEs, SDRs, and solution consultants modernizing their workflow',
    ],
    outcomes: [
      'Automate research, enrichment, and personalization without destroying deliverability or brand',
      'Use conversation intelligence to coach reps and de-risk deals',
      'Build evidence-based forecasts from activity and call data',
      'Pilot AI SDR motions with honest benchmarks and guardrails',
    ],
    state: {
      summary: 'Where sales AI stands: conversation intelligence is mature, enrichment is being reinvented by LLMs, AI SDRs are promising but uneven.',
      lessons: [
        { title: 'The revenue AI stack today', detail: 'Conversation intelligence, enrichment/research, outbound automation, forecasting — maturity and pitfalls of each.' },
        { title: 'What buyers now expect', detail: 'Generic blasts are dead; relevance bars rise as every seller gets the same tools.' },
        { title: 'AI SDRs: signal vs. hype', detail: 'Honest read on autonomous outbound: where it books meetings and where it burns territory.' },
      ],
      examples: [
        { name: 'Gong', detail: 'Conversation intelligence on millions of calls: tracked talk ratios, risk flags, and deal-board evidence — the category-defining deployment.' },
        { name: 'Clay', detail: 'LLM-orchestrated enrichment ("Claygent") that researches accounts across the open web, replacing static data vendors for many teams.' },
      ],
    },
    future: {
      summary: 'The augmented seller: agents handle research and admin, every call is coached, and the CRM writes itself.',
      lessons: [
        { title: 'The self-writing CRM', detail: 'Activity capture, auto-logged notes, and AI-maintained opportunity fields — data quality without rep discipline.' },
        { title: 'Deal copilots', detail: 'MEDDICC scoring from call evidence, draft follow-ups, and next-best-action inside the opportunity.' },
        { title: 'Forecasting from evidence', detail: 'Models on engagement and conversation signals vs. rep sentiment; calibration discipline.' },
      ],
      examples: [
        { name: 'Salesforce Agentforce SDR', detail: 'Autonomous lead nurture inside the system of record with handoff rules to human reps.' },
        { name: 'Microsoft Copilot for Sales', detail: 'CRM-grounded meeting prep and email drafting embedded in Outlook/Teams.' },
      ],
    },
    advantage: {
      summary: 'Find your revenue AI advantage with the Use Case and Problem-Based models applied to your funnel.',
      lessons: [
        { title: 'Decompose the selling motion', detail: 'Research, outreach, discovery, proposal, negotiation, handoff: score AI exposure per stage.' },
        { title: 'Problem-first candidates', detail: 'Pipeline coverage, win rate, ramp time, selling-time share: quantify before tooling.' },
        { title: 'Your sales AI roadmap', detail: 'Call-summary Quick Wins; enrichment/coaching Sweetspots; autonomous outbound Moonshots.' },
      ],
      examples: [],
    },
    applied: {
      summary: 'Implementation: stack selection, prompt patterns for personalization, and pilot measurement that survives scrutiny.',
      lessons: [
        { title: 'Choosing the stack', detail: 'Embedded CRM AI vs. point tools (Gong, Clay, Apollo, Outreach) vs. custom agents; integration realities.' },
        { title: 'Personalization that works', detail: 'Research-grounded prompts, human review tiers by account value, deliverability protection.' },
        { title: 'Coaching at scale', detail: 'Scorecards from call data; manager workflows that turn flags into behavior change.' },
        { title: 'Implementation lab', detail: 'Design a 30-90 pilot on one funnel stage with control-group measurement.' },
      ],
      examples: [
        { name: '11x & Artisan (AI SDRs)', detail: 'Venture-backed autonomous SDR products — study their public case studies and the churn critiques as a balanced evaluation exercise.' },
      ],
    },
    deliverables: [
      'Funnel-stage AI exposure map',
      'Personalization prompt pattern library for your ICP',
      '30-90 pilot with control-group design',
    ],
  }),

  makeModule({
    id: 'ai-for-marketing',
    number: '09',
    title: 'AI for Marketing',
    name: 'Marketing',
    track: 'industry',
    tagline: 'Content velocity, personalization at scale, and marketing in the age of AI search.',
    description:
      'For marketers industrializing content operations, deploying personalization, navigating AI-driven ad platforms, and adapting to a search landscape where AI answers replace blue links.',
    audience: [
      'CMOs and marketing leaders',
      'Content, brand, demand-gen, and growth teams',
      'Marketing operations and analytics professionals',
    ],
    outcomes: [
      'Build a governed content supply chain with AI drafting and human editorial control',
      'Deploy brand-voice models and creative-generation workflows safely',
      'Adapt SEO/discovery strategy for AI search (AI Overviews, ChatGPT, Perplexity)',
      'Measure AI marketing impact beyond volume: pipeline, CAC, and brand lift',
    ],
    state: {
      summary: 'The most AI-disrupted business function: content generation is commoditized, ad platforms are AI-first, and discovery is shifting to AI answers.',
      lessons: [
        { title: 'The content commoditization shock', detail: 'When everyone can produce infinite content, distribution and distinctiveness become the scarce assets.' },
        { title: 'AI-first ad platforms', detail: 'Meta Advantage+ and Google Performance Max: the algorithm runs the campaign; your levers are creative and data.' },
        { title: 'The AI search disruption', detail: 'AI Overviews and answer engines cut clicks; generative engine optimization (GEO) emerges.' },
      ],
      examples: [
        { name: 'Coca-Cola "Create Real Magic"', detail: 'Flagship enterprise generative campaign; followed by AI-produced holiday ads — and the public debate they sparked.' },
        { name: 'Jasper & Writer enterprise deployments', detail: 'Brand-voice-constrained content generation governed by style guides and claims rules at companies like L’Oréal and Vanguard (Writer).' },
      ],
    },
    future: {
      summary: 'Marketing as an always-on creative system: audience-of-one personalization, synthetic creative testing, and brand agents.',
      lessons: [
        { title: 'Personalization at the segment-of-one', detail: 'Dynamic creative and journey orchestration driven by real-time signals.' },
        { title: 'Synthetic research and creative testing', detail: 'LLM panels and simulation for pre-testing concepts — uses and validity limits.' },
        { title: 'Brand presence in AI answers', detail: 'How brands earn citations in AI-generated answers; structured data and authority strategies.' },
      ],
      examples: [
        { name: 'Starbucks Deep Brew', detail: 'ML personalization across app offers and store operations — a decade-long compounding personalization program.' },
      ],
    },
    advantage: {
      summary: 'Apply the Use Case and Problem-Based models across the marketing org.',
      lessons: [
        { title: 'Decompose marketing roles', detail: 'Content, demand gen, product marketing, ops: task-level AI exposure scoring.' },
        { title: 'Problem-first candidates', detail: 'CAC, content cycle time, conversion rates: quantify, then match capability.' },
        { title: 'Your marketing AI roadmap', detail: 'Drafting/repurposing Quick Wins; personalization Sweetspots; autonomous campaign Moonshots.' },
      ],
      examples: [],
    },
    applied: {
      summary: 'Implementation: the governed content supply chain, creative tooling, and measurement.',
      lessons: [
        { title: 'The content supply chain', detail: 'Brief → AI draft → human edit → brand/legal check → publish → performance loop; roles and SLAs at each gate.' },
        { title: 'Creative generation tooling', detail: 'Midjourney/Firefly/Runway for visual; brand-safety and rights considerations; disclosure norms.' },
        { title: 'Marketing analytics with LLMs', detail: 'Natural-language analysis over campaign data; anomaly narratives; MMM democratization.' },
        { title: 'Implementation lab', detail: 'Stand up one governed content workflow with measurable cycle-time baseline.' },
      ],
      examples: [
        { name: 'Adobe Firefly at enterprises', detail: 'Commercially-safe image generation integrated into Creative Cloud workflows — the IP-risk-managed path large brands chose.' },
      ],
    },
    deliverables: [
      'Marketing task heatmap and one quantified problem statement',
      'Governed content supply chain design',
      'AI search (GEO) readiness assessment for your brand',
    ],
  }),
];
