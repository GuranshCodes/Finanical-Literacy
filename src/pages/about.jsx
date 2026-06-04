import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/finance/Footer';
import Navbar from '@/components/finance/Navbar';

const PRINCIPLES = [
  {
    title: 'Budget with intent',
    body: 'Know where every dollar goes then design your plan to save, invest, and breathe easy.',
  },
  {
    title: 'Learn the rules, then automate',
    body: 'Taxes, interest, RRSP/RDSP concepts. Understand the basics and let systems do the work.',
  },
  {
    title: 'Invest for knowledge + time',
    body: 'Start small, stay consistent. Growth comes from time in the market and disciplined behavior.',
  },
  {
    title: 'Measure outcomes',
    body: 'Track cashflow, savings rate, and risk. Clarity beats guesswork.',
  },
];

function AboutSection() {
  return (
    <section className="border-t-2 border-foreground">
      <div className="p-6 md:p-12 border-b-2 border-foreground">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">ABOUT ME</p>
          <h1 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.05em] leading-[0.9]">
            GUANSH<br />
            DHALIWAL
          </h1>
          <p className="font-mono text-muted-foreground text-sm mt-6 max-w-2xl leading-relaxed">
            I made this site to help people learn financial literacy in a simple way. I want to show you that
            anything is possible if you keep learning and practicing, even when you start with zero.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-foreground">
        <div className="lg:col-span-7 p-6 md:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">WHAT I BUILD</p>
            <h2 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-[-0.05em] leading-[0.95]">
              Clear money habits.
              <span className="text-accent"> Measurable progress.</span>
            </h2>

            <div className="mt-7 space-y-3">
              {[
                'Turn income into a plan you can follow.',
                'Explain common financial terms in plain language.',
                'Show how savings rate and expenses connect.',
                'Use repeatable frameworks instead of one-time tips.',
              ].map((t, i) => (
                <div key={t} className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 bg-accent mt-2 shrink-0" />
                  <p className="font-mono text-muted-foreground text-sm leading-relaxed">
                    <span className="text-foreground font-medium">{String(i + 1).padStart(2, '0')}.</span> {t}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 p-6 md:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="border-2 border-foreground p-6 bg-muted/40"
          >
            <p className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase mb-3">
              LEARNING PATH
            </p>
            <div className="space-y-3">
              {[
                { step: '01', label: 'Budget + cashflow map' },
                { step: '02', label: 'Taxes basics + timing' },
                { step: '03', label: 'Saving rate + goals' },
                { step: '04', label: 'Investing education + consistency' },
              ].map((x) => (
                <div key={x.step} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono border border-foreground px-2 py-1">{x.step}</span>
                    <span className="text-sm font-mono text-foreground">{x.label}</span>
                  </div>
                  <ArrowRight className="text-accent" size={16} />
                </div>
              ))}
            </div>
            <p className="text-[11px] font-mono text-muted-foreground mt-5 leading-relaxed">
              Start with section cards, then revisit the dashboard as your plan evolves.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border-2 border-foreground p-5 cell-pop bg-background"
            >
              <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-3">PRINCIPLE {String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-heading font-black text-xl uppercase tracking-[-0.04em] leading-tight">{p.title}</h3>
              <p className="font-mono text-muted-foreground text-sm mt-3 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <Navbar />
      <div className="pt-14">
        <AboutSection />
      </div>
    </div>
  );
}