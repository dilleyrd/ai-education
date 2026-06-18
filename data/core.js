/**
 * Core curriculum — the three-stage practitioner path:
 * Learn (literacy) → Build (delivery) → Lead (organizational strategy).
 * Original structure and naming authored for AI Roadmap.
 */
module.exports = [
  {
    id: 'ai-essentials',
    number: '01',
    title: 'AI Essentials',
    track: 'core',
    stage: 'Learn',
    level: 'Beginner',
    duration: '6 hours',
    tagline: 'Turn uncertainty into capability — the literacy layer every AI career is built on.',
    description:
      'An eight-part foundational module that takes you from zero context to working AI literacy: how the technology actually works, where it stands today, where it is heading, and how to use generative AI and agents productively and responsibly in your own work.',
    audience: [
      'Professionals building AI knowledge to advance their careers',
      'Business leaders and managers seeking strategic AI understanding',
      'Anyone who wants a structured, jargon-free introduction to applied AI',
    ],
    outcomes: [
      'Explain machine learning, LLMs, and model training in plain language',
      'Use a repeatable five-step method to apply generative AI to real tasks',
      'Write effective prompts and evaluate model outputs critically',
      'Distinguish chatbots from agents and assess autonomy levels for business use',
    ],
    courses: [
      {
        title: 'Getting Started',
        summary: 'Orientation: how the courses build on each other, how to set a personal learning goal, and how the completion path works.',
        lessons: [
          { title: 'How this module works', detail: 'The eight-course arc, knowledge checks, and the final assessment.' },
          { title: 'Setting your AI learning objective', detail: 'Define a concrete task in your own job you will improve with AI by the end of the module.' },
        ],
        examples: [],
      },
      {
        title: 'What AI Is and How It Works',
        summary: 'Core concepts, the major categories of AI capability, and a strategic framing for why AI literacy is now a baseline professional skill.',
        lessons: [
          { title: 'What AI is (and is not)', detail: 'Prediction, classification, generation — the three jobs AI systems actually do.' },
          { title: 'A map of the AI landscape', detail: 'Foundation models, vertical applications, and embedded AI features inside tools you already use.' },
          { title: 'Your personalized learning path', detail: 'Match your role to the industry and engineering tracks in this curriculum.' },
        ],
        examples: [
          { name: 'Embedded AI everywhere', detail: 'Gmail Smart Compose, Excel Copilot, and Photoshop Generative Fill show AI arriving inside incumbent tools, not just as standalone apps.' },
        ],
      },
      {
        title: 'Core Concepts: Models, Training, and Inference',
        summary: 'The technical vocabulary you need: machine learning, neural networks, large language models, training vs. inference, and the safety principles that govern responsible use.',
        lessons: [
          { title: 'Machine learning in plain language', detail: 'Learning patterns from data instead of hand-coding rules; supervised, unsupervised, and reinforcement learning.' },
          { title: 'How LLMs are trained', detail: 'Pre-training on text at scale, fine-tuning, and reinforcement learning from human feedback (RLHF).' },
          { title: 'Tokens, context windows, and inference', detail: 'Why context limits matter, what temperature does, and what drives cost and latency.' },
          { title: 'The AI ecosystem', detail: 'Model providers (OpenAI, Google, Anthropic, Meta), routers and platforms (OpenRouter, Bedrock, Vertex), and the application layer.' },
          { title: 'AI safety principles', detail: 'Hallucination, bias, data leakage, and the human-in-the-loop controls that mitigate them.' },
        ],
        examples: [
          { name: 'Gemini Flash via OpenRouter', detail: 'The model family powering this platform’s tutor: a long-context reasoning model accessed through an OpenAI-compatible API — a concrete example of the model/router/application stack.' },
        ],
      },
      {
        title: 'Where AI Stands Today',
        summary: 'Where the technology and the market stand right now: adoption curves, the frontier-lab race, and what current capabilities mean for the workforce.',
        lessons: [
          { title: 'Adoption by the numbers', detail: 'Enterprise adoption trends, where pilots stall, and which functions are seeing measured ROI.' },
          { title: 'The frontier race', detail: 'OpenAI, Google DeepMind, Anthropic, Meta, and open-weight challengers — and why model capability keeps compounding.' },
          { title: 'Workforce impact', detail: 'Task-level (not job-level) exposure: which kinds of work shift first and what augmentation looks like in practice.' },
        ],
        examples: [
          { name: 'Klarna’s AI assistant', detail: 'Publicly reported as handling the workload equivalent of ~700 customer-service agents in its first month — the canonical case of task-level automation at scale.' },
        ],
      },
      {
        title: 'How AI Is Evolving',
        summary: 'A forward look: multimodal models, agents, robotics, and the path toward increasingly general systems — with a sober framework for separating signal from hype.',
        lessons: [
          { title: 'From chatbots to agents', detail: 'The shift from answering questions to completing multi-step work with tools.' },
          { title: 'Multimodal and embodied AI', detail: 'Vision, audio, video generation, and the early state of general-purpose robotics.' },
          { title: 'Planning under uncertainty', detail: 'Scenario thinking: how to make organizational decisions that are robust whether progress is fast or slow.' },
        ],
        examples: [
          { name: 'Figure & humanoid robotics pilots', detail: 'BMW’s Spartanburg plant pilots of humanoid robots illustrate embodied AI moving from demo to factory trial.' },
        ],
      },
      {
        title: 'Working with Generative AI',
        summary: 'Hands-on use of generative AI through a five-step method: pick the task, choose the tool, prompt, evaluate, and integrate into your workflow.',
        lessons: [
          { title: 'The five-step method', detail: 'Task → Tool → Prompt → Evaluate → Integrate: a repeatable loop for any generative task.' },
          { title: 'Text, image, audio, video', detail: 'Matching modality to use case, with current leading tools for each.' },
          { title: 'Custom assistants', detail: 'OpenAI GPTs, Google Gems, and Anthropic Projects: packaging instructions and knowledge for reuse.' },
        ],
        examples: [
          { name: 'Coca-Cola "Create Real Magic"', detail: 'Brand-sanctioned generative campaign built on GPT + DALL·E — an early enterprise template for creative co-creation with customers.' },
        ],
      },
      {
        title: 'Effective Prompting',
        summary: 'Universal prompting techniques that transfer across every model: role, context, task, format, and iteration — plus responsible-use guardrails.',
        lessons: [
          { title: 'The anatomy of a strong prompt', detail: 'Role, context, task, constraints, output format — and why examples beat adjectives.' },
          { title: 'Iteration and chain-of-thought', detail: 'Refining outputs, asking the model to reason stepwise, and structured (JSON) outputs.' },
          { title: 'Responsible prompting', detail: 'What never to paste into a public model, verification habits, and disclosure norms.' },
        ],
        examples: [
          { name: 'This platform’s quiz generator', detail: 'Every knowledge check here is produced by a structured JSON prompt to a Gemini model — open the network tab and study it as a live prompting example.' },
        ],
      },
      {
        title: 'Understanding AI Agents',
        summary: 'Chatbots vs. agents, the spectrum of autonomy, where agents create business value today, and how to scope a safe first agent pilot.',
        lessons: [
          { title: 'What makes an agent', detail: 'Goals, tools, memory, and iteration loops — the four ingredients beyond a chat model.' },
          { title: 'Levels of autonomy', detail: 'From human-approves-every-step to fully autonomous, and how to pick the right level per task risk.' },
          { title: 'Scoping your first agent pilot', detail: 'Bounded tasks, measurable outcomes, and human review gates.' },
        ],
        examples: [
          { name: 'This platform’s Opportunity Advisor', detail: 'A live three-step agentic pipeline (decompose role → score tasks → synthesize plan) you will use in the Building AI Solutions module.' },
          { name: 'Salesforce Agentforce & Intercom Fin', detail: 'Production agent platforms resolving real support and sales tasks autonomously with escalation to humans.' },
        ],
      },
    ],
    deliverables: [
      'Personal AI learning objective tied to a real task in your job',
      'A working custom assistant built with a GPT/Gem/Project',
      'Prompt library of five reusable prompts for your role',
    ],
    exam: 'Comprehensive final assessment covering all eight courses. Completion certificate awarded on passing. Use the AI-generated knowledge checks in each course as practice.',
  },

  {
    id: 'building-ai-solutions',
    number: '02',
    title: 'Building AI Solutions',
    track: 'core',
    stage: 'Build',
    level: 'Beginner–Intermediate',
    duration: '3 hours',
    tagline: 'Move from understanding to delivery — a complete playbook for creating measurable value with AI.',
    description:
      'A four-course module that bridges the gap between AI literacy and real results. You will learn two complementary methods — task-based opportunity mapping (bottom-up) and problem-first solution design (top-down) — apply a build-then-measure cadence to pilot management, and finish by building a custom AI assistant for your own workflow.',
    audience: [
      'Business leaders, department heads, and managers implementing AI',
      'Innovators, strategists, and product managers launching AI solutions',
      'Graduates of AI Essentials ready to lead implementation',
    ],
    outcomes: [
      'Deconstruct any job into automatable tasks and score them for AI opportunity',
      'Quantify business problems and frame them as AI pilot candidates',
      'Classify pilots as Quick Wins, Strategic Bets, or Moonshots and sequence them',
      'Build and deploy a custom AI assistant for a real workflow',
    ],
    courses: [
      {
        title: 'From Understanding to Action',
        summary: 'The two solution-finding methods, a build-then-measure cadence for time-boxing pilots, and how to demonstrate ROI to win stakeholder buy-in.',
        lessons: [
          { title: 'Why pilots fail', detail: 'Unbounded scope, no baseline metric, no owner — and how a time-boxed build-then-measure cadence fixes all three.' },
          { title: 'Task-based vs. problem-first', detail: 'Bottom-up task mining vs. top-down problem solving, and when to use each.' },
          { title: 'Making the business case', detail: 'Baseline → intervention → measured delta: the only ROI story executives believe.' },
        ],
        examples: [
          { name: 'JPMorgan COiN', detail: 'Contract-review automation reported to save ~360,000 hours of legal work annually — a model for quantifying a pilot’s value in hours.' },
        ],
      },
      {
        title: 'Task-Based Opportunity Mapping',
        summary: 'Systematically deconstruct jobs into tasks, then prioritize each with value and ability ratings.',
        lessons: [
          { title: 'Task decomposition', detail: 'Break a role into 10-20 discrete tasks with estimated time share.' },
          { title: 'Value × ability scoring', detail: 'Rate each task: business value of automating it, and current AI ability to do it.' },
          { title: 'Building your opportunity heatmap', detail: 'Plot tasks on the value/ability grid to find your first pilots.' },
        ],
        examples: [
          { name: 'The Opportunity Advisor', detail: 'This platform’s agentic advisor runs exactly this method: it decomposes your role with a Gemini model, scores every task 1-5 on value and ability, and plots the results. Run it on your real job as the course exercise.' },
        ],
      },
      {
        title: 'Problem-First Solution Design',
        summary: 'Identify and quantify business challenges solvable with AI, craft compelling business cases, and categorize solutions as Quick Wins, Strategic Bets, or Moonshots.',
        lessons: [
          { title: 'Problem mining', detail: 'Where margin leaks, queues build, and customers churn — finding problems worth $100K+ before picking technology.' },
          { title: 'Quick Wins, Strategic Bets, Moonshots', detail: 'Classifying candidate solutions by value and feasibility to build a balanced portfolio.' },
          { title: 'Writing the one-page business case', detail: 'Problem, cost of inaction, proposed pilot, success metric, and a build-then-measure plan.' },
        ],
        examples: [
          { name: 'UPS ORION', detail: 'Route optimization framed as a fuel-cost problem (not an "AI project") — reportedly saving ~10M gallons of fuel per year. Problem-first framing is why it got funded.' },
        ],
      },
      {
        title: 'Building Custom AI Assistants',
        summary: 'Hands-on creation of a custom assistant using OpenAI GPTs, Google Gems, or Anthropic Projects, plus API-based assistants for teams that need control.',
        lessons: [
          { title: 'Designing your assistant', detail: 'Pick one workflow, write the instruction set, attach reference knowledge.' },
          { title: 'No-code vs. API builds', detail: 'When a GPT/Gem suffices and when to move to an API integration (like this platform’s OpenRouter + Gemini backend).' },
          { title: 'Measuring assistant impact', detail: 'Time saved per use × uses per week: the simplest honest metric.' },
        ],
        examples: [
          { name: 'This platform as a reference build', detail: 'The AI Roadmap tutor is a complete worked example: a system prompt grounded in course context, streamed responses, and a server-side key — read server.js as the lab manual.' },
        ],
      },
    ],
    deliverables: [
      'Completed opportunity workbook with scored task heatmap (generated with the Advisor)',
      'One-page problem-first business case for a pilot',
      'A deployed custom assistant for one of your workflows',
    ],
    exam: 'Final assessment across all four courses; completion certificate awarded on passing.',
  },

  {
    id: 'enterprise-ai-strategy',
    number: '03',
    title: 'Enterprise AI Strategy',
    track: 'core',
    stage: 'Lead',
    level: 'Intermediate',
    duration: '5 hours',
    tagline: 'From pilots to organization-wide capability — culture, governance, and the strategic plan.',
    description:
      'A seven-course module for leaders moving beyond scattered pilots to organization-wide capability: building an AI-ready culture, internal education programs, governance structures, AI usage policy, responsible-AI practices, impact analysis, and a complete strategic AI plan.',
    audience: [
      'C-suite executives and business owners',
      'Senior leaders responsible for company-wide strategy',
      'Governance leads and directors driving departmental adoption',
    ],
    outcomes: [
      'Assess organizational AI readiness and design a cultural transformation plan',
      'Stand up an internal AI education program and a governance board with clear charters',
      'Publish an AI usage policy and responsible-AI practices',
      'Deliver a multi-part strategic AI plan with prioritized projects and resourcing',
    ],
    courses: [
      {
        title: 'Building an AI-Ready Organization',
        summary: 'A human-centered AI-ready operating philosophy and a five-step strategic framework covering assessment, education, governance, policy, and planning.',
        lessons: [
          { title: 'What AI-ready means', detail: 'Augmentation-first, transparency, and reskilling commitments as cultural anchors.' },
          { title: 'The organizational AI audit', detail: 'Assess readiness across talent, data, tooling, and leadership alignment.' },
        ],
        examples: [
          { name: 'Moderna × OpenAI', detail: 'Thousands of internal GPTs built by employees after a deliberate enablement program — a benchmark for an AI-ready culture.' },
        ],
      },
      {
        title: 'Internal AI Education Programs',
        summary: 'A blueprint for internal AI education, including financial modeling and a training-ROI model to justify the investment.',
        lessons: [
          { title: 'Designing the curriculum', detail: 'Role-based tracks (exactly like this platform’s industry and engineering tracks) beat one-size-fits-all training.' },
          { title: 'Modeling training ROI', detail: 'Hours saved × loaded cost × adoption rate: modeling education ROI before you ask for budget.' },
        ],
        examples: [
          { name: 'This platform', detail: 'An internal deployment of this platform — with the tutor, quizzes, and advisor — is itself the course deliverable.' },
        ],
      },
      {
        title: 'AI Governance & Steering',
        summary: 'A framework for governance: mission, membership, cadence, decision rights, and maturity assessment.',
        lessons: [
          { title: 'Chartering the governance board', detail: 'Mission definition, cross-functional recruitment (legal, IT, HR, business units), decision rights.' },
          { title: 'Intake and prioritization', detail: 'A single funnel for pilot proposals scored by value, feasibility, and risk.' },
        ],
        examples: [],
      },
      {
        title: 'AI Usage Policies',
        summary: 'Customizable policy templates covering data privacy, intellectual property, acceptable use, and vendor risk.',
        lessons: [
          { title: 'The acceptable-use policy', detail: 'Approved tools, prohibited data classes, disclosure requirements, and review processes.' },
          { title: 'IP and data-privacy clauses', detail: 'Ownership of AI-assisted output, training-data opt-outs, and regional regulation (EU AI Act, state laws).' },
        ],
        examples: [
          { name: 'Samsung’s 2023 ChatGPT leak', detail: 'Engineers pasting proprietary code into a public model — the incident every acceptable-use policy is written to prevent.' },
        ],
      },
      {
        title: 'Responsible AI Practices',
        summary: 'A set of responsible-AI principles: human accountability, transparency, fairness, and ethical decision-making in deployment.',
        lessons: [
          { title: 'Principles that bind', detail: 'Turning values into review gates: bias testing, human accountability for AI decisions, explainability requirements.' },
          { title: 'High-risk use review', detail: 'Extra scrutiny for decisions affecting employment, credit, health, and safety.' },
        ],
        examples: [
          { name: 'NIST AI Risk Management Framework', detail: 'The de facto US reference for operationalizing responsible AI — map your principles to it.' },
        ],
      },
      {
        title: 'AI Impact Analysis',
        summary: 'Forecasting AI’s effects on talent, products, customers, and technology infrastructure before committing the organization.',
        lessons: [
          { title: 'Talent impact forecasting', detail: 'Task-exposure analysis across the org chart; reskilling vs. redeployment planning.' },
          { title: 'Product and customer impact', detail: 'Where AI changes your offering, your pricing, and your customers’ expectations.' },
        ],
        examples: [],
      },
      {
        title: 'The Strategic AI Plan',
        summary: 'Synthesizes everything into a multi-part strategic plan: vision, prioritized projects, governance, education, policy, and resourcing on a visual timeline.',
        lessons: [
          { title: 'Assembling the plan', detail: 'Vision statement, portfolio of Quick Wins/Strategic Bets/Moonshots, owners, and budget.' },
          { title: 'Communicating the plan', detail: 'Board-level narrative: risk of inaction, expected value, and the 12-month milestone view.' },
        ],
        examples: [],
      },
    ],
    deliverables: [
      'Organizational AI audit and readiness score',
      'Governance-board charter and AI usage policy (from templates)',
      'Complete multi-part strategic AI plan with timeline',
    ],
    exam: 'Final assessment across all seven courses; completion certificate awarded on passing.',
  },
];
