import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';


const PRINCIPLES = [
  {
    title: 'Budget with intent',
    body: 'Know where every dollar goes then design your plan to save, invest, and stay calm.',
  },
  {
    title: 'Learn the rules, then automate',
    body: 'Taxes basics, interest, RRSP/RDSP ideas understand first, then use systems.',
  },
  {
    title: 'Invest for time + consistency',
    body: 'Start small, stay consistent. Growth comes from time in the market and discipline.',
  },
  {
    title: 'Measure outcomes',
    body: 'Track cashflow, savings rate, and risk. Clarity beats guesswork.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="border-t border-foreground/30">
      <div className="px-6 md:px-12 pt-10 pb-8">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="watershed-card"
          >
          <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">
            ABOUT
          </p>
          <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.05em] leading-[0.9]">
            ABOUT ME
          </h2>
          <p className="font-mono text-muted-foreground text-sm mt-6 max-w-2xl leading-relaxed">
            I built this website to help people with their finances and to show others my age that life is about more than just paying for expensive things.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-14 h-14 rounded-full border border-foreground/30 bg-background/30 overflow-hidden flex items-center justify-center">
              <img
                src="/src/assets/icons/profile.png"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // If the png fails, show initials (no default svg)
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.textContent = 'G';
                    parent.style.color = 'hsl(var(--accent))';
                    parent.style.fontFamily = 'var(--font-heading)';
                    parent.style.fontWeight = '800';
                    parent.style.fontSize = '20px';
                    parent.style.letterSpacing = '-0.02em';
                    parent.style.textAlign = 'center';
                  }
                }}
              />
            </div>
              <p className="font-mono text-muted-foreground text-sm max-w-2xl leading-relaxed flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-md border border-foreground/25 bg-background/20">👤</span>
                Name:{' '}
                <span className="text-foreground font-medium">
                  GURANSH DHALIWAL
                </span>
            </p>
          </div>
          </motion.div>
        </ScrollReveal>
      </div>


      <div className="px-6 md:px-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-foreground/30 p-5 bg-background/25 wf-animate-fadeUp cell-pop"
            >
              <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-3">
                PRINCIPLE {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="font-heading font-black text-xl uppercase tracking-[-0.04em] leading-tight">
                {p.title}
              </h3>
              <p className="font-mono text-muted-foreground text-sm mt-3 leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


