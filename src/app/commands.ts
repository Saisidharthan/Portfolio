import {
  ASCII_BANNER,
  NEOFETCH_ART,
  PROJECTS,
  SKILLS,
  COMMANDS_HELP,
  THEMES,
  type Project,
} from './data';

export interface ExperienceCard {
  text: string;
  image?: string;
  imageAlt?: string;
}

export interface CommandResult {
  output: string;
  clear?: boolean;
  theme?: Record<string, string>;
  openUrl?: string;
  experienceCards?: ExperienceCard[];
  startDemo?: boolean;
}

export function processCommand(
  input: string,
  history: string[],
  visitorCount?: number | null
): CommandResult {
  const trimmed = input.trim();
  const [cmd, ...args] = trimmed.split(/\s+/);
  const command = cmd?.toLowerCase() || '';

  switch (command) {
    case 'help':
      return { output: formatHelp() };
    case 'whoami':
      return { output: formatWhoami() };
    case 'neofetch':
      return { output: NEOFETCH_ART };
    case 'skills':
      return { output: formatSkills() };
    case 'projects':
      return { output: formatProjects(args[0]) };
    case 'project':
      return { output: formatProjectDetail(args.join(' ')) };
    case 'open':
      return handleOpen(args.join(' '));
    case 'education':
      return { output: formatEducation() };
    case 'experience':
      return formatExperience();
    case 'timeline':
      return { output: formatTimeline() };
    case 'contact':
      return { output: formatContact() };
    case 'resume':
      return {
        output: `\x1b[green]Opening resume...\x1b[dim]\n  → Your resume is opening in a new tab.`,
        openUrl: 'https://drive.google.com/file/d/1pxvg01mAy5Bil_fcBixXNR_z5z_rLlLy/view?usp=sharing',
      };
    case 'ls':
      return { output: formatLs(args[0]) };
    case 'cat':
      return { output: formatCat(args.join(' ')) };
    case 'history':
      return { output: formatHistory(history) };
    case 'clear':
      return { output: '', clear: true };
    case 'visitor':
      return { output: formatVisitor(visitorCount) };
    case 'theme':
      return handleTheme(args[0]);
    case 'date':
      return { output: `\x1b[white]${new Date().toString()}` };
    case 'uname':
      return {
        output:
          '\x1b[white]PortfolioOS 2.0.26 SaiSidharthan-x86_64 GNU/Linux — Backend Developer Edition',
      };
    case 'pwd':
      return { output: '\x1b[green]/home/sai/portfolio' };
    case 'echo':
      return { output: `\x1b[white]${args.join(' ')}` };
    case 'demo':
      return { output: '\x1b[green]Starting demo mode...\x1b[dim]\n  Sit back and watch. Press any key to exit.', startDemo: true };
    case 'sudo':
      return handleSudo(args);
    case 'rm':
      return handleRm(args);
    case 'exit':
      return {
        output: `\x1b[yellow]logout
\x1b[dim]Connection to sai-portfolio closed.
\x1b[green]Thanks for visiting! Come back anytime.
\x1b[cyan]→ \x1b[link]https://github.com/Saisidharthan\x1b[/link]`,
      };
    case 'cd':
      return {
        output: '\x1b[dim]This is a web terminal. There\'s nowhere to go but \x1b[green]here\x1b[dim]. Try \x1b[yellow]ls\x1b[dim] instead.',
      };
    case 'man':
      return {
        output: args[0]
          ? `\x1b[cyan]No manual entry for ${args[0]}.\x1b[dim] But try \x1b[yellow]help\x1b[dim] — it's better.`
          : '\x1b[dim]What manual page do you want? Try \x1b[yellow]help\x1b[dim].',
      };
    case 'wget':
    case 'curl':
      return {
        output: `\x1b[red]403 Forbidden\x1b[dim] — Nice try. My data isn't that easy to scrape 😏\x1b[dim]\nTry \x1b[yellow]contact\x1b[dim] instead.`,
      };
    case 'ping':
      return {
        output: `\x1b[white]PING sai-portfolio (127.0.0.1): 56 data bytes
\x1b[green]64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms
\x1b[green]64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms
\x1b[green]64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041 ms
\x1b[dim]--- sai-portfolio ping statistics ---
\x1b[white]3 packets transmitted, 3 received, 0% packet loss`,
      };
    case 'ssh':
      return {
        output:
          '\x1b[green]You\'re already connected! \x1b[dim]Welcome to sai@portfolio.',
      };
    case '':
      return { output: '' };
    default:
      return {
        output: `\x1b[red]command not found: ${command}\x1b[dim]\nType \x1b[yellow]help\x1b[dim] to see available commands.`,
      };
  }
}

function formatHelp(): string {
  const maxLen = Math.max(...COMMANDS_HELP.map((c) => c.cmd.length));
  const lines = COMMANDS_HELP.map(
    (c) =>
      `  \x1b[green]${c.cmd.padEnd(maxLen + 2)}\x1b[dim]${c.desc}`
  );
  return `\x1b[cyan]╭─ Available Commands ─────────────────────────────────────╮
\x1b[cyan]│\x1b[white]                                                          \x1b[cyan]│
${lines.map((l) => `\x1b[cyan]│\x1b[white] ${l.padEnd(70)}\x1b[cyan]│`).join('\n')}
\x1b[cyan]│\x1b[white]                                                          \x1b[cyan]│
\x1b[cyan]╰──────────────────────────────────────────────────────────╯
\x1b[dim]  Tip: Use ↑↓ to navigate history, Tab for autocomplete`;
}

function formatWhoami(): string {
  return `
\x1b[cyan]┌──────────────────────────────────────────────────────────┐
\x1b[cyan]│  \x1b[green]██ \x1b[white]Sai Sidharthan H                                    \x1b[cyan]│
\x1b[cyan]│  \x1b[dim]   SDE @ Riverline AI | Co-Founder @ Synergeek           \x1b[cyan]│
\x1b[cyan]├──────────────────────────────────────────────────────────┤
\x1b[cyan]│                                                          │
\x1b[cyan]│  \x1b[yellow]Role      \x1b[white]Full Stack Developer & AI Engineer            \x1b[cyan]│
\x1b[cyan]│  \x1b[yellow]Focus     \x1b[white]GenAI, LLMs, LangChain, Full-Stack Apps       \x1b[cyan]│
\x1b[cyan]│  \x1b[yellow]Stack     \x1b[white]Python · TypeScript · React · Next.js         \x1b[cyan]│
\x1b[cyan]│  \x1b[yellow]Location  \x1b[white]Coimbatore, Tamil Nadu, India                 \x1b[cyan]│
\x1b[cyan]│                                                          │
\x1b[cyan]│  \x1b[dim]Type \x1b[yellow]experience\x1b[dim] to see full work history               \x1b[cyan]│
\x1b[cyan]│                                                          │
\x1b[cyan]│  \x1b[dim]"Building intelligent systems that solve real problems"  \x1b[cyan]│
\x1b[cyan]│                                                          │
\x1b[cyan]└──────────────────────────────────────────────────────────┘`;
}

function formatSkills(): string {
  const sections = Object.values(SKILLS)
    .map((cat) => {
      const items = cat.items
        .map((item) => `\x1b[white]${item}`)
        .join('\x1b[dim] · ');
      return `  \x1b[yellow]${cat.icon} ${cat.label}\n  \x1b[dim]└─ ${items}`;
    })
    .join('\n\n');

  return `\x1b[cyan]─── Technical Arsenal ──────────────────────────────────────

${sections}

\x1b[dim]─── Proficiency ────────────────────────────────────────────
  \x1b[yellow]Python     \x1b[green]████████████████████░░░░ \x1b[white] 85%
  \x1b[yellow]GenAI/LLMs \x1b[green]████████████████████░░░░ \x1b[white] 80%
  \x1b[yellow]React      \x1b[green]██████████████████░░░░░░ \x1b[white] 75%
  \x1b[yellow]Next.js    \x1b[green]██████████████████░░░░░░ \x1b[white] 75%
  \x1b[yellow]TypeScript \x1b[green]██████████████████░░░░░░ \x1b[white] 75%
  \x1b[yellow]Django     \x1b[green]████████████████░░░░░░░░ \x1b[white] 70%
  \x1b[yellow]MongoDB    \x1b[green]████████████████░░░░░░░░ \x1b[white] 65%
  \x1b[yellow]Docker     \x1b[green]██████████████░░░░░░░░░░ \x1b[white] 60%`;
}

function formatProjects(filter?: string): string {
  let entries = Object.entries(PROJECTS);
  let filterLabel = 'All Projects';

  if (filter === '--ai') {
    entries = entries.filter(([, p]) => p.category === 'ai');
    filterLabel = 'AI/ML Projects';
  } else if (filter === '--web') {
    entries = entries.filter(([, p]) => p.category === 'web');
    filterLabel = 'Web Projects';
  } else if (filter === '--client') {
    entries = entries.filter(([, p]) => p.category === 'client');
    filterLabel = 'Client Projects';
  }

  const statusIcon = (s: string) =>
    s === 'active' ? '\x1b[green]●' : s === 'completed' ? '\x1b[cyan]✓' : '\x1b[dim]○';

  const categoryColor = (c: string) => {
    switch (c) {
      case 'ai': return '\x1b[purple]AI';
      case 'web': return '\x1b[cyan]WEB';
      case 'client': return '\x1b[orange]CLIENT';
      case 'tool': return '\x1b[yellow]TOOL';
      default: return c;
    }
  };

  const lines = entries
    .map(
      ([key, p]) => {
        const linkPart = p.github ? `\n  \x1b[dim]   → \x1b[link]${p.github}\x1b[/link]` : '';
        return `  ${statusIcon(p.status)} \x1b[green]${p.name}\x1b[white] ${categoryColor(p.category)}
  \x1b[dim]   ${p.description.length > 70 ? p.description.slice(0, 70) + '...' : p.description}
  \x1b[yellow]   ${p.tech.slice(0, 4).join(' · ')}${linkPart}`;
      }
    )
    .join('\n\n');

  return `\x1b[cyan]─── ${filterLabel} (${entries.length}) ──────────────────────────────────────

${lines}

\x1b[dim]──────────────────────────────────────────────────────────
  \x1b[dim]Use \x1b[yellow]project <name>\x1b[dim] for full details. \x1b[yellow]open <name>\x1b[dim] to visit GitHub.
  \x1b[dim]Filter: \x1b[yellow]--ai\x1b[dim], \x1b[yellow]--web\x1b[dim], \x1b[yellow]--client`;
}

function formatProjectDetail(name: string): string {
  if (!name) {
    return '\x1b[red]Usage: project <name>\x1b[dim]\nExample: \x1b[yellow]project social-media-agent';
  }

  const key = name.toLowerCase().replace(/\s+/g, '-');
  const project = PROJECTS[key];

  if (!project) {
    const suggestions = Object.keys(PROJECTS)
      .filter((k) => k.includes(key) || key.includes(k.split('-')[0]))
      .slice(0, 3);

    let msg = `\x1b[red]Project "${name}" not found.`;
    if (suggestions.length > 0) {
      msg += `\n\x1b[dim]Did you mean: ${suggestions.map((s) => `\x1b[yellow]${s}`).join('\x1b[dim], ')}`;
    }
    return msg;
  }

  const statusBadge =
    project.status === 'active'
      ? '\x1b[green]● ACTIVE'
      : project.status === 'completed'
        ? '\x1b[cyan]✓ COMPLETED'
        : '\x1b[dim]○ ARCHIVED';

  return `
\x1b[cyan]╔══════════════════════════════════════════════════════════╗
\x1b[cyan]║  \x1b[white]${project.name.padEnd(54)}\x1b[cyan]║
\x1b[cyan]╠══════════════════════════════════════════════════════════╣
\x1b[cyan]║                                                          ║
\x1b[cyan]║  \x1b[yellow]Status    \x1b[white]${statusBadge.padEnd(48)}\x1b[cyan]║
\x1b[cyan]║  \x1b[yellow]Category  \x1b[white]${project.category.toUpperCase().padEnd(44)}\x1b[cyan]║
\x1b[cyan]║  \x1b[yellow]Tech      \x1b[white]${project.tech.join(' · ').padEnd(44)}\x1b[cyan]║
\x1b[cyan]║                                                          ║
\x1b[cyan]║  \x1b[yellow]About                                                    \x1b[cyan]║
\x1b[cyan]║  \x1b[dim]${wrapText(project.description, 54).join(`\x1b[cyan]\n\x1b[cyan]║  \x1b[dim]`)}
\x1b[cyan]║                                                          ║${project.github ? `\n\x1b[cyan]║  \x1b[yellow]GitHub    \x1b[link]${project.github}\x1b[/link]\n\x1b[cyan]║                                                          ║` : ''}
\x1b[cyan]╚══════════════════════════════════════════════════════════╝`;
}

function wrapText(text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxWidth) {
      lines.push(current.trim());
      current = word;
    } else {
      current += ' ' + word;
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines;
}

function formatEducation(): string {
  return `
\x1b[cyan]─── Education ─────────────────────────────────────────────

  \x1b[green]🎓 Bachelor of Engineering — Computer Science & Engineering
  \x1b[dim]   Sri Krishna College of Engineering and Technology
  \x1b[dim]   Location: Coimbatore, Tamil Nadu, India
  \x1b[dim]   Status: \x1b[green]Graduated ✓
  \x1b[dim]   Focus: Full Stack Development, Generative AI, LLMs

\x1b[cyan]─── Expertise Areas ───────────────────────────────────────

  \x1b[yellow]▸ \x1b[white]Generative AI & LLMs           \x1b[dim]GPT-4o, LangChain, Deeplake
  \x1b[yellow]▸ \x1b[white]Full Stack Development          \x1b[dim]React, Next.js, Django, FastAPI
  \x1b[yellow]▸ \x1b[white]Cloud & DevOps                  \x1b[dim]AWS, Docker
  \x1b[yellow]▸ \x1b[white]Database Systems                \x1b[dim]MongoDB, MySQL, PostgreSQL, Redis
  \x1b[yellow]▸ \x1b[white]LLM Fine-tuning                \x1b[dim]Self-directed research
  \x1b[yellow]▸ \x1b[white]Software Testing                \x1b[dim]Completed course
  \x1b[yellow]▸ \x1b[white]DSA with C++                    \x1b[dim]Ongoing practice`;
}

function formatExperience(): CommandResult {
  const header = `\x1b[cyan]─── Work Experience ───────────────────────────────────────`;

  const cards: ExperienceCard[] = [
    {
      text: `  \x1b[green]● SDE — Riverline AI                          \x1b[dim]Current
  \x1b[dim]  ────────────────────────────────────────
  \x1b[white]  Spearheaded DevOps & InfoSec operations to achieve ISO
  \x1b[white]  and SOC2 certification. Managed and monitored cloud
  \x1b[white]  infrastructure, ensuring system security and compliance.
  \x1b[white]  Also contributed to core product implementation.
  \x1b[pink]  Learned:\x1b[dim] Cloud security, compliance frameworks, DevOps
  \x1b[yellow]  Stack:\x1b[white] AWS, DevOps, InfoSec, ISO/SOC2, Monitoring`,
    },
    {
      text: `  \x1b[green]● Co-Founder — Synergeek Technologies    \x1b[dim]1.7 yrs · Present
  \x1b[dim]  ────────────────────────────────────────
  \x1b[white]  Built the company from the ground up. Scaled operations,
  \x1b[white]  acquired clients, drove conversions, and managed the team.
  \x1b[white]  Hands-on with implementation across all client projects.
  \x1b[pink]  Learned:\x1b[dim] Startup ops, client acquisition, team leadership
  \x1b[yellow]  Stack:\x1b[white] Next.js, React, Python, AI/ML, Business Dev`,
    },
    {
      text: `  \x1b[green]● BSP Engineer — LG Soft India (LGSI)          \x1b[dim]8 months
  \x1b[dim]  ────────────────────────────────────────
  \x1b[white]  Built MCP integrations to connect TV boards with servers,
  \x1b[white]  enabling chat-based access to original LG TV boards.
  \x1b[white]  Bridged hardware and software through board support packages.
  \x1b[pink]  Learned:\x1b[dim] Embedded systems, BSP, hardware-software integration
  \x1b[yellow]  Stack:\x1b[white] MCP, Board Support Packages, Server Integration`,
    },
    {
      text: `  \x1b[green]● GenAI Engineer — GyanMatrix Technologies      \x1b[dim]4 months
  \x1b[dim]  ────────────────────────────────────────
  \x1b[white]  Developed a KYC (Know Your Customer) bot powered by
  \x1b[white]  Generative AI to automate customer identity verification
  \x1b[white]  and streamline onboarding workflows.
  \x1b[pink]  Learned:\x1b[dim] GenAI in production, KYC automation, LLM pipelines
  \x1b[yellow]  Stack:\x1b[white] Python, LangChain, GenAI, LLMs`,
    },
  ];

  const footer = `\n\x1b[dim]──────────────────────────────────────────────────────────
  \x1b[dim]Type \x1b[yellow]education\x1b[dim] to see my academic background.`;

  return {
    output: header + '\n\n' + footer,
    experienceCards: cards,
  };
}

function formatContact(): string {
  return `
\x1b[cyan]╭─ Contact ────────────────────────────────────────────────╮
\x1b[cyan]│                                                          │
\x1b[cyan]│  \x1b[yellow]Email     \x1b[white]saisidharthan17@gmail.com
\x1b[cyan]│  \x1b[yellow]Phone     \x1b[white]+91 9786763705
\x1b[cyan]│  \x1b[yellow]Location  \x1b[white]Coimbatore, Tamil Nadu, India - 641010
\x1b[cyan]│                                                          │
\x1b[cyan]│  \x1b[yellow]GitHub    \x1b[link]https://github.com/Saisidharthan\x1b[/link]
\x1b[cyan]│  \x1b[yellow]LinkedIn  \x1b[link]https://www.linkedin.com/in/saisidharthan/\x1b[/link]
\x1b[cyan]│                                                          │
\x1b[cyan]│  \x1b[dim]Open to collaborations, freelance work, and full-time   │
\x1b[cyan]│  \x1b[dim]opportunities. Let's build something amazing together.  │
\x1b[cyan]│                                                          │
\x1b[cyan]╰──────────────────────────────────────────────────────────╯`;
}

function formatLs(path?: string): string {
  if (!path || path === '~' || path === '.') {
    return `\x1b[cyan]drwxr-xr-x  about/
\x1b[cyan]drwxr-xr-x  projects/
\x1b[cyan]drwxr-xr-x  skills/
\x1b[cyan]drwxr-xr-x  contact/
\x1b[green]-rw-r--r--  about.txt
\x1b[green]-rw-r--r--  resume.txt
\x1b[green]-rw-r--r--  README.md`;
  }
  return `\x1b[red]ls: cannot access '${path}': Not a real filesystem.\x1b[dim] Try \x1b[yellow]ls\x1b[dim] without arguments.`;
}

function formatCat(file: string): string {
  switch (file?.toLowerCase()) {
    case 'about.txt':
      return `\x1b[white]Hi, I'm Sai Sidharthan H — a Full Stack Developer & AI Engineer.

\x1b[dim]CSE Graduate from SKCET, Coimbatore. Currently SDE at Riverline AI
\x1b[dim]and Co-Founder of Synergeek Technologies.

\x1b[dim]I'm passionate about crafting robust and scalable web applications.
\x1b[dim]With hands-on experience, I've honed my skills in front-end technologies
\x1b[dim]like \x1b[green]React\x1b[dim] and \x1b[green]Next.js\x1b[dim], as well as back-end technologies like \x1b[green]Node.js\x1b[dim],
\x1b[green]FastAPI\x1b[dim], \x1b[green]Django\x1b[dim], and databases like \x1b[green]MongoDB\x1b[dim], \x1b[green]MySQL\x1b[dim], and \x1b[green]PostgreSQL\x1b[dim].

\x1b[dim]My sweet spot is the intersection of \x1b[green]full-stack development\x1b[dim] and
\x1b[purple]Generative AI\x1b[dim] — building apps powered by \x1b[purple]LLMs\x1b[dim], \x1b[purple]LangChain\x1b[dim], and \x1b[purple]GPT-4o\x1b[dim].

\x1b[yellow]Languages:  \x1b[white]Python · TypeScript · Java · C++ · SQL
\x1b[yellow]Location:   \x1b[white]Coimbatore, Tamil Nadu, India
\x1b[yellow]Focus:      \x1b[white]GenAI · LLMs · Full-Stack Web · Cloud`;
    case 'resume.txt':
      return `\x1b[cyan]═══ RESUME ════════════════════════════════════════════════

\x1b[white]SAI SIDHARTHAN H
\x1b[dim]Full Stack Developer | AI Engineer
\x1b[dim]Coimbatore, Tamil Nadu, India | saisidharthan17@gmail.com

\x1b[yellow]EXPERIENCE
\x1b[white]  SDE               Riverline AI           DevOps, InfoSec, ISO/SOC2
\x1b[white]  Co-Founder        Synergeek Technologies 1.7 yrs · Scaling & clients
\x1b[white]  BSP Engineer      LG Soft India (LGSI)   8 mos · MCP & board integration
\x1b[white]  GenAI Engineer    GyanMatrix Technologies 4 mos · KYC bot with GenAI

\x1b[yellow]EDUCATION
\x1b[white]  BE CSE — Sri Krishna College of Engineering and Technology ✓

\x1b[yellow]SKILLS
\x1b[white]  Python, JavaScript, TypeScript, Java, C++, SQL
\x1b[white]  React, Next.js, FastAPI, Django, Node.js, Spring Boot
\x1b[white]  LangChain, GPT-4o, LLM Fine-tuning, NLP, Computer Vision
\x1b[white]  MongoDB, MySQL, PostgreSQL, Redis, Deeplake
\x1b[white]  Docker, AWS, Git, Linux, GraphQL, REST APIs

\x1b[yellow]NOTABLE PROJECTS
\x1b[green]  ▸ JobFit AI              \x1b[dim]GPT-4o + LangChain recruiting platform
\x1b[green]  ▸ Social Media Agent     \x1b[dim]25+ platform intelligence tool
\x1b[green]  ▸ Vidhi Vicharam         \x1b[dim]AI-powered legal advisory (Django)
\x1b[green]  ▸ Skin Cancer Detection  \x1b[dim]Computer vision diagnosis system
\x1b[green]  ▸ SafeWatch AI           \x1b[dim]Content moderation system
\x1b[green]  ▸ Petrol Head            \x1b[dim]Next.js + GraphQL car rental
\x1b[green]  ▸ Spotify Clone          \x1b[dim]Full Spotify API integration
\x1b[green]  ▸ MCP Servers            \x1b[dim]AI tool integrations

\x1b[yellow]CONTACT
\x1b[white]  Email:    saisidharthan17@gmail.com
\x1b[white]  Phone:    +91 9786763705
\x1b[cyan]  GitHub:   \x1b[link]https://github.com/Saisidharthan\x1b[/link]
\x1b[cyan]  LinkedIn: \x1b[link]https://www.linkedin.com/in/saisidharthan/\x1b[/link]`;
    case 'readme.md':
      return `\x1b[white]# Sai Sidharthan's Portfolio

\x1b[dim]> A terminal-based portfolio experience. Because GUIs are overrated.

\x1b[yellow]## Quick Start
\x1b[white]  Type \x1b[green]help\x1b[white] to see all commands
  Type \x1b[green]neofetch\x1b[white] for a quick overview
  Type \x1b[green]projects\x1b[white] to see my work`;
    default:
      if (!file) {
        return '\x1b[red]Usage: cat <filename>\x1b[dim]\nAvailable files: \x1b[yellow]about.txt\x1b[dim], \x1b[yellow]resume.txt\x1b[dim], \x1b[yellow]README.md';
      }
      return `\x1b[red]cat: ${file}: No such file or directory\x1b[dim]\nAvailable files: \x1b[yellow]about.txt\x1b[dim], \x1b[yellow]resume.txt\x1b[dim], \x1b[yellow]README.md`;
  }
}

function formatHistory(history: string[]): string {
  if (history.length === 0) return '\x1b[dim]No commands in history.';
  return history
    .map((cmd, i) => `  \x1b[dim]${String(i + 1).padStart(4)}  \x1b[white]${cmd}`)
    .join('\n');
}

function handleTheme(name?: string): CommandResult {
  if (!name) {
    const available = Object.keys(THEMES).join(', ');
    return {
      output: `\x1b[dim]Usage: theme <name>\x1b[dim]\nAvailable: \x1b[yellow]${available}`,
    };
  }

  const theme = THEMES[name.toLowerCase()];
  if (!theme) {
    const available = Object.keys(THEMES).join(', ');
    return {
      output: `\x1b[red]Unknown theme: ${name}\x1b[dim]\nAvailable: \x1b[yellow]${available}`,
    };
  }

  return {
    output: `\x1b[green]✓ Theme switched to \x1b[cyan]${name}`,
    theme,
  };
}

function handleSudo(args: string[]): CommandResult {
  const subCmd = args.join(' ').toLowerCase();
  if (subCmd === 'hire-me' || subCmd === 'hire me') {
    return {
      output: `
\x1b[green]  ╔══════════════════════════════════════════════════════╗
\x1b[green]  ║                                                      ║
\x1b[green]  ║   ✓ PERMISSION GRANTED                               ║
\x1b[green]  ║                                                      ║
\x1b[green]  ║   \x1b[white]Excellent decision! Here's how to proceed:\x1b[green]        ║
\x1b[green]  ║                                                      ║
\x1b[green]  ║   \x1b[cyan]→ GitHub:   github.com/Saisidharthan\x1b[green]              ║
\x1b[green]  ║   \x1b[cyan]→ LinkedIn: linkedin.com/in/saisidharthan\x1b[green]         ║
\x1b[green]  ║                                                      ║
\x1b[green]  ║   \x1b[yellow]Let's build something extraordinary together.\x1b[green]    ║
\x1b[green]  ║                                                      ║
\x1b[green]  ╚══════════════════════════════════════════════════════╝`,
    };
  }
  return {
    output: `\x1b[red][sudo] password for visitor: \x1b[dim]Nice try! You don't have root access here.\x1b[dim]\nBut you can try \x1b[yellow]sudo hire-me\x1b[dim] 😏`,
  };
}

function handleRm(args: string[]): CommandResult {
  const fullCmd = args.join(' ');
  if (fullCmd.includes('-rf') && fullCmd.includes('/')) {
    return {
      output: `
\x1b[red]  ██████████████████████████████████████████████████████████
\x1b[red]  █                                                        █
\x1b[red]  █   ⚠  NICE TRY, HACKER!                                █
\x1b[red]  █                                                        █
\x1b[red]  █   \x1b[white]This portfolio is protected by:                     \x1b[red]█
\x1b[red]  █   \x1b[green]  ✓ Common sense                                   \x1b[red]█
\x1b[red]  █   \x1b[green]  ✓ The fact that this is a web app                \x1b[red]█
\x1b[red]  █   \x1b[green]  ✓ My impeccable sense of humor                  \x1b[red]█
\x1b[red]  █                                                        █
\x1b[red]  █   \x1b[dim]Your IP has been logged. Just kidding.              \x1b[red]█
\x1b[red]  █   \x1b[dim]...or am I?                                        \x1b[red]█
\x1b[red]  █                                                        █
\x1b[red]  ██████████████████████████████████████████████████████████`,
    };
  }
  return {
    output: `\x1b[red]rm: permission denied\x1b[dim] — You can't delete my portfolio!`,
  };
}

function formatTimeline(): string {
  return `\x1b[cyan]─── Career Timeline ───────────────────────────────────────

  \x1b[dim]2024
  \x1b[dim]  │
  \x1b[dim]  ├──\x1b[green] ● \x1b[white]GenAI Engineer — GyanMatrix Technologies
  \x1b[dim]  │   \x1b[dim]4 months · Built KYC bot with GenAI
  \x1b[dim]  │
  \x1b[dim]  ├──\x1b[green] ● \x1b[white]BSP Engineer — LG Soft India (LGSI)
  \x1b[dim]  │   \x1b[dim]8 months · MCP integrations for TV boards
  \x1b[dim]  │
  \x1b[dim]2025
  \x1b[dim]  │
  \x1b[dim]  ├──\x1b[yellow] ● \x1b[white]Co-Founder — Synergeek Technologies
  \x1b[dim]  │   \x1b[dim]1.7 yrs · Built & scaled the company
  \x1b[dim]  │
  \x1b[dim]2026
  \x1b[dim]  │
  \x1b[dim]  ├──\x1b[cyan] ● \x1b[white]SDE — Riverline AI
  \x1b[dim]  │   \x1b[cyan]Current · DevOps, InfoSec, ISO/SOC2
  \x1b[dim]  │
  \x1b[dim]  ▼
  \x1b[dim]  \x1b[green]What's next?

\x1b[dim]──────────────────────────────────────────────────────────
  \x1b[dim]Type \x1b[yellow]experience\x1b[dim] for detailed work history.`;
}

function handleOpen(name: string): CommandResult {
  if (!name) {
    return {
      output: `\x1b[dim]Usage: \x1b[yellow]open <project-name>\x1b[dim] or \x1b[yellow]open github\x1b[dim] / \x1b[yellow]open linkedin\x1b[dim] / \x1b[yellow]open portfolio`,
    };
  }

  const key = name.toLowerCase().replace(/\s+/g, '-');

  const quickLinks: Record<string, string> = {
    github: 'https://github.com/Saisidharthan',
    linkedin: 'https://www.linkedin.com/in/saisidharthan/',
    portfolio: 'https://portfolio-saisidharthan.vercel.app',
    email: 'mailto:saisidharthan17@gmail.com',
  };

  if (quickLinks[key]) {
    return {
      output: `\x1b[green]Opening \x1b[cyan]${quickLinks[key]}\x1b[green]...`,
      openUrl: quickLinks[key],
    };
  }

  const project = PROJECTS[key];
  if (project?.github) {
    return {
      output: `\x1b[green]Opening \x1b[cyan]${project.name}\x1b[green] → \x1b[link]${project.github}\x1b[/link]`,
      openUrl: project.github,
    };
  }

  if (project) {
    return {
      output: `\x1b[yellow]${project.name} has no external link available.`,
    };
  }

  return {
    output: `\x1b[red]"${name}" not found.\x1b[dim] Try \x1b[yellow]open github\x1b[dim], \x1b[yellow]open linkedin\x1b[dim], or \x1b[yellow]open <project-name>`,
  };
}

function formatVisitor(count?: number | null): string {
  return `
\x1b[cyan]╭─ Visitor Stats ───────────────────────────────────────╮
\x1b[cyan]│                                                        │
\x1b[cyan]│  \x1b[yellow]You are visitor   \x1b[white]#${count || '???'}
\x1b[cyan]│                                                        │
\x1b[cyan]│  \x1b[dim]Thanks for stopping by!                               │
\x1b[cyan]│                                                        │
\x1b[cyan]╰────────────────────────────────────────────────────────╯`;
}
