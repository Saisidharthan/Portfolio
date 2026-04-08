export const ASCII_BANNER = `
\x1b[cyan] ███████╗ █████╗ ██╗    ███████╗██╗██████╗ ██╗  ██╗ █████╗ ██████╗ ████████╗██╗  ██╗ █████╗ ███╗   ██╗
\x1b[cyan] ██╔════╝██╔══██╗██║    ██╔════╝██║██╔══██╗██║  ██║██╔══██╗██╔══██╗╚══██╔══╝██║  ██║██╔══██╗████╗  ██║
\x1b[green] ███████╗███████║██║    ███████╗██║██║  ██║███████║███████║██████╔╝   ██║   ███████║███████║██╔██╗ ██║
\x1b[green] ╚════██║██╔══██║██║    ╚════██║██║██║  ██║██╔══██║██╔══██║██╔══██╗   ██║   ██╔══██║██╔══██║██║╚██╗██║
\x1b[cyan] ███████║██║  ██║██║    ███████║██║██████╔╝██║  ██║██║  ██║██║  ██║   ██║   ██║  ██║██║  ██║██║ ╚████║
\x1b[dim] ╚══════╝╚═╝  ╚═╝╚═╝    ╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ ╚═══╝
`;

export const WELCOME_MESSAGE = `\x1b[dim]────────────────────────────────────────────────────────────────────────────────
\x1b[green]  Welcome to Sai Sidharthan's Portfolio Server v2.0.26
\x1b[dim]  Last login: just now from visitor@internet
\x1b[dim]────────────────────────────────────────────────────────────────────────────────
\x1b[white]  Type \x1b[yellow]help\x1b[white] to see available commands, or \x1b[yellow]neofetch\x1b[white] for a quick overview.
`;

export const NEOFETCH_ART = `\x1b[cyan]        ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄        \x1b[white]sai@portfolio
\x1b[cyan]      ▄█████████████████▄      \x1b[dim]─────────────────
\x1b[cyan]    ▄███████████████████████▄    \x1b[yellow]OS: \x1b[white]Portfolio Linux x86_64
\x1b[cyan]   ████████████████████████████   \x1b[yellow]Host: \x1b[white]Sai Sidharthan H
\x1b[cyan]  ██████████████████████████████  \x1b[yellow]Kernel: \x1b[white]BE CSE — SKCET Graduate
\x1b[cyan]  ██████████████████████████████  \x1b[yellow]Uptime: \x1b[white]3+ years in development
\x1b[green]  ██████████████████████████████  \x1b[yellow]Shell: \x1b[white]fullstack-dev v2.0
\x1b[green]  ██████████████████████████████  \x1b[yellow]Terminal: \x1b[white]portfolio-term
\x1b[green]  ██████████████████████████████  \x1b[yellow]CPU: \x1b[white]Python | TypeScript | Java | C++
\x1b[green]  ██████████████████████████████  \x1b[yellow]GPU: \x1b[white]React | Next.js | FastAPI | Django
\x1b[purple]   ████████████████████████████   \x1b[yellow]Memory: \x1b[white]34 repos / ∞ ideas
\x1b[purple]    ▀███████████████████████▀    \x1b[yellow]Disk: \x1b[white]GenAI | LLMs | LangChain | NLP
\x1b[purple]      ▀█████████████████▀      \x1b[yellow]Location: \x1b[white]Coimbatore, Tamil Nadu
\x1b[purple]        ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
\x1b[dim]                                  \x1b[red]███\x1b[orange]███\x1b[yellow]███\x1b[green]███\x1b[cyan]███\x1b[purple]███\x1b[pink]███\x1b[white]███`;

export interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  category: 'ai' | 'web' | 'client' | 'tool';
  status: 'completed' | 'active' | 'archived';
}

export const PROJECTS: Record<string, Project> = {
  'social-media-agent': {
    name: 'Social Media Agent',
    description: 'Social media intelligence platform for creators and marketing agencies. Scrapes 25+ platforms with AI-powered analysis and animated 3D visualization dashboard.',
    tech: ['Python', 'FastAPI', 'Next.js', 'Three.js', 'D3.js'],
    github: 'https://github.com/Saisidharthan/social-media-agent',
    category: 'ai',
    status: 'active',
  },
  'jobfit-ai': {
    name: 'JobFit AI',
    description: 'Personalized resume insights and job matching algorithms for seekers; efficient resume screening and candidate ranking for recruiters using GenAI.',
    tech: ['Streamlit', 'GPT-4o', 'LangChain', 'Deeplake', 'SQLite3'],
    github: 'https://github.com/Saisidharthan/JobFit-AI',
    category: 'ai',
    status: 'completed',
  },
  'skin-cancer-detection': {
    name: 'Skin Cancer Detection',
    description: 'AI-powered skin cancer detection system using computer vision and deep learning for early diagnosis assistance.',
    tech: ['Python', 'TensorFlow', 'Computer Vision', 'HTML'],
    github: 'https://github.com/Saisidharthan/Skin-Cancer-Detection-',
    category: 'ai',
    status: 'completed',
  },
  'mcp': {
    name: 'MCP',
    description: 'Model Context Protocol implementation — building custom MCP servers for AI tool integrations.',
    tech: ['Python', 'MCP SDK'],
    github: 'https://github.com/Saisidharthan/MCP',
    category: 'ai',
    status: 'completed',
  },
  'safewatchai': {
    name: 'SafeWatch AI',
    description: 'AI safety monitoring tool for content moderation and threat detection.',
    tech: ['Python', 'AI/ML', 'NLP'],
    github: 'https://github.com/Saisidharthan/SafeWatchAI',
    category: 'ai',
    status: 'completed',
  },
  'complan-ai': {
    name: 'Complan AI',
    description: 'AI-powered planning and analysis platform leveraging large language models.',
    tech: ['Python', 'LLM', 'GenAI'],
    github: 'https://github.com/Saisidharthan/Complan-AI-',
    category: 'ai',
    status: 'completed',
  },
  'sentiment-analysis': {
    name: 'Sentiment Analysis',
    description: 'Sentiment analysis system to detect and quantify hate speech content in video using NLP techniques.',
    tech: ['Python', 'NLP', 'Machine Learning'],
    github: 'https://github.com/Saisidharthan/Sentiment-Analysis',
    category: 'ai',
    status: 'completed',
  },
  'vendor-compare': {
    name: 'Vendor Compare',
    description: 'Vendor comparison tool powered by a fine-tuned LLM for intelligent procurement decisions.',
    tech: ['Python', 'Fine-tuned LLM', 'NLP'],
    github: 'https://github.com/Saisidharthan/vendor_compare',
    category: 'ai',
    status: 'completed',
  },
  'website-chat': {
    name: 'Website Chat',
    description: 'LangChain-powered conversational AI agent that can chat about any website content.',
    tech: ['Python', 'LangChain', 'LLM'],
    github: 'https://github.com/Saisidharthan/Website_Chat',
    category: 'ai',
    status: 'completed',
  },
  'blog-summarizer': {
    name: 'Blog Summarizer',
    description: 'Tool for automatically summarizing scientific articles and blog posts using NLP.',
    tech: ['Python', 'NLP', 'Summarization'],
    github: 'https://github.com/Saisidharthan/Blog-Summarizer',
    category: 'ai',
    status: 'completed',
  },
  'text-image-bot': {
    name: 'Text Image Bot',
    description: 'Text-to-image generation bot using generative AI models.',
    tech: ['Python', 'GenAI', 'Image Generation'],
    github: 'https://github.com/Saisidharthan/Text-Image-Bot',
    category: 'ai',
    status: 'completed',
  },
  'finetuning': {
    name: 'FineTuning',
    description: 'LLM fine-tuning experiments and journey — exploring transfer learning and domain adaptation.',
    tech: ['Python', 'LLM', 'Transfer Learning'],
    github: 'https://github.com/Saisidharthan/FineTuning',
    category: 'ai',
    status: 'completed',
  },
  'vidhi-vicharam': {
    name: 'Vidhi Vicharam',
    description: 'Full Django web application identifying laws and recommending them using AI/ML. Intelligent legal advisory system.',
    tech: ['Django', 'Python', 'GenAI', 'SQLite3', 'Bootstrap'],
    github: 'https://github.com/Saisidharthan/LawAdvisor',
    category: 'ai',
    status: 'completed',
  },
  'savicreations': {
    name: 'SaviCreations',
    description: 'Client project — full-stack TypeScript web application.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    github: 'https://github.com/Saisidharthan/SaviCreations',
    category: 'client',
    status: 'completed',
  },
  'sareedrapes': {
    name: 'SareeDrapes',
    description: 'Client project — e-commerce/catalog web application for saree draping services.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    github: 'https://github.com/Saisidharthan/SareeDrapes',
    category: 'client',
    status: 'completed',
  },
  'petrol-head': {
    name: 'Petrol Head',
    description: 'Next.js 14 application integrating GraphQL and Clerk for secure user authentication, featuring a dynamic car rental interface with HyGraph CMS.',
    tech: ['Next.js', 'React', 'TypeScript', 'GraphQL', 'HyGraph', 'Clerk'],
    github: 'https://github.com/Saisidharthan/Car-Rental',
    category: 'web',
    status: 'completed',
  },
  'spotify-clone': {
    name: 'Spotify Clone',
    description: 'React app integrating Spotify API with dynamic track/playlist display, seamless playback controls, and token management.',
    tech: ['Next.js', 'TypeScript', 'Spotify API', 'Tailwind CSS', 'Axios'],
    github: 'https://github.com/Saisidharthan/Spotify-Clone',
    category: 'web',
    status: 'completed',
  },
  'mobile-recharge': {
    name: 'Mobile Recharge (Mario)',
    description: 'Mobile recharge platform for easy top-ups and plan management.',
    tech: ['JavaScript', 'React'],
    github: 'https://github.com/Saisidharthan/Mario',
    category: 'web',
    status: 'completed',
  },
};

export const SKILLS = {
  languages: {
    label: 'Languages',
    icon: '⚡',
    items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'HTML/CSS', 'SQL'],
  },
  frameworks: {
    label: 'Frameworks',
    icon: '🔧',
    items: ['React', 'Next.js', 'FastAPI', 'Django', 'Spring Boot', 'Node.js', 'Tailwind CSS'],
  },
  ai_ml: {
    label: 'AI / ML',
    icon: '🧠',
    items: ['LangChain', 'GPT-4o', 'LLM Fine-tuning', 'NLP', 'Computer Vision', 'GenAI', 'TensorFlow', 'Streamlit'],
  },
  databases: {
    label: 'Databases',
    icon: '💾',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Redis', 'Deeplake'],
  },
  tools: {
    label: 'Tools & Infra',
    icon: '🛠',
    items: ['Docker', 'Git', 'Linux', 'AWS', 'GraphQL', 'REST APIs', 'MCP', 'Vite'],
  },
};

export const COMMANDS_HELP = [
  { cmd: 'help', desc: 'Show this help message' },
  { cmd: 'whoami', desc: 'Display user profile information' },
  { cmd: 'neofetch', desc: 'System info with ASCII art' },
  { cmd: 'skills', desc: 'List technical skills by category' },
  { cmd: 'projects', desc: 'List all projects' },
  { cmd: 'projects --ai', desc: 'Filter AI/ML projects' },
  { cmd: 'projects --web', desc: 'Filter web projects' },
  { cmd: 'projects --client', desc: 'Filter client projects' },
  { cmd: 'project <name>', desc: 'Show details of a specific project' },
  { cmd: 'open <name>', desc: 'Open project/link in browser (github, linkedin, etc.)' },
  { cmd: 'education', desc: 'Show education background' },
  { cmd: 'experience', desc: 'Show work experience' },
  { cmd: 'contact', desc: 'Show contact information & links' },
  { cmd: 'resume', desc: 'Open resume in a new tab' },
  { cmd: 'history', desc: 'Show command history' },
  { cmd: 'clear', desc: 'Clear the terminal' },
];

export const ALL_COMMANDS = [
  'help', 'whoami', 'neofetch', 'skills', 'projects', 'project', 'open', 'resume',
  'education', 'experience', 'contact', 'ls', 'cat', 'history',
  'clear', 'theme', 'date', 'uname', 'sudo', 'rm', 'exit',
  'pwd', 'echo', 'man', 'wget', 'curl', 'ping', 'ssh', 'cd',
];

export const THEMES: Record<string, Record<string, string>> = {
  dracula: {
    '--bg-primary': '#282a36',
    '--bg-secondary': '#1a1a2e',
    '--bg-titlebar': '#44475a',
    '--text-primary': '#f8f8f2',
    '--text-green': '#50fa7b',
    '--text-cyan': '#8be9fd',
    '--text-yellow': '#f1fa8c',
    '--text-pink': '#ff79c6',
    '--text-purple': '#bd93f9',
    '--cursor-color': '#50fa7b',
  },
  matrix: {
    '--bg-primary': '#000000',
    '--bg-secondary': '#001100',
    '--bg-titlebar': '#003300',
    '--text-primary': '#00ff00',
    '--text-green': '#00ff00',
    '--text-cyan': '#00cc00',
    '--text-yellow': '#33ff33',
    '--text-pink': '#66ff66',
    '--text-purple': '#00ff66',
    '--cursor-color': '#00ff00',
  },
  ubuntu: {
    '--bg-primary': '#300a24',
    '--bg-secondary': '#2c001e',
    '--bg-titlebar': '#5c3566',
    '--text-primary': '#eeeeec',
    '--text-green': '#4e9a06',
    '--text-cyan': '#06989a',
    '--text-yellow': '#c4a000',
    '--text-pink': '#ad7fa8',
    '--text-purple': '#75507b',
    '--cursor-color': '#eeeeec',
  },
  nord: {
    '--bg-primary': '#2e3440',
    '--bg-secondary': '#3b4252',
    '--bg-titlebar': '#434c5e',
    '--text-primary': '#d8dee9',
    '--text-green': '#a3be8c',
    '--text-cyan': '#88c0d0',
    '--text-yellow': '#ebcb8b',
    '--text-pink': '#b48ead',
    '--text-purple': '#b48ead',
    '--cursor-color': '#d8dee9',
  },
};
