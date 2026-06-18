const { makeModule } = require('./factory');

/**
 * Engineering & Science track — the custom modules requested in addition to
 * the SmarterX-style business curriculum. Same four-course certificate arc,
 * but the "Applied" course goes deeper on the technical stack (surrogate
 * models, PINNs, ML interatomic potentials, neural operators, etc.) and the
 * real-world implementations are drawn from current tools and published work.
 */
module.exports = [
  makeModule({
    id: 'ai-for-mechanical-design',
    number: '15',
    title: 'AI for Mechanical Engineering Design',
    name: 'Mechanical Design',
    track: 'engineering',
    level: 'Intermediate–Advanced',
    tagline: 'Generative design, ML surrogates, and the AI-assisted design loop.',
    description:
      'For mechanical and product-design engineers applying AI to concept generation, topology and generative design, ML surrogate models that replace slow simulations, and LLM copilots for CAD and engineering documentation.',
    audience: [
      'Mechanical, product, and design engineers',
      'CAE/simulation engineers and design-automation specialists',
      'Engineering managers evaluating generative-design and AI-CAD tooling',
    ],
    outcomes: [
      'Apply generative/topology design and read its outputs critically (manufacturability, load cases)',
      'Build and validate ML surrogate models that approximate FEA/CFD for fast design exploration',
      'Use LLM copilots for design documentation, GD&T, standards lookup, and DFM review',
      'Scope a design-automation pilot with verification gates against physical truth',
    ],
    state: {
      summary: 'Where AI in mechanical design stands: generative/topology design is mature in CAD suites, ML surrogates are accelerating optimization, and LLM copilots are entering the CAD workflow.',
      lessons: [
        { title: 'Three families of design AI', detail: 'Generative/topology optimization, ML surrogate models for fast evaluation, and LLM copilots for documentation and knowledge work.' },
        { title: 'Generative design today', detail: 'Goal/constraint-driven geometry from load cases and manufacturing constraints; why outputs need engineering judgment, not blind trust.' },
        { title: 'The verification imperative', detail: 'AI proposes, physics disposes: every AI-generated design must close against analysis or test.' },
      ],
      examples: [
        { name: 'Autodesk Fusion Generative Design', detail: 'Production generative design used by General Motors (seat-bracket redesign: one part replacing eight, ~40% lighter / 20% stronger) — the canonical industrial case.' },
        { name: 'nTop (nTopology)', detail: 'Implicit-modeling and field-driven design used by aerospace and medical-device firms for lattices and conformal cooling that traditional CAD cannot represent.' },
      ],
    },
    future: {
      summary: 'The design loop collapses: real-time ML surrogates let engineers explore thousands of variants interactively, and multimodal copilots turn requirements into candidate geometry.',
      lessons: [
        { title: 'Interactive design spaces', detail: 'Surrogate models give millisecond performance estimates, turning batch optimization into live exploration.' },
        { title: 'Requirements-to-geometry copilots', detail: 'Multimodal models drafting parametric models and engineering documents from specs and sketches.' },
        { title: 'Closed-loop design–test', detail: 'Coupling generative design with automated meshing, simulation, and Bayesian optimization.' },
      ],
      examples: [
        { name: 'PhysicsX', detail: 'ML surrogate models for aerospace/automotive engineering reportedly cutting simulation-driven design iterations from hours to seconds.' },
        { name: 'Siemens NX + AI', detail: 'AI-assisted command prediction and design-automation features inside a mainstream MCAD suite.' },
      ],
    },
    advantage: {
      summary: 'Apply the Use Case and Problem-Based models to the design organization, weighted by verification cost.',
      lessons: [
        { title: 'Decompose the design process', detail: 'Requirements, concept, detailed design, analysis, DFM, documentation: AI exposure scoring per stage.' },
        { title: 'Problem-first candidates', detail: 'Design-iteration cycle time, mass/cost targets, late DFM rework: quantify before tooling.' },
        { title: 'Your design AI roadmap', detail: 'Documentation/standards Quick Wins; surrogate-model Sweetspots; generative-design Moonshots.' },
      ],
      examples: [],
    },
    applied: {
      summary: 'The technical stack: building surrogate models, running generative design responsibly, and integrating LLM copilots.',
      lessons: [
        { title: 'Building a surrogate model', detail: 'Design of experiments → sampling FEA/CFD runs → training (Gaussian processes, gradient boosting, small neural nets) → quantifying error and the valid design envelope.' },
        { title: 'Generative design in practice', detail: 'Defining preserve/obstacle geometry, load cases, and manufacturing methods; interpreting and validating organic outputs for real parts.' },
        { title: 'LLM copilots for engineering', detail: 'GD&T and standards (ASME Y14.5, ISO) lookup, DFM checklists, and design-rationale documentation — with grounding and citation.' },
        { title: 'Implementation lab', detail: 'Take one component: build a surrogate, optimize, and verify the winning design against full simulation. Use the AI tutor to walk through DOE choices.' },
      ],
      examples: [
        { name: 'Monolith AI', detail: 'No-code platform letting engineers (e.g., at BMW, Honeywell) build ML models on test/simulation data to predict performance and cut physical testing.' },
        { name: 'This platform’s AI tutor', detail: 'Ask the Gemini 2.5 Flash tutor to explain when a Gaussian-process surrogate beats a neural network for a small DOE — grounded in this course.' },
      ],
    },
    deliverables: [
      'Design-process AI exposure map',
      'A validated surrogate model for one component with quantified error bounds',
      'Generative-design study with manufacturability and verification notes',
    ],
  }),

  makeModule({
    id: 'ai-for-thermal-analysis',
    number: '16',
    title: 'AI for Engineering Thermal Analysis',
    name: 'Thermal Analysis',
    track: 'engineering',
    level: 'Intermediate–Advanced',
    tagline: 'ML surrogates and physics-informed models for heat transfer and thermal management.',
    description:
      'For thermal and electronics-cooling engineers applying AI to conjugate heat transfer, electronics thermal management, and HVAC/building energy — using surrogate models and physics-informed neural networks to replace or accelerate expensive thermal simulation.',
    audience: [
      'Thermal, electronics-cooling, and HVAC engineers',
      'Electronics-packaging and data-center thermal designers',
      'CAE engineers extending thermal-simulation workflows with ML',
    ],
    outcomes: [
      'Build ML surrogates for steady-state and transient thermal responses',
      'Apply physics-informed neural networks (PINNs) to heat-transfer problems and know their limits',
      'Use AI for thermal design optimization (heat-sink geometry, component placement, cooling control)',
      'Validate AI thermal predictions against high-fidelity solvers and test data',
    ],
    state: {
      summary: 'The state of AI in thermal engineering: surrogate models accelerate design sweeps, PINNs offer mesh-free PDE solutions, and AI controls optimize cooling in operation.',
      lessons: [
        { title: 'Why thermal analysis is ripe for ML', detail: 'Expensive conjugate-heat-transfer runs, large design spaces, and repeated similar geometries — ideal surrogate territory.' },
        { title: 'Surrogates vs. PINNs vs. data-driven control', detail: 'Three distinct AI approaches mapped to design-sweep, solver-replacement, and operational-control problems.' },
        { title: 'The validation discipline', detail: 'Energy-balance checks, conservation residuals, and held-out test cases as non-negotiable gates.' },
      ],
      examples: [
        { name: 'Google DeepMind data-center cooling', detail: 'ML reduced cooling energy by ~40% (PUE), later moved to direct AI recommendation/control — the landmark operational thermal-AI case.' },
        { name: 'NVIDIA + Cadence Celsius / 6SigmaDCX', detail: 'AI-accelerated electronics and data-center thermal tools cutting CHT solve times for chip and rack design.' },
      ],
    },
    future: {
      summary: 'Real-time digital twins of thermal systems: surrogate-driven design exploration and predictive thermal control of devices and buildings.',
      lessons: [
        { title: 'Thermal digital twins', detail: 'Surrogate-backed live models predicting junction temperatures and hotspots from sensor streams.' },
        { title: 'Predictive thermal control', detail: 'RL and MPC-with-surrogates for dynamic cooling — chips, EV battery packs, and HVAC.' },
        { title: 'Generative thermal design', detail: 'AI-proposed heat-sink and cold-plate geometries (often via topology optimization + surrogate evaluation).' },
      ],
      examples: [
        { name: 'EV battery thermal management', detail: 'OEMs using ML-based battery thermal models for fast-charge control that protects cell life — published across automotive R&D.' },
        { name: 'BrainBox AI', detail: 'Autonomous AI control of commercial-building HVAC, with reported double-digit energy and emissions reductions.' },
      ],
    },
    advantage: {
      summary: 'Apply the Use Case and Problem-Based models to thermal engineering workflows.',
      lessons: [
        { title: 'Decompose the thermal workflow', detail: 'Model build, meshing, solve, post-process, optimize, control: AI exposure scoring per stage.' },
        { title: 'Problem-first candidates', detail: 'Solve time per design, cooling energy, thermal-margin overdesign: quantify before tooling.' },
        { title: 'Your thermal AI roadmap', detail: 'Post-processing/reporting Quick Wins; surrogate-sweep Sweetspots; predictive-control Moonshots.' },
      ],
      examples: [],
    },
    applied: {
      summary: 'The technical stack: training thermal surrogates, implementing a PINN, and coupling AI with optimization.',
      lessons: [
        { title: 'Training a thermal surrogate', detail: 'Parameterize geometry/boundary conditions, sample a solver, train, and report error against held-out CHT runs; quantify the valid envelope.' },
        { title: 'Physics-informed neural networks', detail: 'Encoding the heat equation and boundary conditions in the loss; where PINNs shine (inverse problems, sparse data) and where they struggle (stiff/multiscale, sharp gradients).' },
        { title: 'Optimization and control loops', detail: 'Surrogate + Bayesian optimization for heat-sink design; MPC/RL for operational cooling.' },
        { title: 'Implementation lab', detail: 'Build a surrogate for a heat-sink design sweep and optimize fin geometry; validate the optimum in a full solver. Ask the tutor to sanity-check your energy balance.' },
      ],
      examples: [
        { name: 'NVIDIA PhysicsNeMo (Modulus)', detail: 'Open framework for PINNs and neural-operator surrogates with documented heat-transfer examples — a concrete starting codebase.' },
        { name: 'Ansys + ML surrogates', detail: 'Ansys optiSLang/Twin Builder workflows that fit reduced-order/ML models on simulation data for real-time thermal twins.' },
      ],
    },
    deliverables: [
      'Thermal-workflow AI exposure map',
      'A validated thermal surrogate with error bounds and valid-range documentation',
      'Optimization or control study with full-solver verification of the result',
    ],
  }),

  makeModule({
    id: 'ai-for-fea',
    number: '17',
    title: 'AI for Finite-Element Analysis',
    name: 'Finite-Element Analysis',
    track: 'engineering',
    level: 'Advanced',
    tagline: 'Neural surrogates, operator learning, and AI-assisted meshing for structural simulation.',
    description:
      'For structural and CAE engineers applying AI across the FEA pipeline: ML surrogates for parametric studies, graph/operator networks that learn the solution map, AI-assisted meshing, and LLM copilots for setup and results interpretation — always anchored to verification.',
    audience: [
      'Structural, stress, and CAE/FEA engineers',
      'Simulation-automation and methods-development specialists',
      'R&D engineers exploring ML-accelerated simulation',
    ],
    outcomes: [
      'Build neural surrogates for parametric FEA studies with quantified error',
      'Understand graph neural networks and neural operators (FNO/DeepONet) as learned solvers',
      'Apply AI-assisted meshing and setup, and LLM copilots for results interpretation',
      'Design a verification regime that keeps AI-accelerated FEA trustworthy',
    ],
    state: {
      summary: 'AI is reshaping FEA from the edges in: surrogate models for optimization, learned solvers in research moving to practice, and LLM copilots assisting setup and interpretation.',
      lessons: [
        { title: 'Where AI touches the FEA pipeline', detail: 'Pre-processing/meshing, the solve itself (surrogates/learned solvers), and post-processing/interpretation.' },
        { title: 'Surrogates vs. learned solvers', detail: 'Fixed-output regression surrogates vs. operator-learning models that predict full fields — different data needs and guarantees.' },
        { title: 'The trust problem', detail: 'ML models do not enforce equilibrium or conservation by default; verification and error bounds are mandatory.' },
      ],
      examples: [
        { name: 'DeepMind MeshGraphNets', detail: 'Graph neural networks that learn mesh-based simulation dynamics (structural, cloth, fluids) — the influential research basis for learned FEA-style solvers.' },
        { name: 'Altair romAI / physicsAI', detail: 'Commercial reduced-order and field-prediction ML inside a mainstream CAE suite, fitting surrogates on solver results for real-time response.' },
      ],
    },
    future: {
      summary: 'Operator-learning surrogates deliver near-instant full-field predictions, enabling interactive structural design and uncertainty quantification at scale.',
      lessons: [
        { title: 'Neural operators as field predictors', detail: 'FNO and DeepONet learning solution operators that generalize across loads/geometries — full stress fields in milliseconds.' },
        { title: 'Interactive structural design', detail: 'Engineers sweep parameters and see stress/displacement live; optimization and UQ become routine.' },
        { title: 'Hybrid solvers', detail: 'ML preconditioners and ML-corrected coarse models that keep a physics solver in the loop for guarantees.' },
      ],
      examples: [
        { name: 'Ansys SimAI', detail: 'Cloud ML that learns from prior simulation results to predict full 3D fields for new designs in near real time — operator-learning brought to a commercial CAE customer base.' },
        { name: 'NVIDIA PhysicsNeMo', detail: 'Open neural-operator/PINN framework with structural and PDE examples used to prototype learned solvers.' },
      ],
    },
    advantage: {
      summary: 'Apply the Use Case and Problem-Based models to the simulation organization.',
      lessons: [
        { title: 'Decompose the FEA workflow', detail: 'CAD cleanup, meshing, setup, solve, post-process, report: AI exposure scoring per stage.' },
        { title: 'Problem-first candidates', detail: 'Solve cost per design study, meshing labor, optimization turnaround: quantify before tooling.' },
        { title: 'Your simulation AI roadmap', detail: 'Setup/reporting copilot Quick Wins; surrogate-study Sweetspots; learned-solver Moonshots.' },
      ],
      examples: [],
    },
    applied: {
      summary: 'The technical stack: building FEA surrogates, prototyping a neural operator, AI-assisted meshing, and verification.',
      lessons: [
        { title: 'Building an FEA surrogate', detail: 'Parametric DOE → batch solves → train (GP/boosting for scalars, CNN/GNN for fields) → quantify error vs. held-out solves and define the valid envelope.' },
        { title: 'Neural operators in practice', detail: 'When DeepONet/FNO fit your problem, data requirements, and how to bound generalization error.' },
        { title: 'AI-assisted meshing and setup', detail: 'ML-driven mesh sizing/adaptivity and LLM copilots for boundary-condition setup and standards-compliant reporting.' },
        { title: 'Implementation lab', detail: 'Build a surrogate for a parametric stress study, validate against held-out solves, and document the trust envelope. Use the tutor to interrogate where the surrogate should not be trusted.' },
      ],
      examples: [
        { name: 'This platform’s AI tutor', detail: 'Ask the Gemini 2.5 Flash tutor to compare a CNN field-surrogate against a DeepONet for your mesh — grounded in this course’s context.' },
        { name: 'Altair / Ansys ML workflows', detail: 'Vendor case studies of surrogate-accelerated optimization cutting design-study time from days to minutes — study one and reproduce its verification approach.' },
      ],
    },
    deliverables: [
      'FEA-workflow AI exposure map',
      'A validated FEA surrogate with documented error bounds and trust envelope',
      'A verification protocol for AI-accelerated structural studies',
    ],
  }),

  makeModule({
    id: 'ai-for-cfd',
    number: '18',
    title: 'AI for Computational Fluid Dynamics',
    name: 'Computational Fluid Dynamics',
    track: 'engineering',
    level: 'Advanced',
    tagline: 'Neural operators, ML turbulence closures, and differentiable solvers for fluid simulation.',
    description:
      'For CFD and aerodynamics engineers applying AI to accelerate and augment fluid simulation: neural-operator surrogates for flow fields, ML turbulence/closure models, super-resolution and reduced-order models, and differentiable/hybrid solvers — with rigorous physical validation.',
    audience: [
      'CFD, aerodynamics, and fluid-systems engineers',
      'Turbomachinery, automotive-aero, and external-aero specialists',
      'CAE/methods engineers and applied-ML researchers in fluids',
    ],
    outcomes: [
      'Build flow-field surrogates and reduced-order models for fast design exploration',
      'Evaluate ML turbulence/closure models and data-driven RANS corrections critically',
      'Understand neural operators (FNO) and hybrid/differentiable solvers for fluids',
      'Design validation against high-fidelity CFD and experiment, including conservation checks',
    ],
    state: {
      summary: 'AI in CFD spans surrogate flow prediction, ML-augmented turbulence modeling, and emerging learned/differentiable solvers — fast-moving in research with growing commercial footholds.',
      lessons: [
        { title: 'The three frontiers', detail: 'Surrogate/ROM flow prediction, ML turbulence and closure modeling, and learned/differentiable solvers.' },
        { title: 'Why CFD is hard for ML', detail: 'Chaotic dynamics, multiscale turbulence, sharp gradients, and conservation constraints — why naive networks fail.' },
        { title: 'Validation in fluids', detail: 'Mass/momentum conservation residuals, integral quantities (lift/drag), and out-of-distribution behavior as core checks.' },
      ],
      examples: [
        { name: 'Google Research weather/fluids (NeuralGCM, MeshGraphNets)', detail: 'Learned and hybrid solvers matching or beating numerics on benchmark flows and global weather — the headline demonstrations of learned fluid dynamics.' },
        { name: 'Neural Concept', detail: 'Deep-learning surrogate platform used in automotive/aerospace (e.g., external aero) to predict drag and flow fields in seconds for early-stage design.' },
      ],
    },
    future: {
      summary: 'Near-real-time aerodynamic design: neural-operator surrogates predict full flow fields instantly, and ML closures let coarse simulations reach high-fidelity accuracy.',
      lessons: [
        { title: 'Neural operators for flow fields', detail: 'FNO and related models learning the PDE solution operator across geometries and conditions for instant field prediction.' },
        { title: 'Data-driven turbulence closures', detail: 'ML-augmented RANS/LES corrections trained on high-fidelity data; generalization and realizability constraints.' },
        { title: 'Differentiable & hybrid solvers', detail: 'Embedding learnable components in solvers for end-to-end optimization and inverse design.' },
      ],
      examples: [
        { name: 'Luminary Cloud + NVIDIA', detail: 'GPU-native CFD with AI surrogate workflows aimed at real-time design iteration for aerospace/automotive.' },
        { name: 'Siemens Simcenter / Ansys Fluent ML', detail: 'Commercial CFD adding ML-based acceleration and reduced-order modeling to mainstream solvers.' },
      ],
    },
    advantage: {
      summary: 'Apply the Use Case and Problem-Based models to the CFD organization.',
      lessons: [
        { title: 'Decompose the CFD workflow', detail: 'Geometry prep, meshing, solver setup, run, post-process, optimize: AI exposure scoring per stage.' },
        { title: 'Problem-first candidates', detail: 'Wall-clock per run, design-cycle turnaround, mesh/setup labor: quantify before tooling.' },
        { title: 'Your CFD AI roadmap', detail: 'Post-processing/reporting Quick Wins; surrogate early-design Sweetspots; learned-solver/closure Moonshots.' },
      ],
      examples: [],
    },
    applied: {
      summary: 'The technical stack: building flow surrogates and ROMs, prototyping an FNO, evaluating ML closures, and validating physically.',
      lessons: [
        { title: 'Flow-field surrogates and ROMs', detail: 'POD/DMD reduced-order models and CNN/GNN field surrogates; training data strategy and error quantification on integral quantities.' },
        { title: 'Neural operators for CFD', detail: 'FNO/DeepONet setup, resolution invariance claims and their caveats, and out-of-distribution risk.' },
        { title: 'ML turbulence modeling', detail: 'Data-driven RANS corrections and subgrid models; embedding physical constraints (Galilean invariance, realizability).' },
        { title: 'Implementation lab', detail: 'Build a drag/flow-field surrogate over a parametric geometry, validate lift/drag against full CFD, and probe where it breaks. Use the tutor to check your conservation diagnostics.' },
      ],
      examples: [
        { name: 'NVIDIA PhysicsNeMo FNO examples', detail: 'Open, runnable Fourier-neural-operator examples for PDEs/flows — a concrete codebase to start from.' },
        { name: 'This platform’s AI tutor', detail: 'Ask the Gemini 2.5 Flash tutor why an FNO surrogate may violate mass conservation and how to diagnose it — grounded in this course.' },
      ],
    },
    deliverables: [
      'CFD-workflow AI exposure map',
      'A validated flow-field surrogate or ROM with error bounds on integral quantities',
      'A physical-validation protocol (conservation + experimental anchors) for ML-CFD',
    ],
  }),

  makeModule({
    id: 'ai-for-research-biology',
    number: '19',
    title: 'AI for Research Biology',
    name: 'Research Biology',
    track: 'engineering',
    level: 'Intermediate–Advanced',
    tagline: 'Protein structure, generative biology, single-cell omics, and the AI research copilot.',
    description:
      'For research biologists and computational scientists applying AI across structure prediction, protein/sequence design, genomics and single-cell analysis, bioimaging, and literature-scale reasoning — with the reproducibility and wet-lab validation discipline science demands.',
    audience: [
      'Research biologists, biochemists, and bioinformaticians',
      'Computational biology and biotech R&D scientists',
      'Lab leads and translational researchers adopting AI tools',
    ],
    outcomes: [
      'Use structure-prediction and protein-design models in real research workflows',
      'Apply foundation models for single-cell, genomics, and sequence analysis',
      'Deploy AI for bioimaging segmentation and high-content screening',
      'Use LLM research copilots for literature, hypothesis, and protocol work — with verification',
    ],
    state: {
      summary: 'Biology is in an AI golden age: structure prediction is solved-enough to be routine, generative protein design is producing real molecules, and foundation models are spreading across omics and imaging.',
      lessons: [
        { title: 'The structure-prediction revolution', detail: 'AlphaFold’s impact on routine research; what predicted structures do and do not tell you, and confidence metrics (pLDDT/PAE).' },
        { title: 'Generative and foundation models in biology', detail: 'Protein language/design models, single-cell foundation models, and genomic sequence models — the new toolkit.' },
        { title: 'The validation contract', detail: 'AI predictions are hypotheses; wet-lab confirmation, controls, and reproducibility remain the scientific bar.' },
      ],
      examples: [
        { name: 'AlphaFold (DeepMind/EMBL-EBI)', detail: '200M+ predicted structures in a public database used by millions of researchers — the most consequential AI-for-science deployment, recognized by the 2024 Nobel Prize in Chemistry.' },
        { name: 'RFdiffusion & ProteinMPNN (Baker Lab)', detail: 'Open generative models designing novel proteins and binders, validated in the lab — generative biology producing real, testable molecules.' },
      ],
    },
    future: {
      summary: 'Toward AI co-scientists: integrated models reason over sequence, structure, and function; generative design proposes therapeutics; agents help plan and interpret experiments.',
      lessons: [
        { title: 'Multimodal biological models', detail: 'Joint reasoning over sequence, structure, expression, and phenotype; virtual cell ambitions.' },
        { title: 'Generative therapeutics', detail: 'De novo binders, enzymes, and antibodies designed in silico and validated experimentally; the new drug-discovery funnel.' },
        { title: 'The research copilot/agent', detail: 'LLM agents proposing hypotheses, drafting protocols, and analyzing results — with humans owning scientific judgment.' },
      ],
      examples: [
        { name: 'AlphaProteo / Isomorphic Labs', detail: 'Next-generation binder design and AI-first drug discovery partnerships (e.g., with Eli Lilly, Novartis) — the translational frontier.' },
        { name: 'Google "AI co-scientist" & Future House', detail: 'Multi-agent systems for hypothesis generation and literature reasoning that have surfaced experimentally-supported findings.' },
      ],
    },
    advantage: {
      summary: 'Apply the Use Case and Problem-Based models to the research workflow, weighted by validation cost.',
      lessons: [
        { title: 'Decompose the research workflow', detail: 'Literature, hypothesis, experimental design, data analysis, interpretation, writing: AI exposure scoring per stage.' },
        { title: 'Validation-cost weighting', detail: 'An AI result’s value is net of the experiments needed to trust it — prioritize accordingly.' },
        { title: 'Your research AI roadmap', detail: 'Literature/coding-assistant Quick Wins; structure/omics-analysis Sweetspots; generative-design Moonshots.' },
      ],
      examples: [],
    },
    applied: {
      summary: 'The technical stack: running structure/design models, analyzing omics with foundation models, bioimaging AI, and grounded research copilots.',
      lessons: [
        { title: 'Structure prediction & protein design hands-on', detail: 'AlphaFold/ESMFold via ColabFold; interpreting confidence; ProteinMPNN/RFdiffusion design loops and their experimental follow-up.' },
        { title: 'Single-cell & genomics foundation models', detail: 'Cell-type annotation and embeddings (e.g., scGPT, Geneformer), and sequence models — with batch-effect and leakage pitfalls.' },
        { title: 'Bioimaging AI', detail: 'Cellpose/StarDist segmentation and high-content screening; validation against expert annotation.' },
        { title: 'Implementation lab', detail: 'Take one target: predict structure, propose a design or analysis, and write the wet-lab validation plan. Use the tutor to pressure-test confidence metrics and controls.' },
      ],
      examples: [
        { name: 'ColabFold', detail: 'Open, widely-used notebook bringing AlphaFold/ESMFold to any lab without a GPU cluster — the practical on-ramp for structure prediction.' },
        { name: 'This platform’s AI tutor', detail: 'Ask the Gemini 2.5 Flash tutor how to interpret a low-pLDDT region or design proper negative controls for an AI-proposed binder — grounded in this course.' },
      ],
    },
    deliverables: [
      'Research-workflow AI exposure map with validation-cost weighting',
      'A structure-prediction or design analysis with confidence interpretation',
      'A wet-lab validation plan for one AI-generated hypothesis or molecule',
    ],
  }),
];
