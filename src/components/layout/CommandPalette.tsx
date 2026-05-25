import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, ExternalLink, Mail, Code2, Terminal, Download } from 'lucide-react';
import { NAV_ITEMS, CONFIG } from '../../constants';
import resumeUrl from '../../resume/myresume.pdf?url';

interface CommandItem {
  label: string;
  icon: React.ElementType;
  action: () => void;
  shortcut: string;
}

interface CommandGroup {
  group: string;
  items: CommandItem[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const COMMANDS: CommandGroup[] = [
    {
      group: 'Navigate',
      items: NAV_ITEMS.map(n => ({
        label: n.label,
        icon: ArrowRight,
        action: () => document.querySelector(n.href)?.scrollIntoView({ behavior: 'smooth' }),
        shortcut: '',
      })),
    },
    {
      group: 'Links',
      items: [
        { label: 'GitHub Profile', icon: Code2, action: () => window.open(`https://github.com/${CONFIG.GITHUB_USERNAME}`, '_blank'), shortcut: 'G' },
        { label: 'LinkedIn', icon: ExternalLink, action: () => window.open(CONFIG.LINKEDIN_URL, '_blank'), shortcut: 'L' },
        { label: 'Send Email', icon: Mail, action: () => window.open(`mailto:${CONFIG.EMAIL}`, '_blank'), shortcut: 'E' },
        { label: 'Download Resume', icon: Download, action: () => { const a = document.createElement('a'); a.href = resumeUrl; a.download = 'Lakshmi_Narasimhan_Resume.pdf'; a.click(); }, shortcut: 'R' },
      ],
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const allItems = COMMANDS.flatMap(g => g.items);
  const filtered = query
    ? allItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    : allItems;

  const handleSelect = (action: () => void) => {
    action();
    onClose();
  };

  const displayGroups: CommandGroup[] = query
    ? [{ group: 'Results', items: filtered }]
    : COMMANDS;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[201]"
          >
            <div className="mx-4 rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: 'rgba(10,15,30,0.95)', border: '1px solid rgba(99,102,241,0.3)', boxShadow: '0 25px 80px rgba(0,0,0,0.8)' }}>

              <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(99,102,241,0.15)]">
                <Search size={16} className="text-indigo-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent outline-none text-white font-['DM_Sans'] text-sm placeholder-[var(--text-muted)]"
                />
                <kbd className="px-2 py-0.5 rounded text-xs font-['DM_Mono'] text-[var(--text-muted)] bg-white/5 border border-white/10">ESC</kbd>
              </div>

              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <div className="px-4 py-8 text-center text-[var(--text-muted)] text-sm font-['DM_Sans']">
                    No commands found
                  </div>
                )}
                {displayGroups.map((group) => (
                  <div key={group.group}>
                    <div className="px-4 py-1.5 text-xs font-['DM_Mono'] text-[var(--text-muted)] uppercase tracking-wider">
                      {group.group}
                    </div>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          onClick={() => handleSelect(item.action)}
                          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-indigo-500/10 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={14} className="text-[var(--text-muted)] group-hover:text-indigo-400 transition-colors" />
                            <span className="text-sm font-['DM_Sans'] text-[var(--text-secondary)] group-hover:text-white transition-colors">
                              {item.label}
                            </span>
                          </div>
                          {item.shortcut && (
                            <kbd className="px-2 py-0.5 rounded text-xs font-['DM_Mono'] text-[var(--text-muted)] bg-white/5 border border-white/10">
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="px-4 py-2 border-t border-[rgba(99,102,241,0.1)] flex items-center gap-2">
                <Terminal size={12} className="text-indigo-500" />
                <span className="text-xs font-['DM_Mono'] text-[var(--text-muted)]">Command Palette — ⌘K</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
