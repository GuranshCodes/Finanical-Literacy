import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-foreground/30 mt-10">
      <div className="px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-foreground/30 bg-background/25 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 bg-accent rounded-full" />
              <span className="font-heading font-black text-sm uppercase tracking-[-0.05em]">
                FINANCIAL LITERACY
              </span>
            </div>
            <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
              GURANSH DHALIWAL.<br />
              NVIDIA SOFTWARE ENGINEER.<br />
              TORONTO, CANADA · 2026.
            </p>
          </div>

          <div className="rounded-2xl border border-foreground/30 bg-background/25 p-6 md:p-8">
            <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-4">
              SECTIONS
            </p>
            <div className="space-y-2">
              {[
                { label: 'Home', href: '#home' },
                { label: 'EXPENSE BREAKDOWN', href: '#assets' },
                { label: 'FLOW LEDGER', href: '#flow' },
                { label: 'METRICS', href: '#metrics' },
                { label: 'ABOUT', href: '#about' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-xs font-mono watershed-link-underline"
                >
                  → {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-foreground/30 bg-background/25 p-6 md:p-8">
            <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-4">
              KEY STATS
            </p>
            <div className="space-y-2 text-[11px] font-mono text-muted-foreground">
              <p>
                Gross Income:{' '}
                <span className="text-foreground">$157,184</span>
              </p>
              <p>
                FINAL_SAVINGS:{' '}
                <span className="text-accent">$49,896.64</span>
              </p>
              <p>
                TOTAL_EXPENSES:{' '}
                <span className="text-foreground">$76,497.33</span>
              </p>
              <p>
                TAXES:{' '}
                <span className="text-destructive">$30,790.03</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-foreground/30 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] font-mono text-muted-foreground">
            © {new Date().getFullYear()} FINANCIAL LITERACY. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] font-mono text-accent">SYS:</p>
        </div>
      </div>
    </footer>
  );
}

