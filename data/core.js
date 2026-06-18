/**
 * Core track — the foundational learning path:
 * Fundamentals (literacy) → Piloting (action) → Scaling (transformation).
 * Structure modeled on the SmarterX AI Academy certificate series.
 */
module.exports = [
  {
    id: 'ai-fundamentals',
    number: '01',
    title: 'AI Fundamentals',
    track: 'core',
    level: 'Beginner',
    duration: '6 hours',
    tagline: 'Transform uncertainty into opportunity — the literacy layer every AI career is built on.',
    description:
      'An eight-course foundational series that takes you from zero context to working AI literacy: how the technology actually works, where it stands today, where it is heading, and how to use generative AI and agents productively and responsibly in your own work.',
    audience: [
      'Professionals building AI knowledge to advance their careers',
      'Business leaders and managers seeking strategic AI understanding',
      'Anyone who wants a structured, jargon-free introduction to applied AI',
    ],
    outcomes: [
      'Explain machine learning, LLMs, and model training in plain language',
      'Use a repeatable 5-step framework to apply generative AI to real tasks',
      'Write effective prompts and evaluate model outputs critically',
      'Distinguish chatbots from agents and assess autonomy levels for business use',
    ],
    courses: [
      {
        title: 'Welcome to AI Fundamentals',
        summary: 'Orientation to the series: how the courses build on each other, how to set a personal learning goal, and how certification works.',
        lessons: [
          { title: 'How this series works', detail: 'The 8-course arc, knowledge checks, and the final certification exam.' },
          { title: 'Setting your AI learning objective', detail: 'Define a concrete task in your own job you will improve with AI by the end of the series.' },
        ],
        examples: [],
      },
      {
        title: 'Intro to AI',
        summary: 'Core concepts, the major categories of AI capability, and a strategic framing for why AI literacy is now a baseline professional skill.',
        lessons: [
          { title: 'What AI is (and is not)', detail: 'Prediction, classification, generation — the three jobs AI systems actually do.' },
          { title: 'A map of the AI landscape', detail: 'Foundation models, vertical applications, and embedded AI features inside tools you already use.' },
          { title: 'Your personalized learning path', detail: 'Match your role to the industry and engineering tracks in this academy.' },
        ],
        examples: [
          { name: 'Embedded AI everywhere', detail: 'Gmail Smart Compose, Excel Copilot, and Photoshop Generative Fill show AI arriving inside incumbent tools, not just as standalone apps.' },
        ],
      },
      {
        title: 'AI Concepts 101',
        summary: 'The technical vocabulary you need: machine learning, neural networks, large language models, training vs. inference, and the safety principles that govern responsible use.',
        lessons: [
          { title: 'Machine learning in plain language', detail: 'Learning patterns from data instead of hand-coding rules; supervised, unsupervised, and reinforcement learning.' },
          { title: 'How LLMs are trained', detail: 'Pre-training on text at scale, fine-tuning, and reinforcement learning from human feedback (RLHF).' },
          { title: 'Tokens, context windows, and inference', detail: 'Why context limits matter, what temperature does, and what drives cost and latency.' },
          { title: 'The AI ecosystem', detail: 'Model providers (OpenAI, Google, Anthropic, Meta), routers and platforms (OpenRouter, Bedrock, Vertex), and the application layer.' },
          { title: 'AI safety principles', detail: 'Hallucination, bias, data leakage, and the human-in-the-loop controls that mitigate them.' },
        ],
        examples: [
          { name: 'Gemini 2.5 Flash via OpenRouter', detail: 'The model powering this academy’s tutor: a 1M-token-context reasoning model accessed through an OpenAI-compatible API — a concrete example of the model/router/application stack.' },
        ],
      },
      {
        title: 'The State of AI',
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
        title: 'The AI Timeline',
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
        title: 'Generative AI 101',
        summary: 'Hands-on use of generative AI through a 5-step framework: pick the task, choose the tool, prompt, evaluate, and integrate into your workflow.',
        lessons: [
          { title: 'The 5-step framework', detail: 'Task → Tool → Prompt → Evaluate → Integrate: a repeatable loop for any generative task.' },
          { title: 'Text, image, audio, video', detail: 'Matching modality to use case, with current leading tools for each.' },
          { title: 'Custom assistants', detail: 'OpenAI GPTs, Google Gems, and Anthropic Projects: packaging instructions and knowledge for reuse.' },
        ],
        examples: [
          { name: 'Coca-Cola "Create Real Magic"', detail: 'Brand-sanctioned generative campaign built on GPT + DALL·E — an early enterprise template for creative co-creation with customers.' },
        ],
      },
      {
        title: 'Prompting 101',
        summary: 'Universal prompting techniques that transfer across every model: role, context, task, format, and iteration — plus responsible-use guardrails.',
        lessons: [
          { title: 'The anatomy of a strong prompt', detail: 'Role, context, task, constraints, output format — and why examples beat adjectives.' },
          { title: 'Iteration and chain-of-thought', detail: 'Refining outputs, asking the model to reason stepwise, and structured (JSON) outputs.' },
          { title: 'Responsible prompting', detail: 'What never to paste into a public model, verification habits, and disclosure norms.' },
        ],
        examples: [
          { name: 'This academy’s quiz generator', detail: 'Every knowledge check here is produced by a structured JSON prompt to Gemini 2.5 Flash — open the network tab and study it as a live prompting example.' },
        ],
      },
      {
        title: 'AI Agents 101',
        summary: 'Chatbots vs. agents, the spectrum of autonomy, where agents create business value today, and how to scope a safe first agent pilot.',
        lessons: [
          { title: 'What makes an agent', detail: 'Goals, tools, memory, and iteration loops — the four ingredients beyond a chat model.' },
          { title: 'Levels of autonomy', detail: 'From human-approves-every-step to fully autonomous, and how to pick the right level per task risk.' },
          { title: 'Scoping your first agent pilot', detail: 'Bounded tasks, measurable outcomes, and human review gates.' },
        ],
        examples: [
          { name: 'This academy’s Use-Case Advisor', detail: 'A live three-step agentic pipeline (decompose role → score tasks → synthesize roadmap) you will use in the Piloting AI module.' },
          { name: 'Salesforce Agentforce & Intercom Fin', detail: 'Production agent platforms resolving real support and sales tasks autonomously with escalation to humans.' },
        ],
      },
    ],
    deliverables: [
      'Personal AI learning objective tied to a real task in your job',
      'A working custom assistant built with a GPT/Gem/Project',
      'Prompt library of 5 reusable prompts for your role',
    ],
    exam: 'Comprehensive final exam covering all eight courses. Professional Certificate awarded on passing. Use the AI-generated knowledge checks in each course as practice.',
  },

  {
    id: 'piloting-ai',
    number: '02',
    title: 'Piloting AI',
    track: 'core',
    level: 'Beginner–Intermediate',
    duration: '3 hours',
    tagline: 'Move from understanding to action — a complete playbook for creating measurable value with AI.',
    description:
      'A four-course series that bridges the gap between AI literacy and real results. You will learn two complementary frameworks — the Use Case Model (bottom-up) and the Problem-Based Model (top-down) — apply the 30-90 Rule to pilot management, and finish by building a custom AI assistant for your own workflow.',
    audience: [
      'Business leaders, department heads, and managers implementing AI',
      'Innovators, strategists, and product managers launching AI solutions',
      'Graduates of AI Fundamentals ready to lead implementation',
    ],
    outcomes: [
      'Deconstruct any job into automatable tasks and score them for AI exposure',
      'Quantify business problems and frame them as AI pilot candidates',
      'Classify pilots as Quick Wins, Sweetspots, or Moonshots and sequence them',
      'Build and deploy a custom AI assistant ("Co-X") for a real workflow',
    ],
    courses: [
      {
        title: 'Piloting AI in Business',
        summary: 'The two pilot frameworks, the 30-90 Rule for time-boxing pilots, and how to demonstrate ROI to win stakeholder buy-in.',
        lessons: [
          { title: 'Why pilots fail', detail: 'Unbounded scope, no baseline metric, no owner — and how the 30-90 Rule (30-day build, 90-day measure) fixes all three.' },
          { title: 'Use Case Model vs. Problem-Based Model', detail: 'Bottom-up task mining vs. top-down problem solving, and when to use each.' },
          { title: 'Making the business case', detail: 'Baseline → intervention → measured delta: the only ROI story executives believe.' },
        ],
        examples: [
          { name: 'JPMorgan COiN', detail: 'Contract-review automation reported to save ~360,000 hours of legal work annually — a model for quantifying a pilot’s value in hours.' },
        ],
      },
      {
        title: 'The Use Case Model',
        summary: 'Systematically deconstruct jobs into tasks, then prioritize with Value and Ability ratings using the AI Exposure Key.',
        lessons: [
          { title: 'Task decomposition', detail: 'Break a role into 10-20 discrete tasks with estimated time share.' },
          { title: 'Value × Ability scoring', detail: 'Rate each task: business value of automating it, and current AI ability to do it.' },
          { title: 'Building your exposure heatmap', detail: 'Plot tasks on the Value/Ability grid to find your first pilots.' },
        ],
        examples: [
          { name: 'The Academy Use-Case Advisor', detail: 'This platform’s agentic advisor runs exactly this model: it decomposes your role with Gemini 2.5 Flash, scores every task 1-5 on value and ability, and plots the results. Run it on your real job as the course exercise.' },
        ],
      },
      {
        title: 'The Problem-Based Model',
        summary: 'Identify and quantify business challenges solvable with AI, craft compelling business cases, and categorize solutions as Quick Wins, Sweetspots, or Moonshots.',
        lessons: [
          { title: 'Problem mining', detail: 'Where margin leaks, queues build, and customers churn — finding problems worth $100K+ before picking technology.' },
          { title: 'Quick Wins, Sweetspots, Moonshots', detail: 'Classifying candidate solutions by value and feasibility to build a balanced portfolio.' },
          { title: 'Writing the one-page business case', detail: 'Problem, cost of inaction, proposed pilot, success metric, 30-90 plan.' },
        ],
        examples: [
          { name: 'UPS ORION', detail: 'Route optimization framed as a fuel-cost problem (not an "AI project") — reportedly saving ~10M gallons of fuel per year. Problem-first framing is why it got funded.' },
        ],
      },
      {
        title: 'Building Custom AI Assistants (Co-X)',
        summary: 'Hands-on creation of a custom assistant using OpenAI GPTs, Google Gems, or Anthropic Projects, plus API-based assistants for teams that need control.',
        lessons: [
          { title: 'Designing your Co-X', detail: 'Pick one workflow, write the instruction set, attach reference knowledge.' },
          { title: 'No-code vs. API builds', detail: 'When a GPT/Gem suffices and when to move to an API integration (like this platform’s OpenRouter + Gemini 2.5 Flash backend).' },
          { title: 'Measuring assistant impact', detail: 'Time saved per use × uses per week: the simplest honest metric.' },
        ],
        examples: [
          { name: 'This platform as a reference build', detail: 'The AI Academy tutor is a complete worked example: a system prompt grounded in course context, streamed responses, and a server-side key — read server.js as the lab manual.' },
        ],
      },
    ],
    deliverables: [
      'Completed Use Case Workbook with scored task heatmap (generated with the Advisor)',
      'One-page problem-based business case for a pilot',
      'A deployed custom assistant for one of your workflows',
    ],
    exam: 'Final exam across all four courses; Professional Certificate awarded on passing.',
  },

  {
    id: 'scaling-ai',
    number: '03',
    title: 'Scaling AI',
    track: 'core',
    level: 'Intermediate',
    duration: '5 hours',
    tagline: 'From pilots to enterprise transformation — frameworks, governance, and the AI roadmap.',
    description:
      'A seven-course series for leaders moving beyond scattered pilots to organization-wide capability: the AI-Forward operating philosophy, internal academies, AI councils, generative AI policy, responsible AI principles, impact assessments, and a complete 12-part AI roadmap.',
    audience: [
      'C-suite executives and business owners',
      'Senior leaders responsible for company-wide strategy',
      'AI Council leaders and directors driving departmental adoption',
    ],
    outcomes: [
      'Assess organizational AI readiness and design a cultural transformation plan',
      'Stand up an internal AI academy and an AI council with clear charters',
      'Publish a generative AI use policy and responsible AI principles',
      'Deliver a 12-part AI roadmap with prioritized projects and resourcing',
    ],
    courses: [
      {
        title: 'The AI-Forward Organization',
        summary: 'The human-centered AI-Forward philosophy and a 5-step strategic framework covering assessment, education, governance, policy, and roadmap.',
        lessons: [
          { title: 'What AI-Forward means', detail: 'Augmentation-first, transparency, and reskilling commitments as cultural anchors.' },
          { title: 'The organizational AI audit', detail: 'Assess readiness across talent, data, tooling, and leadership alignment.' },
        ],
        examples: [
          { name: 'Moderna × OpenAI', detail: 'Thousands of internal GPTs built by employees after a deliberate enablement program — a benchmark for AI-Forward culture.' },
        ],
      },
      {
        title: 'The AI Academy',
        summary: 'A 10-step blueprint for internal AI education programs, including financial modeling and an AI Value Calculator to demonstrate training ROI.',
        lessons: [
          { title: 'Designing the curriculum', detail: 'Role-based tracks (exactly like this platform’s industry and engineering tracks) beat one-size-fits-all training.' },
          { title: 'The AI Value Calculator', detail: 'Hours saved × loaded cost × adoption rate: modeling education ROI before you ask for budget.' },
        ],
        examples: [
          { name: 'This platform', detail: 'An internal deployment of this academy — with the tutor, quizzes, and advisor — is itself the Course 2 deliverable.' },
        ],
      },
      {
        title: 'The AI Council',
        summary: 'A 5-step framework for governance: mission, membership, cadence, decision rights, and maturity assessment.',
        lessons: [
          { title: 'Chartering the council', detail: 'Mission definition, cross-functional recruitment (legal, IT, HR, business units), decision rights.' },
          { title: 'Intake and prioritization', detail: 'A single funnel for pilot proposals scored by value, feasibility, and risk.' },
        ],
        examples: [],
      },
      {
        title: 'Generative AI Policies',
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
        title: 'Responsible AI Principles',
        summary: 'The 12-point Responsible AI Manifesto: human accountability, transparency, fairness, and ethical decision-making in deployment.',
        lessons: [
          { title: 'Principles that bind', detail: 'Turning values into review gates: bias testing, human accountability for AI decisions, explainability requirements.' },
          { title: 'High-risk use review', detail: 'Extra scrutiny for decisions affecting employment, credit, health, and safety.' },
        ],
        examples: [
          { name: 'NIST AI Risk Management Framework', detail: 'The de facto US reference for operationalizing responsible AI — map your manifesto to it.' },
        ],
      },
      {
        title: 'AI Impact Assessments',
        summary: 'Forecasting AI’s effects on talent, products, customers, and technology infrastructure before committing the organization.',
        lessons: [
          { title: 'Talent impact forecasting', detail: 'Task-exposure analysis across the org chart; reskilling vs. redeployment planning.' },
          { title: 'Product and customer impact', detail: 'Where AI changes your offering, your pricing, and your customers’ expectations.' },
        ],
        examples: [],
      },
      {
        title: 'The AI Roadmap',
        summary: 'Synthesizes everything into a 12-part strategic plan: vision, prioritized projects, governance, education, policy, and resourcing on a visual timeline.',
        lessons: [
          { title: 'Assembling the roadmap', detail: 'Vision statement, portfolio of Quick Wins/Sweetspots/Moonshots, owners, and budget.' },
          { title: 'Communicating the plan', detail: 'Board-level narrative: risk of inaction, expected value, and the 12-month milestone view.' },
        ],
        examples: [],
      },
    ],
    deliverables: [
      'Organizational AI audit and readiness score',
      'AI Council charter and generative AI policy (from templates)',
      'Complete 12-part AI roadmap with timeline',
    ],
    exam: 'Final exam across all seven courses; Professional Certificate awarded on passing.',
  },
];
