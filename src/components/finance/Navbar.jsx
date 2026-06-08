import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'EXPENSES', href: '#assets' },
  { label: 'Salary Flow', href: '#flow' },
  { label: 'Stats', href: '#metrics' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-foreground bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 h-14">
        {}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-accent" />
          <div>
            <span className="font-heading font-black text-sm uppercase tracking-[-0.05em]">
              FINANCIAL LITERACY
            </span>
          </div>
        </div>

        {}
        <div className="hidden md:flex items-center gap-0">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted border-l-2 border-foreground transition-colors focus-visible:outline-2 focus-visible:outline-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        {}
        <div className="flex items-center gap-3">
          <span className="text-accent text-[11px] font-mono hidden sm:block">
            NVIDIA 2026
          </span>
          <button
            onClick={() => setDark(!dark)}
            className="w-8 h-8 flex items-center justify-center border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            className="md:hidden p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
 {/* Table */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="md:hidden overflow-hidden border-t-2 border-foreground"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-6 py-3 text-xs font-mono uppercase tracking-wider border-b border-muted hover:bg-muted transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}