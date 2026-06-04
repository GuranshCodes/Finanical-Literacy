import React from 'react';
import { motion } from 'framer-motion';

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
    <section id="about" className="border-t-2 border-foreground">
      <div className="p-6 md:p-12 border-b-2 border-foreground">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">ABOUT</p>
          <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.05em] leading-[0.9]">
            ABOUT ME
          </h2>
          <p className="font-mono text-muted-foreground text-sm mt-6 max-w-2xl leading-relaxed">
            I built this website to help people with their finances and to show others my age that life is about more than just paying for expensive things.
          </p>
          <p className="font-mono text-muted-foreground text-sm mt-3 max-w-2xl leading-relaxed">
            Name: <span className="text-foreground font-medium">GURANSH DHALIWAL</span>. Grade-8 level message:
            keep learning—anything is possible if you practice.
          </p>
        </motion.div>
      </div>

      <div className="p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="border-2 border-foreground p-5 cell-pop bg-background"
            >
              <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-3">PRINCIPLE {String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-heading font-black text-xl uppercase tracking-[-0.04em] leading-tight">{p.title}</h3>
              <p className="font-mono text-muted-foreground text-sm mt-3 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

