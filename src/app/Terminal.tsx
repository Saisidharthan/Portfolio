'use client';

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { processCommand, type ExperienceCard } from './commands';
import { ASCII_BANNER, WELCOME_MESSAGE, ALL_COMMANDS, PROJECTS } from './data';

interface OutputLine {
  id: number;
  type: 'command' | 'output' | 'banner';
  content: string;
  prompt?: string;
  experienceCards?: ExperienceCard[];
}

const COLOR_MAP: Record<string, string> = {
  red: '#ff5555',
  green: '#50fa7b',
  cyan: '#8be9fd',
  yellow: '#f1fa8c',
  pink: '#ff79c6',
  purple: '#bd93f9',
  orange: '#ffb86c',
  blue: '#6272a4',
  white: '#f8f8f2',
  dim: '#6272a4',
};

function parseAnsi(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\x1b\[(.*?)](.*?)(?=\x1b\[|$)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  // Handle image tags
  const imgRegex = /\x1b\[img](.*?)\x1b\[\/img]/g;
  let processedText = text;
  const images: { placeholder: string; src: string; alt: string }[] = [];

  let imgMatch;
  while ((imgMatch = imgRegex.exec(text)) !== null) {
    const placeholder = `__IMG_${images.length}__`;
    const [src, alt] = imgMatch[1].split('|');
    images.push({ placeholder, src, alt: alt || '' });
    processedText = processedText.replace(imgMatch[0], placeholder);
  }

  // Handle link tags
  const linkRegex = /\x1b\[link](.*?)\x1b\[\/link]/g;
  const links: { placeholder: string; url: string }[] = [];

  let linkMatch;
  while ((linkMatch = linkRegex.exec(processedText)) !== null) {
    const placeholder = `__LINK_${links.length}__`;
    links.push({ placeholder, url: linkMatch[1] });
    processedText = processedText.replace(linkMatch[0], placeholder);
  }

  const colorRegex = /\x1b\[(\w+)]([\s\S]*?)(?=\x1b\[|$)/g;
  let colorMatch;
  let lastColorIndex = 0;

  while ((colorMatch = colorRegex.exec(processedText)) !== null) {
    // Text before the color code
    if (colorMatch.index > lastColorIndex) {
      const beforeText = processedText.slice(lastColorIndex, colorMatch.index);
      parts.push(renderWithLinksAndImages(beforeText, links, images, key++));
    }

    const colorName = colorMatch[1];
    const content = colorMatch[2];
    const color = COLOR_MAP[colorName] || COLOR_MAP.white;

    parts.push(
      <span key={key++} style={{ color }}>
        {renderWithLinksAndImages(content, links, images, key++)}
      </span>
    );

    lastColorIndex = colorMatch.index + colorMatch[0].length;
  }

  // Remaining text
  if (lastColorIndex < processedText.length) {
    const remaining = processedText.slice(lastColorIndex);
    parts.push(renderWithLinksAndImages(remaining, links, images, key++));
  }

  if (parts.length === 0) {
    return [renderWithLinksAndImages(processedText, links, images, 0)];
  }

  return parts;
}

function renderWithLinksAndImages(
  text: string,
  links: { placeholder: string; url: string }[],
  images: { placeholder: string; src: string; alt: string }[],
  baseKey: number
): React.ReactNode {
  let result: React.ReactNode = text;

  for (const img of images) {
    if (typeof result === 'string' && result.includes(img.placeholder)) {
      const parts = result.split(img.placeholder);
      return (
        <span key={baseKey}>
          {parts[0]}
          <img
            src={img.src}
            alt={img.alt}
            style={{
              maxWidth: '220px',
              borderRadius: '6px',
              border: '1px solid rgba(139, 233, 253, 0.2)',
              display: 'block',
              marginTop: '6px',
              marginBottom: '6px',
              opacity: 0.9,
            }}
          />
          {parts[1]}
        </span>
      );
    }
  }

  for (const link of links) {
    if (typeof result === 'string' && result.includes(link.placeholder)) {
      const parts = result.split(link.placeholder);
      return (
        <span key={baseKey}>
          {parts[0]}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="term-link"
            onClick={(e) => e.stopPropagation()}
          >
            {link.url}
          </a>
          {parts[1]}
        </span>
      );
    }
  }

  return result;
}

export default function Terminal() {
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [phase, setPhase] = useState<'glitch' | 'crt' | 'boot' | 'ready'>('glitch');
  const [glitchText, setGlitchText] = useState('');
  const [glitchStable, setGlitchStable] = useState(false);
  const [crtStage, setCrtStage] = useState<'line' | 'expand' | 'flash' | 'done'>('line');
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [lineCounter, setLineCounter] = useState(0);
  const [tabSuggestions, setTabSuggestions] = useState<string[]>([]);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const demoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const demoAbortRef = useRef(false);

  const nextId = useCallback(() => {
    setLineCounter((c) => c + 1);
    return lineCounter;
  }, [lineCounter]);

  // Track visitor count on mount
  useEffect(() => {
    fetch('/api/visit', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setVisitorCount(data.total))
      .catch(() => {});
  }, []);

  // Phase 1: Glitch name + face reveal
  useEffect(() => {
    if (phase !== 'glitch') return;

    const targetText = 'SAI SIDHARTHAN';
    const glitchChars = '!@#$%^&*()_+=-[]{}|;:<>?/\\~`01';
    let iteration = 0;
    const maxIterations = 25;

    const timer = setInterval(() => {
      if (iteration < maxIterations) {
        const progress = iteration / maxIterations;
        const resolved = Math.floor(progress * targetText.length);
        let display = '';
        for (let i = 0; i < targetText.length; i++) {
          if (i < resolved) {
            display += targetText[i];
          } else if (targetText[i] === ' ') {
            display += ' ';
          } else {
            display += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
        }
        setGlitchText(display);
        iteration++;
      } else {
        setGlitchText(targetText);
        setGlitchStable(true);
        clearInterval(timer);
        setTimeout(() => setPhase('crt'), 1000);
      }
    }, 60);

    return () => clearInterval(timer);
  }, [phase]);

  // Phase 2: CRT Power-On
  useEffect(() => {
    if (phase !== 'crt') return;

    const t1 = setTimeout(() => setCrtStage('expand'), 600);
    const t2 = setTimeout(() => setCrtStage('flash'), 1200);
    const t3 = setTimeout(() => setCrtStage('done'), 1400);
    const t4 = setTimeout(() => setPhase('boot'), 1800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [phase]);

  // Phase 2: Boot sequence
  useEffect(() => {
    if (phase !== 'boot') return;

    const bootSequence = [
      '[    0.000000] Portfolio BIOS v2.0.26',
      '[    0.001234] Initializing portfolio kernel...',
      '[    0.002100] Loading modules: skills.ko projects.ko experience.ko',
      '[    0.003500] Mounting /dev/portfolio... OK',
      '[    0.004200] Starting SSH service on port 443...',
      '[    0.005100] Network: Connected (visitor@internet)',
      '[    0.006000] Authenticating... access granted',
      '[    0.007000] Loading user profile: sai@portfolio',
      '',
      '  System ready.',
      '',
    ];

    let i = 0;
    const timer = setInterval(() => {
      if (i < bootSequence.length) {
        const line = bootSequence[i];
        i++;
        setBootLines((prev) => [...prev, line]);
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setPhase('ready');
          setBootComplete(true);
        }, 300);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [phase]);

  // Set initial lines after boot
  useEffect(() => {
    if (bootComplete) {
      const visitorLine = visitorCount
        ? `\n\x1b[dim]  You are visitor \x1b[cyan]#${visitorCount}\x1b[dim] — welcome!`
        : '';
      setLines([
        { id: 0, type: 'banner', content: ASCII_BANNER },
        { id: 1, type: 'output', content: WELCOME_MESSAGE + visitorLine },
      ]);
      setLineCounter(2);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [bootComplete, visitorCount]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, bootLines]);

  // Demo mode sequence
  const DEMO_SEQUENCE = [
    { cmd: 'whoami', pause: 2500 },
    { cmd: 'experience', pause: 4000 },
    { cmd: 'skills', pause: 3000 },
    { cmd: 'projects --ai', pause: 3000 },
    { cmd: 'contact', pause: 2500 },
    { cmd: 'sudo hire-me', pause: 3000 },
  ];

  useEffect(() => {
    if (!demoMode) return;

    demoAbortRef.current = false;
    demoTimersRef.current = [];

    const runDemo = async () => {
      for (let i = 0; i < DEMO_SEQUENCE.length; i++) {
        if (demoAbortRef.current) return;

        const { cmd, pause } = DEMO_SEQUENCE[i];

        // Type each character
        for (let c = 0; c < cmd.length; c++) {
          if (demoAbortRef.current) return;
          const char = cmd[c];
          const delay = 40 + Math.random() * 40;
          await new Promise<void>((resolve) => {
            const t = setTimeout(() => {
              if (demoAbortRef.current) { resolve(); return; }
              setInput((prev) => prev + char);
              resolve();
            }, delay);
            demoTimersRef.current.push(t);
          });
        }

        if (demoAbortRef.current) return;

        // Small pause before "pressing Enter"
        await new Promise<void>((resolve) => {
          const t = setTimeout(resolve, 300);
          demoTimersRef.current.push(t);
        });

        if (demoAbortRef.current) return;

        // Submit the command — we need to read input at this point
        // Use a functional approach: set a flag and trigger submit via state
        setInput((currentInput) => {
          // Process command with current input value
          const trimmed = currentInput.trim();
          const commandLine: OutputLine = {
            id: 0, // will be overridden
            type: 'command',
            content: trimmed,
            prompt: 'sai@portfolio:~$',
          };

          if (trimmed) {
            setHistory((prev) => [...prev, trimmed]);
          }
          setHistoryIndex(-1);

          const result = processCommand(trimmed, [], visitorCount);

          if (result.clear) {
            setLines([]);
          } else {
            if (result.theme) {
              const root = document.documentElement;
              for (const [key, value] of Object.entries(result.theme)) {
                root.style.setProperty(key, value);
              }
            }
            if (result.openUrl) {
              window.open(result.openUrl, '_blank', 'noopener,noreferrer');
            }

            const outputLine: OutputLine = {
              id: 0,
              type: 'output',
              content: result.output,
              experienceCards: result.experienceCards,
            };

            setLines((prev) => {
              const nextBase = prev.length > 0 ? Math.max(...prev.map((l) => l.id)) + 1 : 0;
              return [
                ...prev,
                { ...commandLine, id: nextBase },
                { ...outputLine, id: nextBase + 1 },
              ];
            });
          }

          setLineCounter((c) => c + 2);
          return ''; // clear input
        });

        if (demoAbortRef.current) return;

        // Wait pause duration
        await new Promise<void>((resolve) => {
          const t = setTimeout(resolve, pause);
          demoTimersRef.current.push(t);
        });
      }

      if (demoAbortRef.current) return;

      // Demo complete message
      const completeMsg = '\x1b[dim]── Demo complete ──────────────────────────────\n  Type \x1b[yellow]help\x1b[dim] to explore on your own.\n  Or just \x1b[yellow]sudo hire-me\x1b[dim] again. You know you want to.';
      setLines((prev) => {
        const nextId = prev.length > 0 ? Math.max(...prev.map((l) => l.id)) + 1 : 0;
        return [...prev, { id: nextId, type: 'output', content: completeMsg }];
      });
      setLineCounter((c) => c + 1);
      setDemoMode(false);
    };

    runDemo();

    return () => {
      demoAbortRef.current = true;
      for (const t of demoTimersRef.current) {
        clearTimeout(t);
      }
      demoTimersRef.current = [];
    };
  }, [demoMode]);

  // Cancel demo on any keypress
  useEffect(() => {
    if (!demoMode) return;

    const handleAnyKey = () => {
      demoAbortRef.current = true;
      for (const t of demoTimersRef.current) {
        clearTimeout(t);
      }
      demoTimersRef.current = [];
      setDemoMode(false);
      setInput('');
      setTimeout(() => inputRef.current?.focus(), 50);
    };

    window.addEventListener('keydown', handleAnyKey);
    return () => window.removeEventListener('keydown', handleAnyKey);
  }, [demoMode]);

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim();
    setTabSuggestions([]);

    const commandLine: OutputLine = {
      id: lineCounter,
      type: 'command',
      content: trimmed,
      prompt: 'sai@portfolio:~$',
    };

    if (trimmed) {
      setHistory((prev) => [...prev, trimmed]);
    }
    setHistoryIndex(-1);

    const result = processCommand(trimmed, history, visitorCount);

    if (result.clear) {
      setLines([]);
      setInput('');
      setLineCounter((c) => c + 1);
      return;
    }

    if (result.theme) {
      const root = document.documentElement;
      for (const [key, value] of Object.entries(result.theme)) {
        root.style.setProperty(key, value);
      }
    }

    if (result.openUrl) {
      window.open(result.openUrl, '_blank', 'noopener,noreferrer');
    }

    const outputLine: OutputLine = {
      id: lineCounter + 1,
      type: 'output',
      content: result.output,
      experienceCards: result.experienceCards,
    };

    setLines((prev) => [...prev, commandLine, outputLine]);
    setInput('');
    setLineCounter((c) => c + 2);

    if (result.startDemo) {
      setDemoMode(true);
    }
  }, [input, history, lineCounter]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length > 0) {
          const newIndex =
            historyIndex === -1
              ? history.length - 1
              : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1;
          if (newIndex >= history.length) {
            setHistoryIndex(-1);
            setInput('');
          } else {
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
          }
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        handleTabComplete();
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        setLines([]);
      } else if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        const commandLine: OutputLine = {
          id: lineCounter,
          type: 'command',
          content: input + '^C',
          prompt: 'sai@portfolio:~$',
        };
        setLines((prev) => [...prev, commandLine]);
        setInput('');
        setLineCounter((c) => c + 1);
      }
      setTabSuggestions([]);
    },
    [handleSubmit, history, historyIndex, input, lineCounter]
  );

  const handleTabComplete = useCallback(() => {
    const currentInput = input.trim().toLowerCase();
    if (!currentInput) return;

    const parts = currentInput.split(/\s+/);

    if (parts.length === 1) {
      // Complete command names
      const matches = ALL_COMMANDS.filter((c) => c.startsWith(parts[0]));
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
      } else if (matches.length > 1) {
        setTabSuggestions(matches);
      }
    } else if (parts[0] === 'project' && parts.length === 2) {
      // Complete project names
      const projectKeys = Object.keys(PROJECTS);
      const matches = projectKeys.filter((p) => p.startsWith(parts[1]));
      if (matches.length === 1) {
        setInput(`project ${matches[0]}`);
      } else if (matches.length > 1) {
        setTabSuggestions(matches);
      }
    } else if (parts[0] === 'open' && parts.length === 2) {
      const openTargets = ['github', 'linkedin', 'portfolio', 'email', ...Object.keys(PROJECTS)];
      const matches = openTargets.filter((t) => t.startsWith(parts[1]));
      if (matches.length === 1) {
        setInput(`open ${matches[0]}`);
      } else if (matches.length > 1) {
        setTabSuggestions(matches);
      }
    } else if (parts[0] === 'cat' && parts.length === 2) {
      const files = ['about.txt', 'resume.txt', 'README.md'];
      const matches = files.filter((f) =>
        f.toLowerCase().startsWith(parts[1])
      );
      if (matches.length === 1) {
        setInput(`cat ${matches[0]}`);
      } else if (matches.length > 1) {
        setTabSuggestions(matches);
      }
    } else if (parts[0] === 'theme' && parts.length === 2) {
      const themes = ['dracula', 'matrix', 'ubuntu', 'nord'];
      const matches = themes.filter((t) => t.startsWith(parts[1]));
      if (matches.length === 1) {
        setInput(`theme ${matches[0]}`);
      } else if (matches.length > 1) {
        setTabSuggestions(matches);
      }
    }
  }, [input]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const renderLine = (line: OutputLine) => {
    if (line.type === 'command') {
      return (
        <div key={line.id} className="flex flex-wrap gap-x-2">
          <span style={{ color: '#50fa7b' }} className="glow-green whitespace-nowrap">
            {line.prompt}
          </span>
          <span style={{ color: '#f8f8f2' }}>{line.content}</span>
        </div>
      );
    }

    if (line.experienceCards && line.experienceCards.length > 0) {
      return (
        <div key={line.id}>
          <div className="whitespace-pre-wrap break-words">
            {parseAnsi(line.content.split('\n\n')[0])}
          </div>
          {line.experienceCards.map((card, i) => (
            <div
              key={i}
              className="inline-flex items-start gap-4 my-1"
              style={{
                borderLeft: '2px solid rgba(80, 250, 123, 0.15)',
                marginLeft: '8px',
                paddingLeft: '16px',
                paddingBottom: '16px',
                paddingTop: '4px',
                width: 'fit-content',
                maxWidth: '100%',
              }}
            >
              <div className="whitespace-pre-wrap break-words">
                {parseAnsi(card.text)}
              </div>
            </div>
          ))}
          <div className="whitespace-pre-wrap break-words">
            {parseAnsi(line.content.split('\n\n').slice(1).join('\n\n'))}
          </div>
        </div>
      );
    }

    return (
      <div key={line.id} className="whitespace-pre-wrap break-words">
        {parseAnsi(line.content)}
      </div>
    );
  };

  // Glitch name + face phase
  if (phase === 'glitch') {
    return (
      <div className="h-dvh w-full bg-[var(--bg-primary)] flex items-center justify-center scanlines">
        <div className="noise-bg" />
        <div className="flex flex-col items-center gap-6">
          <div
            className={glitchStable ? 'glow-green' : ''}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '4px',
              color: glitchStable ? '#50fa7b' : '#8be9fd',
              textShadow: glitchStable
                ? '0 0 10px rgba(80, 250, 123, 0.5), 0 0 40px rgba(80, 250, 123, 0.2)'
                : '2px 0 #ff5555, -2px 0 #8be9fd',
            }}
          >
            {glitchText}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#6272a4',
              opacity: glitchStable ? 1 : 0,
              transition: 'opacity 0.5s',
            }}
          >
            SDE @ Riverline AI · Co-Founder @ Synergeek
          </div>
        </div>
      </div>
    );
  }

  // CRT Power-On phase
  if (phase === 'crt') {
    return (
      <div className="h-dvh w-full flex items-center justify-center overflow-hidden"
        style={{ background: '#000' }}
      >
        {/* The CRT line/expand/flash */}
        <div
          className={`crt-power-${crtStage}`}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
        {/* Flash overlay */}
        {crtStage === 'flash' && (
          <div className="crt-flash" />
        )}
        {/* Ambient glow during expand */}
        {(crtStage === 'expand' || crtStage === 'flash') && (
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 233, 253, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
        )}
      </div>
    );
  }

  // Boot phase
  if (phase === 'boot') {
    return (
      <div className="h-dvh w-full bg-[var(--bg-primary)] flex flex-col scanlines">
        <div className="noise-bg" />
        <div className="flex-1 overflow-hidden p-4 font-mono text-sm">
          {bootLines.map((line, i) => (
            <div
              key={i}
              className="boot-line"
              style={{
                animationDelay: `${i * 0.02}s`,
                color: !line
                  ? '#6272a4'
                  : line.includes('OK') || line.includes('granted') || line.includes('ready')
                    ? '#50fa7b'
                    : line.includes('Loading') || line.includes('Starting')
                      ? '#8be9fd'
                      : '#6272a4',
              }}
            >
              {line}
            </div>
          ))}
          <span className="cursor-blink" style={{ color: '#50fa7b' }}>
            █
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh w-full flex flex-col scanlines crt-flicker">
      <div className="noise-bg" />

      {/* Title Bar */}
      <div
        className="flex items-center gap-3 px-4 py-2 select-none shrink-0"
        style={{ background: 'var(--bg-titlebar)' }}
      >
        <div className="flex gap-2">
          <div className="traffic-light" style={{ background: '#ff5f57' }} />
          <div className="traffic-light" style={{ background: '#febc2e' }} />
          <div className="traffic-light" style={{ background: '#28c840' }} />
        </div>
        <div
          className="flex-1 text-center text-xs tracking-wider"
          style={{ color: '#6272a4', fontFamily: "'JetBrains Mono', monospace" }}
        >
          sai@portfolio: ~
        </div>
        <div className="w-14" />
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 pb-2 cursor-text"
        style={{
          background: 'var(--bg-primary)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '13.5px',
          lineHeight: '1.6',
        }}
        onClick={focusInput}
      >
        {/* Output lines */}
        {lines.map(renderLine)}

        {/* Tab suggestions */}
        {tabSuggestions.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 mb-1">
            {tabSuggestions.map((s) => (
              <span
                key={s}
                className="autocomplete-highlight"
                style={{ color: '#f1fa8c' }}
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Input line */}
        <div className="flex flex-wrap gap-x-2 items-center">
          <span style={{ color: '#50fa7b' }} className="glow-green whitespace-nowrap">
            sai@portfolio:~$
          </span>
          <div className="flex-1 relative min-w-[100px]">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none caret-transparent"
              style={{
                color: '#f8f8f2',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13.5px',
              }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="Terminal input"
            />
            {/* Custom cursor */}
            <span
              className="cursor-blink pointer-events-none absolute top-0"
              style={{
                color: 'var(--cursor-color)',
                left: `${input.length * 8.1}px`,
              }}
            >
              █
            </span>
          </div>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Status Bar */}
      <div
        className="flex items-center justify-between px-4 py-1 text-xs shrink-0 select-none"
        style={{
          background: 'var(--bg-titlebar)',
          color: '#6272a4',
          fontFamily: "'JetBrains Mono', monospace",
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {demoMode ? (
          <div className="flex items-center gap-2">
            <span style={{ color: '#f1fa8c' }}>▶ DEMO</span>
            <span style={{ color: '#6272a4' }}>— press any key to exit</span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span>
              <span style={{ color: '#50fa7b' }}>●</span> connected
            </span>
            <span>
              sai@portfolio
            </span>
          </div>
        )}
        {!demoMode && (
          <div className="flex items-center gap-4">
            <span>{history.length} cmds</span>
            <span>UTF-8</span>
            <span>zsh</span>
          </div>
        )}
      </div>
    </div>
  );
}
