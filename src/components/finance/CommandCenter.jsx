import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';


const TOP_METRICS = [
  { label: 'GROSS_INCOME', value: '$157,184', sub: 'per year', up: true },
  { label: 'MONTHLY_GROSS', value: '$13,098.66', sub: 'per month', up: true },
  { label: 'FINAL_SAVINGS', value: '$49,896.64', sub: 'per year', up: true },
  { label: 'MONTHLY_SAVINGS', value: '$4,018.30', sub: 'per month', up: true },
  { label: 'TOTAL_EXPENSES', value: '$76,497.33', sub: 'per year', up: false },
  { label: 'TAXES_PAID', value: '$30,790.03', sub: '38.16% rate', up: false },
];

export default function CommandCenter() {
  return (
    <section id="home" className="border-b border-foreground/30 pb-10">
      <div className="px-6 md:px-12 pt-10 pb-8">
        <ScrollReveal delayMs={0}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="watershed-hero"
          >
            <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">
              SECTION 01
            </p>


          <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.4rem] uppercase tracking-[-0.05em] leading-[0.88]">
            FINANCIAL
            <br />
            <span className="text-accent">LITERACY</span>
          </h1>

          <p className="font-mono text-muted-foreground text-sm mt-6 max-w-2xl leading-relaxed">
            Guransh Dhaliwal · Nvidia Software Engineer · Toronto, Canada · 2026
          </p>
          </motion.div>
        </ScrollReveal>
      </div>


      <div className="px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 rounded-2xl border border-foreground/30 bg-background/30 backdrop-blur p-6 md:p-10 watershed-card wf-animate-fadeUp">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://www.nvidia.com/favicon.ico"
                alt="Nvidia"
                className="w-5 h-5"
              />
              <div>
                <p className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                  GROSS_INCOME
                </p>
                <p className="text-[10px] font-mono text-muted-foreground tracking-wider">
                  NVIDIA_SWE · BASE_SALARY_LOW_END
                </p>
              </div>
            </div>

            <div className="font-heading font-black text-5xl md:text-6xl tracking-[-0.04em]">
              $157,184
            </div>
            <p className="text-[11px] font-mono text-muted-foreground mt-2">
              $13,098.66 / month
            </p>

            <div className="flex items-center gap-2 mt-4">
              <ArrowUpRight className="text-accent" size={16} />
              <span className="text-accent text-xs font-mono">
                EMPLOYER: NVIDIA SOFTWARE ENGINEER
              </span>
            </div>

            <div className="mt-6 rounded-xl border border-foreground/25 overflow-hidden bg-foreground/20">
              <img
                src="https://www.nvidia.com/favicon.ico"
                alt="Nvidia logo"
                className="w-full h-36 object-contain p-4"
              />
              <div className="px-4 py-2 border-t border-foreground/25">
                <p className="text-[9px] font-mono text-muted-foreground">
                  NVIDIA · FINANCIAL DASHBOARD
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-6">
            <div className="rounded-2xl border border-foreground/30 bg-background/30 p-6">
              <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-2">
                TAXABLE_INCOME
              </p>
              <p className="font-heading font-black text-2xl md:text-3xl">
                $80,686.67
              </p>
              <p className="text-[11px] font-mono text-muted-foreground mt-1">
                $6,497.90 / month
              </p>
            </div>

            <div className="rounded-2xl border border-foreground/30 bg-background/30 p-6">
              <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-2">
                TAXES_TOTAL
              </p>
              <p className="font-heading font-black text-2xl md:text-3xl text-destructive">
                $30,790.03
              </p>
              <p className="text-[11px] font-mono text-muted-foreground mt-1">
                38.16% (26% + 12.16%)
              </p>
            </div>

            <div className="rounded-2xl border border-foreground/30 bg-background/30 p-6">
              <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-2">
                FINAL_SAVINGS
              </p>
              <p className="font-heading font-black text-2xl md:text-3xl text-accent">
                $49,896.64
              </p>
              <p className="text-[11px] font-mono text-muted-foreground mt-1">
                $4,018.30 / month
              </p>
            </div>

            <div className="rounded-2xl border border-foreground/30 bg-background/30 p-6">
              <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-2">
                TOTAL_EXPENSES
              </p>
              <p className="font-heading font-black text-2xl md:text-3xl">
                $76,497.33
              </p>
              <p className="text-[11px] font-mono text-muted-foreground mt-1">
                $6,600.76 / month
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TOP_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-4 md:p-5 rounded-2xl border border-foreground/30 bg-background/25 cell-pop cursor-default"
            >
              <p className="text-[9px] font-mono text-muted-foreground tracking-wider mb-3 leading-tight">
                {m.label}
              </p>
              <p className="font-heading font-black text-base md:text-lg tracking-tight leading-tight">
                {m.value}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {m.up ? (
                  <ArrowUpRight size={11} className="text-accent" />
                ) : (
                  <ArrowDownRight size={11} className="text-destructive" />
                )}
                <span
                  className={`text-[10px] font-mono ${
                    m.up ? 'text-accent' : 'text-destructive'
                  }`}
                >
                  {m.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
