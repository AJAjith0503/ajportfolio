export interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  oneLineImpact: string;
  tags: string[];
  link: string;
  liveLink: string;
  heroImage?: string;
  problemStatement?: {
    text: string;
    stats: string[];
  };
  motivation?: string[];
  architecture?: {
    modules: { name: string; description: string; icon?: string }[];
  };
  aiEngineering?: {
    models: { name: string; purpose: string; optimization: string }[];
    mentions: string[];
  };
  datasetEngineering?: {
    description: string;
    stats: string[];
    visuals: string[];
  };
  metrics?: {
    name: string;
    result: string;
  }[];
  innovations?: string[];
  uiuxScreens?: { name: string; image?: string; layout?: 'mobile' | 'desktop' }[];
  research?: {
    title: string;
    details: string[];
    abstract: string;
  };
  skills: string[];
  challenges?: string[];
  futureImprovements?: string[];
}

export const projects: Project[] = [
  {
    id: '11',
    title: 'FiTusion',
    type: 'Premium Fitness Web Application',
    oneLineImpact: 'A high-performance, hyper-interactive fitness web application engineered with a stunning cyberpunk dark/neon-green aesthetic.',
    description: 'FiTusion is an elite fitness web application built with React 18 and Vite. It utilizes vanilla CSS3, fluid glassmorphic layouts, and hardware-accelerated animations to deliver a state-of-the-art cyber-athletic dashboard. Designed for modern fitness startups, it includes custom biometrics blueprints (BMI/BMR calculations), a high-tech SVG charging loading cycle, an interactive custom coordinate tactical blueprint map, and a 100% mobile-responsive layout stacking engine.',
    tags: ['React 18', 'Vite', 'Vanilla CSS3', 'Glassmorphism', 'CSS Grid', 'Lucide React', 'Intersection Observer', 'Web Storage API'],
    link: 'https://github.com/AJAjith0503/gym',
    liveLink: 'https://gym-seven-chi-61.vercel.app/',
    problemStatement: {
      text: 'Designing a high-performance web experience for modern fitness startups demands high-fidelity biometrics calculators, pixel-perfect responsive layouts that preserve absolute overlay designs without viewport overflows, and highly optimized, continuous entrance animations to keep users completely engaged.',
      stats: [
        'Absolutely positioned hero elements caused layout wrapping and clipping on mobile devices.',
        'Traditional emoji symbols rendered inconsistently across operating systems, diluting brand premium feel.',
        'Excessive IntersectionObserver triggers during rapid scrolling could lead to layout thrashing on low-end mobiles.'
      ]
    },
    motivation: [
      'Deliver an elite, high-fidelity cyberpunk user interface for the modern fitness landscape.',
      'Build an ultra-responsive stacking engine that maintains advanced desktop grid overlaps on small viewports.',
      'Create a seamless, hardware-accelerated scroll reveal system ensuring fluid 60FPS transitions.',
      'Engineer scientific, dual-unit biometric utilities (Mifflin-St Jeor calculators) with graphical indicator gauges.'
    ],
    architecture: {
      modules: [
        { name: 'High-Tech Preloader', description: 'A custom SVG circular charging ring preloader counting 0-100% with randomized realistic speed increments and live diagnostics output.' },
        { name: 'Biometrics Blueprint', description: 'Dual-unit Metric/Imperial calculator calibrating BMI, Mifflin-St Jeor BMR, caloric coefficients, hydration requirements, and dynamic hypertrophy guides.' },
        { name: 'Continuous Scroll Controller', description: 'Advanced IntersectionObserver state synchronization triggering hardware-accelerated viewport entrance reveals dynamically on both enter and exit.' },
        { name: 'Tactical Radar HQ Map', description: 'Fully CSS Grid-based blueprint map featuring geometric coordinate grids, street overlays, active central satellite pulse, and custom tooltips.' }
      ]
    },
    metrics: [
      { name: 'Scroll Performance', result: '60 FPS' },
      { name: 'Preloader Initializer', result: '100%' },
      { name: 'Responsiveness', result: '100%' },
      { name: 'Custom SVG Icons', result: 'Fully Tree-Shaken' }
    ],
    innovations: [
      'High-Tech SVG Charging Cycle: Implemented an SVG stroke-dasharray loading circle paired with dynamic terminal text logs simulating real-time diagnostics before sliding open the main app.',
      'Sleek Absolute Mobile Positioning: Engineered custom coordinate layout overrides and fluid responsive tokens that scale floating metric badges cleanly on mobile screens with zero viewport overflow.',
      'Continuous Observer Hook: Designed a robust, repeatable IntersectionObserver routine that resets transitions when elements leave view, allowing gorgeous, repeating scroll reveals.',
      'Dual-Unit Biometrics Calibration: Built a precise calculation engine covering BMI and BMR using the Mifflin-St Jeor equation, paired with a custom graphical needle gauge that dynamically pivots to show physical state.'
    ],
    skills: ['React 18', 'Vite', 'Vanilla CSS3', 'Lucide React', 'Intersection Observer', 'Web Storage API', 'SVG Animation', 'Glassmorphism', 'Responsive Design', 'BMR/BMI Biometrics'],
    challenges: [
      'Absolute Layout Overflow on Mobile: Floating hero dashboard badges overlapped beautifully on desktop but caused off-screen clipping on phones. Solved by binding them to scalable absolute coordinates relative to the athlete illustration and sizing them with fluid responsive tokens.',
      'Platform Emojis Discrepancy: Standard text emojis looked radically different across macOS, Windows, and Android, destroying UI aesthetic unity. Solved by integrating tree-shaken Lucide React SVG outlines and applying styled neon-green drop shadows.',
      'Scroll Thrashing on Observer Toggles: Multiple IntersectionObserver triggers bound to heavy animations caused CPU spikes. Solved by consolidating element queries into a single, highly performant React-based observer hook using class toggles and GPU-accelerated CSS properties.'
    ],
    futureImprovements: [
      'Real-time workout session tracking utilizing local state storage.',
      'Interactive dynamic workout planner customizable by biometrics results.',
      'Web Audio synthesis integration to trigger futuristic diagnostic audio logs.',
      'Dynamic diet/nutrition generator allowing exportable PDF blueprints.'
    ],
    uiuxScreens: []
  },
  {
    id: '4',
    title: 'AI-Powered Food Freshness Detection System',
    type: 'Research & Academic Project',
    oneLineImpact: 'Building AI-powered assistive systems that combine accessibility, computer vision, and real-time mobile intelligence.',
    description: 'Developed an AI-powered mobile assistive system that enables visually impaired users to independently evaluate food freshness and detect expiry dates using real-time computer vision and voice interaction. The system integrates YOLOv8 models, TensorFlow Lite optimization, and hands-free accessibility features for fast on-device inference under 100ms.',
    tags: ['AI', 'Computer Vision', 'YOLOv8', 'TensorFlow Lite', 'Accessibility AI', 'Deep Learning', 'Mobile AI', 'Edge AI', 'Assistive Technology', 'Research Project'],
    link: 'https://github.com/AJAjith0503/FOOD_GUARD_AI.git',
    liveLink: '#',
    problemStatement: {
      text: 'Food freshness evaluation mainly depends on visual inspection, making it impossible for visually impaired users to independently verify food quality. Existing systems lack accessibility-focused AI solutions, increasing the risk of consuming spoiled food and health hazards.',
      stats: [
        'Packaged food expiry dates are difficult to identify manually.',
        'Risk of consuming spoiled food increases health hazards.'
      ]
    },
    motivation: [
      'Enable independent food quality assessment.',
      'Build socially responsible AI solutions.',
      'Improve accessibility for visually impaired users.',
      'Reduce foodborne health risks.',
      'Minimize food waste using intelligent detection systems.'
    ],
    architecture: {
      modules: [
        { name: 'Voice Commands', description: 'Speech-to-text voice commands for hands-free operation.' },
        { name: 'Camera Input', description: 'Real-time image capture for AI processing.' },
        { name: 'AI Detection Models', description: 'YOLOv8 models for food freshness and expiry detection.' },
        { name: 'Decision Logic', description: 'Freshness & Expiry analysis for safety determination.' },
        { name: 'Voice Feedback Output', description: 'Text-to-speech audio feedback for immediate guidance.' }
      ]
    },
    aiEngineering: {
      models: [
        { name: 'YOLOv8s', purpose: 'Food freshness detection', optimization: 'INT8 Quantization' },
        { name: 'YOLOv8n', purpose: 'Expiry-date region detection', optimization: 'INT8 Quantization' },
        { name: 'TensorFlow Lite', purpose: 'Mobile deployment', optimization: 'Real-time optimization' }
      ],
      mentions: [
        'Multi-class freshness classification',
        'Expiry-date region detection',
        'INT8 quantization for lightweight inference',
        'Mobile performance tuning',
        'Edge AI optimization'
      ]
    },
    datasetEngineering: {
      description: 'Dataset collected from Kaggle and public sources, including real-world food images for robust training.',
      stats: [
        'Image annotation and augmentation performed',
        'Multiple freshness categories used',
        'Diverse food samples included',
        'Real-world environment images'
      ],
      visuals: []
    },
    metrics: [
      { name: 'Overall Accuracy', result: '93.4%' },
      { name: 'Precision', result: '0.936' },
      { name: 'Recall', result: '0.934' },
      { name: 'F1 Score', result: '0.935' },
      { name: 'Real-Time Inference', result: '<100ms' }
    ],
    innovations: [
      'Accessibility-focused AI application: Designed specifically for visually impaired users.',
      'Real-time mobile computer vision: Low-latency inference under 100ms.',
      'Dual-model detection architecture: Freshness and expiry detection in one system.',
      'Voice-assisted assistive technology: Fully hands-free speech interaction.',
      'Edge AI optimization: High performance using TensorFlow Lite and INT8 quantization.'
    ],
    uiuxScreens: [
      { name: 'Splash Screen', image: '/projects/food-guard/Picture1.png', layout: 'mobile' },
      { name: 'Voice Setup Screen', image: '/projects/food-guard/Picture2.png', layout: 'mobile' },
      { name: 'Main Menu Screen', image: '/projects/food-guard/Picture3.png', layout: 'mobile' },
      { name: 'Expiry Detection Screen', image: '/projects/food-guard/Picture4.jpg', layout: 'mobile' },
      { name: 'Freshness Scan Screen', image: '/projects/food-guard/Picture5.jpg', layout: 'mobile' },
      { name: 'AI Processing Screen', image: '/projects/food-guard/Picture6.png', layout: 'mobile' },
      { name: 'Final Analysis Screen', image: '/projects/food-guard/Picture7.png', layout: 'mobile' }
    ],
    research: {
      title: 'Research Paper Presentation – ICICTA 2026',
      details: ['Paper ID: [Pending]', 'Conference: ICICTA 2026', 'Domain: Computer Vision & Accessibility'],
      abstract: 'A deep learning approach to assist visually impaired individuals in food freshness detection, utilizing optimized CNN architectures for mobile edge deployment.'
    },
    skills: ['AI/ML', 'YOLOv8', 'TensorFlow Lite', 'Deep Learning', 'Computer Vision', 'Accessibility AI', 'Speech Recognition', 'Text-to-Speech', 'Mobile AI', 'Edge AI', 'INT8 Quantization'],
    challenges: [
      'Real-Time Mobile Inference: Optimized AI models for low-latency mobile execution.',
      'Accessibility Integration: Implemented speech-based interaction for hands-free usability.',
      'Lightweight Deployment: Used TensorFlow Lite and INT8 quantization.',
      'Food Detection Accuracy: Improved classification and expiry-region detection.'
    ],
    futureImprovements: [
      'Vision Transformers integration',
      'Multilingual voice support',
      'Cloud-based smart pantry system',
      'Nutrition recommendation engine',
      'Expanded food dataset',
      'Personalized assistive feedback'
    ]
  },
  {
    id: '5',
    title: 'Personal Voice Assistant',
    type: 'Personal Project',
    oneLineImpact: 'Automating daily desktop tasks through intuitive voice commands and NLP.',
    description: 'Developed an AI-powered personal voice assistant to automate daily tasks using speech recognition and natural language processing.',
    tags: ['Python', 'Speech Recognition', 'NLP', 'Automation', 'Tkinter'],
    link: 'https://github.com/AJAjith0503/Voice_Assistant.git',
    liveLink: '#',
    skills: ['Python', 'NLP', 'Automation', 'GUI Development'],
  },
  {
    id: '1',
    title: 'Face Recognition Attendance System',
    type: 'Personal Project',
    oneLineImpact: 'Seamless biometric attendance marking using LBPH facial recognition.',
    description: 'A full-featured attendance management system using facial recognition with LBPH algorithm for real-time face detection.',
    tags: ['Java', 'OpenCV', 'MySQL', 'Desktop App Development'],
    link: 'https://github.com/AJAjith0503/Face-Recognition-Attendance-System',
    liveLink: '#',
    skills: [],
  },
  {
    id: '2',
    title: 'Elite Mart – Online Shopping',
    type: 'Personal Project',
    oneLineImpact: 'Modern e-commerce experience with high-performance frontend components.',
    description: 'A responsive e-commerce frontend interface with modern UI components. Includes professional sidebar navigation, optimized grid layouts, and smooth transitions.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    link: 'https://github.com/AJAjith0503/ecommerce-project',
    liveLink: 'https://kaleidoscopic-mooncake-c210e2.netlify.app/',
    skills: ['Frontend Development', 'UI/UX Design', 'Firebase', 'Responsive Design'],
  },
  {
    id: '6',
    title: 'Autonomous AI Research Assistant',
    type: 'Agentic AI & RAG Project',
    oneLineImpact: 'Automating academic synthesis and research gap discovery through multi-agent orchestration and rigorous RAG validation.',
    description: 'A hybrid agentic pipeline that pairs a React Frontend, a localized Python RAG Microservice, and an n8n Orchestrated Workflow to automatically synthesize cutting-edge academic papers from ArXiv. It features a specialized validation engine for hallucination detection, citation accuracy, and novelty scoring.',
    tags: ['AI', 'Agentic Workflows', 'RAG', 'n8n', 'Python', 'FastAPI', 'FAISS', 'HuggingFace', 'React', 'Research Automation'],
    link: 'https://github.com/AJAjith0503/ai_research_assistant',
    liveLink: '#',
    problemStatement: {
      text: 'Academic research is becoming increasingly overwhelming with thousands of papers published daily. Researchers struggle to synthesize findings, identify genuine gaps, and verify the accuracy of AI-generated summaries.',
      stats: [
        'Over 10,000 papers added to ArXiv monthly.',
        'Manual synthesis takes average of 15+ hours per topic.'
      ]
    },
    motivation: [
      'Automate literature review synthesis.',
      'Identify cross-domain research opportunities.',
      'Implement rigorous verification metrics for AI research.',
      'Build a "Skeptic" agent to challenge findings.'
    ],
    architecture: {
      modules: [
        { name: 'Research Agent', description: 'Fetches and filters academic papers from ArXiv API.' },
        { name: 'RAG Microservice', description: 'Python FastAPI service handling FAISS indexing and embeddings.' },
        { name: 'Analysis Engine', description: 'n8n workflow for gap discovery and synthesis.' },
        { name: 'Skeptic Agent', description: 'Validates findings using DuckDuckGo web search.' },
        { name: 'Validation API', description: 'Calculates hallucination and novelty scores.' }
      ]
    },
    aiEngineering: {
      models: [
        { name: 'GPT-OSS-120B', purpose: 'Core synthesis and analysis', optimization: 'OpenRouter Integration' },
        { name: 'all-MiniLM-L6-v2', purpose: 'Vector embeddings', optimization: 'HuggingFace Local Inference' },
        { name: 'FAISS', purpose: 'Vector store for RAG', optimization: 'In-memory semantic search' }
      ],
      mentions: [
        'Multi-agent orchestration via n8n',
        'Hybrid RAG (Local Vector + Web Search)',
        'Hallucination & Novelty metrics',
        'Vector similarity citation verification'
      ]
    },
    metrics: [
      { name: 'Hallucination Score', result: '>90% grounded' },
      { name: 'Novelty Score', result: '0.4-0.6 (Innovation Zone)' },
      { name: 'Citation Accuracy', result: '95% Verified' },
      { name: 'Synthesis Speed', result: '<3 mins per report' }
    ],
    innovations: [
      'Skeptic Agent: Real-time web-search validation of academic findings.',
      'Novelty Metric: Semantic distance calculation to quantify "innovation".',
      'Multi-Agent n8n Pipeline: Decoupled logic for research, synthesis, and validation.',
      'Integrated Writing Assistant: AI-powered tone and grammar refinement.'
    ],
    uiuxScreens: [
      { name: 'n8n Researcher Workflow', image: '/projects/Autonomous AI Research Assistant/Screenshot 2026-05-06 170909.png', layout: 'desktop' }
    ],
    skills: ['Python', 'FastAPI', 'n8n', 'RAG', 'Vector Databases', 'React', 'LLM Prompt Engineering', 'Agentic AI', 'HuggingFace', 'Docker'],
    challenges: [
      'Vector similarity for quote verification: Implementing strict L2 distance thresholds.',
      'Agentic Loop Stability: Ensuring n8n workflows handle rate limits and API failures.',
      'Complex Synthesis: Crafting prompts for cross-domain gap discovery.'
    ],
    futureImprovements: [
      'Vision Transformers for figure analysis',
      'Multimodal synthesis (PDF + Video)',
      'Collaborative research workspaces',
      'Automated citation formatting (BibTeX)'
    ]
  },
  {
    id: '7',
    title: 'Autonomous AI Software Engineer',
    type: 'Agentic AI & LangGraph Project',
    oneLineImpact: 'Transforming natural language descriptions into complete, debugged, and tested production codebases autonomously.',
    description: 'An end-to-end agentic software development system that leverages LangGraph to orchestrate a team of specialized AI agents. From high-level planning and architecture design to per-file code generation, automated debugging, and unit test creation, the system handles the entire SDLC autonomously.',
    tags: ['AI', 'Agentic AI', 'LangGraph', 'LangChain', 'Python', 'Streamlit', 'OpenRouter', 'Software Engineering', 'Autonomous Agents'],
    link: 'https://github.com/AJAjith0503/AI_coding_assistant',
    liveLink: '#',
    problemStatement: {
      text: 'Developing complex software from scratch requires significant time for planning, boilerplate generation, and debugging. Developers often spend hours on repetitive setup tasks rather than high-level architecture.',
      stats: [
        'Developers spend 30% of their time on boilerplate and setup.',
        'Automated code generation can reduce time-to-market by 50%.'
      ]
    },
    motivation: [
      'Automate the full software development lifecycle.',
      'Implement state-of-the-art agent orchestration using LangGraph.',
      'Enable one-shot creation of functional project ZIPs.',
      'Build a self-healing system with integrated debuggers and reviewers.'
    ],
    architecture: {
      modules: [
        { name: 'LangGraph Orchestrator', description: 'State-managed workflow governing agent transitions and loops.' },
        { name: 'Architect Agent', description: 'Generates JSON-based folder structures and file trees.' },
        { name: 'Coding Team', description: 'A cyclical group of Generator, Debugger, and Reviewer agents.' },
        { name: 'QA Agent', description: 'Automatically generates Pytest/Jest suites for the codebase.' }
      ]
    },
    aiEngineering: {
      models: [
        { name: 'GPT-4o / Claude 3.5 Sonnet', purpose: 'Primary reasoning and code generation', optimization: 'Dynamic model switching' },
        { name: 'LangGraph State', purpose: 'Maintaining context across agents', optimization: 'TypedDict state management' }
      ],
      mentions: [
        'Cyclical agent loops (Generate -> Debug -> Review)',
        'Strict JSON schema enforcement for architecture',
        'Context-aware per-file code synthesis',
        'Autonomous unit test verification'
      ]
    },
    metrics: [
      { name: 'Generation Speed', result: '<2 mins for 5-file project' },
      { name: 'Code Coverage', result: '>80% Auto-generated Tests' },
      { name: 'Success Rate', result: '90% Runnable Code' }
    ],
    innovations: [
      'LangGraph DAG: A robust graph-based approach to agent orchestration.',
      'Self-Healing Loop: Integrated debugger that iterates until code is syntactically correct.',
      'Multi-Model Support: Allows users to swap between top-tier LLMs via OpenRouter.',
      'Flattened Extraction: Efficiently handles complex directory structures as linear tasks.'
    ],
    skills: ['Python', 'LangGraph', 'LangChain', 'Streamlit', 'LLM Architectures', 'Agentic Workflows', 'Software Architecture', 'TDD', 'JSON Schema'],
    challenges: [
      'State Management: Maintaining a consistent global state across multiple agents in a complex graph.',
      'Token Efficiency: Optimizing context windows when generating multiple large files.',
      'Parsing Reliability: Handling non-deterministic LLM outputs to ensure valid folder structures.'
    ],
    futureImprovements: [
      'Git integration for automatic PR generation',
      'Real-time collaborative editing with the agents',
      'Support for local LLMs via Ollama',
      'Automatic cloud deployment (Vercel/Heroku)'
    ]
  },
  {
    id: '8',
    title: 'Autonomous Self-Healing IDE',
    type: 'Developer Tools & Agentic AI',
    oneLineImpact: 'Building a VS Code extension that autonomously plans, executes, and self-corrects code through a multi-agent reasoning loop.',
    description: 'A sophisticated VS Code extension that transforms the editor into an autonomous agent. It utilizes a hierarchical multi-agent system (Planner, Executor, Debugger) to resolve complex coding tasks. The core innovation is its self-healing loop: when execution fails (e.g., syntax errors or test failures), the Debugger agent analyzes the trace, proposes a fix, and triggers the Executor to apply the correction in real-time.',
    tags: ['VS Code Extension', 'TypeScript', 'Agentic AI', 'Self-Healing Systems', 'Node.js', 'LLM Agents', 'Automation', 'Developer Experience (DX)'],
    link: 'https://github.com/AJAjith0503/ai-ide-extension',
    liveLink: '#',
    problemStatement: {
      text: 'Modern AI coding assistants often require constant human intervention to fix small errors or handle multi-file context. Developers spend significant time "babysitting" AI outputs.',
      stats: [
        'Over 40% of AI-generated code snippets require manual syntax fixes.',
        'Context switching between editor and LLM chat reduces developer flow.'
      ]
    },
    motivation: [
      'Eliminate manual debugging of AI-generated code.',
      'Create a seamless, editor-integrated autonomous agent.',
      'Implement "Self-Healing" capabilities for automated error resolution.',
      'Build a robust hierarchical agent architecture for coding.'
    ],
    architecture: {
      modules: [
        { name: 'Planner Agent', description: 'Decomposes high-level requirements into atomic, executable steps.' },
        { name: 'Executor Agent', description: 'Interacts with the VS Code FileSystem API to read/write code.' },
        { name: 'Self-Healing Debugger', description: 'Monitors execution output and automatically fixes runtime/syntax errors.' },
        { name: 'Context Manager', description: 'Efficiently retrieves relevant files and symbols to minimize token usage.' }
      ]
    },
    aiEngineering: {
      models: [
        { name: 'Claude 3.5 Sonnet / GPT-4o', purpose: 'High-fidelity reasoning and debugging', optimization: 'Zero-shot prompting with error-trace context' }
      ],
      mentions: [
        'Hierarchical agentic architecture',
        'Autonomous error-trace analysis',
        'Real-time VS Code API integration',
        'Self-correcting code loops'
      ]
    },
    metrics: [
      { name: 'Self-Correction Rate', result: '85% Success on 1st retry' },
      { name: 'Task Completion', result: 'Autonomous across 3+ files' },
      { name: 'Context Latency', result: '<200ms symbol retrieval' }
    ],
    innovations: [
      'Self-Healing Loop: An automated cycle that fixes its own mistakes without human prompts.',
      'Hierarchical Task Decomposition: Breaking down "Add Auth" into specific filesystem and dependency tasks.',
      'Editor-Native Execution: Agents have direct access to the VS Code terminal and filesystem for true autonomy.',
      'Spatial Context Awareness: Using project mapping to understand cross-file dependencies.'
    ],
    skills: ['TypeScript', 'VS Code API', 'Node.js', 'Agentic Workflows', 'Prompt Engineering', 'Self-Healing Logic', 'Recursive Debugging', 'Asynchronous Systems'],
    challenges: [
      'Infinite Debugging Loops: Implementing deterministic convergence checks to prevent agents from looping on the same error.',
      'API Constraints: Handling VS Code filesystem locks and concurrent file access safely.',
      'Prompt Fidelity: Ensuring the Debugger receives enough trace context without exceeding token limits.'
    ],
    futureImprovements: [
      'Integration with external CI/CD logs',
      'Collaborative "Human-in-the-loop" approval gates',
      'Support for legacy codebase refactoring agents',
      'Direct integration with cloud IDEs (GitHub Codespaces)'
    ]
  },
  {
    id: '9',
    title: 'Sri Vishnu Park',
    type: 'Premium Restaurant Web Experience',
    oneLineImpact: 'A premium, animated React web app for a heritage vegetarian restaurant in Bengaluru.',
    description: 'A high-fidelity, interactive web application designed for a heritage vegetarian restaurant in Bengaluru. The platform blends traditional authenticity with modern web aesthetics, offering a seamless digital dining experience. It features a fully functional online menu, interactive cart system, and an immersive user interface driven by fluid animations.',
    tags: ['React.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    link: 'https://github.com/AJAjith0503/restaurant.git',
    liveLink: 'https://restaurant-seven-jade.vercel.app/',
    problemStatement: {
      text: 'Creating a seamless digital dining experience that blends traditional authenticity with modern web aesthetics for a heritage vegetarian restaurant in Bengaluru.',
      stats: [
        'Requires an immersive UI to reflect the heritage and quality of the brand.',
        'Needs a fully functional online menu and interactive cart system.'
      ]
    },
    motivation: [
      'Showcase premium brand aesthetics with a sophisticated color palette (Deep Espresso #3A2F2F and Antique Gold #C5A46E).',
      'Provide a 100% mobile-responsive architecture.',
      'Enhance user engagement via fluid animations and interactive UI elements.'
    ],
    architecture: {
      modules: [
        { name: 'Interactive Shopping Cart', description: 'Fully reactive slide-out cart for seamless adding of items, quantity adjustment, and mock checkout.' },
        { name: 'Immersive Animations', description: 'Framer Motion for custom animated preloader, scroll-triggered reveals, and dynamic progress bar.' },
        { name: 'Custom UI/UX Elements', description: 'Magnetic cursor, interactive star-rating guestbook, and elegant image lightbox for the digital gallery.' },
        { name: 'Responsive Design', description: 'Custom mobile navigation drawer and optimized fluid typography that adapts perfectly to any screen size.' }
      ]
    },
    innovations: [
      'Complex State Management: Managed global UI states seamlessly using React Hooks for the shopping cart, checkout modals, and dynamic user reviews.',
      'Performance Optimization: Built with Vite ensuring heavy animations and video backgrounds load smoothly without degrading performance.',
      'Robust Error Handling: Integrated a React Error Boundary component to gracefully handle unexpected application crashes.'
    ],
    uiuxScreens: [
      { name: 'Hero Section', image: '/projects/Sri vishnu park/hero.jpeg', layout: 'mobile' },
      { name: 'Navigation Menu', image: '/projects/Sri vishnu park/navbar.jpeg', layout: 'mobile' },
      { name: 'Interactive Cart', image: '/projects/Sri vishnu park/cart.jpeg', layout: 'mobile' },
      { name: 'Menu Items', image: '/projects/Sri vishnu park/items.jpeg', layout: 'mobile' },
      { name: 'Customer Ratings', image: '/projects/Sri vishnu park/rating.jpeg', layout: 'mobile' },
      { name: 'Footer Design', image: '/projects/Sri vishnu park/foorter.jpeg', layout: 'mobile' }
    ],
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'State Management', 'Vite'],
    challenges: [
      'Complex State Management across shopping cart and dynamic user reviews.',
      'Performance Optimization for heavy animations and video backgrounds.',
      'Ensuring 100% mobile-responsive architecture with fluid typography.'
    ]
  },
  {
    id: '10',
    title: 'Furnexa',
    type: 'Premium E-Commerce Furniture Storefront',
    oneLineImpact: 'Developed a premium, highly responsive Single-Page React storefront for a luxury furniture e-commerce startup.',
    description: 'A high-fidelity, interactive Single-Page Application (SPA) e-commerce storefront designed for luxury furniture retailers. Developed with modern web tools to deliver performance, aesthetics, and premium responsiveness.',
    tags: ['React 19', 'TypeScript', 'React Router', 'Vanilla CSS3', 'Framer Motion', 'Vite', 'Lucide React'],
    link: 'https://github.com/AJAjith0503/ecommercefurniture',
    liveLink: 'https://ecommercefurniture-steel.vercel.app/',
    problemStatement: {
      text: 'Transitioning a high-end luxury furniture storefront to a dynamic SPA introduces challenges in scroll preservation, layout stability (Cumulative Layout Shift) from high-resolution imagery, and maintaining pixel-perfect responsiveness without losing luxury aesthetic immersion.',
      stats: [
        'Traditional multi-page reloads break user immersion and slow down conversions.',
        'Heavy high-res imagery leads to Cumulative Layout Shift (CLS) on slow mobile connections.'
      ]
    },
    motivation: [
      'Deliver instant routing transition times (0ms) to maximize customer session flow.',
      'Craft a highly visual, zero-CLS luxury product showcase that loads fast even on mobile edge networks.',
      'Reflow multi-column headers and stack hero elements elegantly across all device sizes.'
    ],
    architecture: {
      modules: [
        { name: 'SPA Routing Engine', description: 'Single-Page navigation via React Router to eliminate slow full-page reloads and enable instant transition times.' },
        { name: 'Fluid Design System', description: 'Modern responsive architecture utilizing clamp() fluid typography and custom Design Tokens.' },
        { name: 'Framer-Motion Interactions', description: 'Scroll-triggered reveals, spring-based hover micro-animations, and slide-in drawer menus.' },
        { name: 'Scroll Management Hook', description: 'Dedicated programmatic ScrollToTop context reset to snap viewport to (0,0) on route transition.' }
      ]
    },
    metrics: [
      { name: 'SPA Transition Latency', result: '0ms' },
      { name: 'Cumulative Layout Shift', result: 'Zero CLS' },
      { name: 'Production Build Compilation', result: '<400ms' }
    ],
    innovations: [
      'ScrollToTop Restoration: Built a programmatic restoration hook that monitors location history to automatically snap the window viewport back to (0,0).',
      'Aspect-Ratio Image Skeleton: Created strict aspect-ratio container tokens combined with loading skeletons to achieve zero layout shifting.',
      'Dynamic Reflow Containers: Standards-driven Flex and Grid query adjustments that dynamically stack components cleanly down to 320px.'
    ],
    skills: ['React 19', 'TypeScript', 'React Router', 'Vanilla CSS', 'Framer Motion', 'Vite', 'Responsive Design', 'Web Performance'],
    challenges: [
      'Programmatic Scroll Management across active SPA route changes.',
      'Image Optimization and wrapper layout bounds to eliminate layout shifting (CLS).',
      'Handcrafting 100% responsive fluid grids and stackable layout structures without external frameworks like Tailwind.'
    ]
  }
];
