import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks';
import { CONFIG } from '../../constants';
import { Mail, Code2, Link2, ExternalLink, Send, CheckCircle, AlertCircle } from 'lucide-react';

const SOCIALS = [
  {
    label: 'GitHub',
    handle: `@${CONFIG.GITHUB_USERNAME}`,
    href: `https://github.com/${CONFIG.GITHUB_USERNAME}`,
    icon: Code2,
    color: '#ffffff',
    bg: 'rgba(255,255,255,0.05)',
  },
  {
    label: 'LinkedIn',
    handle: 'lakshminarasimhan-rn',
    href: CONFIG.LINKEDIN_URL,
    icon: Link2,
    color: '#0A66C2',
    bg: 'rgba(10,102,194,0.1)',
  },
  {
    label: 'LeetCode',
    handle: `@${CONFIG.LEETCODE_USERNAME}`,
    href: `https://leetcode.com/${CONFIG.LEETCODE_USERNAME}`,
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ),
    color: '#FFA116',
    bg: 'rgba(255,161,22,0.1)',
  },
  {
    label: 'Email',
    handle: CONFIG.EMAIL,
    href: `mailto:${CONFIG.EMAIL}`,
    icon: Mail,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
  },
];

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const { ref, inView } = useInView(0.1);
  const [formState, setFormState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
    window.location.href = `mailto:${CONFIG.EMAIL}?subject=${subject}&body=${body}`;
    await new Promise(r => setTimeout(r, 800));
    setFormState('success');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setFormState('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" ref={ref} className="py-32 relative">
      <div className="orb w-[400px] h-[400px] bg-indigo-600/10 bottom-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-['DM_Mono'] text-xs text-indigo-400 uppercase tracking-widest">07 — Contact</span>
          </div>
          <h2 className="font-['Syne'] font-800 text-4xl md:text-6xl text-white mb-4">
            Let's build something
            <span className="text-gradient"> great</span>
          </h2>
          <p className="text-[var(--text-secondary)] font-['DM_Sans'] text-lg max-w-xl mx-auto">
            Open to React Native / mobile engineering roles, contracts, and interesting open source collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: 'Your Name', name: 'name', type: 'text', placeholder: 'John Doe' },
                { label: 'Email Address', name: 'email', type: 'email', placeholder: 'john@company.com' },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block font-['DM_Sans'] text-sm text-[var(--text-secondary)] mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={form[name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    className="w-full px-4 py-3 rounded-xl glass border border-[rgba(99,102,241,0.2)] text-white font-['DM_Sans'] text-sm placeholder-[var(--text-muted)] outline-none focus:border-indigo-500/60 transition-all duration-200"
                  />
                </div>
              ))}

              <div>
                <label className="block font-['DM_Sans'] text-sm text-[var(--text-secondary)] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl glass border border-[rgba(99,102,241,0.2)] text-white font-['DM_Sans'] text-sm placeholder-[var(--text-muted)] outline-none focus:border-indigo-500/60 transition-all duration-200 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={formState === 'sending' || formState === 'success'}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(99,102,241,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-['DM_Sans'] font-500 text-sm disabled:opacity-70 transition-all duration-200"
              >
                {formState === 'idle' && <><Send size={16} /> Send Message</>}
                {formState === 'sending' && (
                  <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Sending...</>
                )}
                {formState === 'success' && <><CheckCircle size={16} /> Message sent!</>}
                {formState === 'error' && <><AlertCircle size={16} /> Try again</>}
              </motion.button>
            </form>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <p className="font-['DM_Sans'] text-[var(--text-secondary)] text-sm mb-6">
              Or reach out directly through any of these channels:
            </p>

            {SOCIALS.map(({ label, handle, href, icon: Icon, color, bg }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="flex items-center justify-between p-4 rounded-xl border border-[rgba(99,102,241,0.15)] hover:border-[rgba(99,102,241,0.3)] transition-all duration-200 group"
                style={{ background: bg }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg" style={{ background: `${color}15`, color }}>
                    <Icon />
                  </div>
                  <div>
                    <div className="font-['DM_Sans'] font-500 text-white text-sm">{label}</div>
                    <div className="font-['DM_Mono'] text-xs text-[var(--text-muted)]">{handle}</div>
                  </div>
                </div>
                <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
