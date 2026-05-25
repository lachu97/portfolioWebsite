import { motion } from 'framer-motion';
import { Code2, Link2, Mail, Heart, ArrowUp } from 'lucide-react';
import { CONFIG, NAV_ITEMS } from '../../constants';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-[rgba(99,102,241,0.1)] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + desc */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs font-['Syne']">
                AR
              </div>
              <span className="font-['Syne'] font-700 text-white">{CONFIG.name}</span>
            </div>
            <p className="text-xs font-['DM_Sans'] text-[var(--text-muted)] text-center md:text-left max-w-xs">
              {CONFIG.subtitle}
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_ITEMS.map(item => (
              <button
                key={item.label}
                onClick={() => document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })}
                className="text-xs font-['DM_Sans'] text-[var(--text-muted)] hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {[
              { href: `https://github.com/${CONFIG.GITHUB_USERNAME}`, icon: Code2 },
              { href: CONFIG.LINKEDIN_URL, icon: Link2 },
              { href: `mailto:${CONFIG.EMAIL}`, icon: Mail },
            ].map(({ href, icon: Icon }) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#6366f1' }}
                className="text-[var(--text-muted)] hover:text-indigo-400 transition-colors"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(99,102,241,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-['DM_Mono'] text-[var(--text-muted)]">
            © {new Date().getFullYear()} {CONFIG.name}. Built with{' '}
            <Heart size={10} className="inline text-red-500" /> using React + Vite
          </p>
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs font-['DM_Mono'] text-[var(--text-muted)] hover:text-indigo-400 transition-colors"
          >
            Back to top <ArrowUp size={12} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
