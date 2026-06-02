import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ASSETS = [
  {
    name: 'VANGUARD S&P 500 ETF',
    ticker: 'VOO',
    buyIn: '$312.40',
    current: '$487.20',
    roi: '+55.9%',
    risk: 'A',
    liquidity: 'HIGH',
    horizon: 'LONG',
    category: 'EQUITY',
  },
  {
    name: 'BITCOIN',
    ticker: 'BTC',
    buyIn: '$28,400',
    current: '$67,200',
    roi: '+136.6%',
    risk: 'C+',
    liquidity: 'HIGH',
    horizon: 'MEDIUM',
    category: 'CRYPTO',
  },
  {
    name: 'PRIMARY RESIDENCE',
    ticker: 'RE-001',
    buyIn: '$165,000',
    current: '$185,000',
    roi: '+12.1%',
    risk: 'A+',
    liquidity: 'LOW',
    horizon: 'LONG',
    category: 'REAL_ESTATE',
  },
  {
    name: 'HIGH-YIELD SAVINGS',
    ticker: 'HYS',
    buyIn: '$40,000',
    current: '$42,180',
    roi: '+5.4%',
    risk: 'A+',
    liquidity: 'INSTANT',
    horizon: 'SHORT',
    category: 'CASH',
  },
  {
    name: 'ETHEREUM',
    ticker: 'ETH',
    buyIn: '$1,800',
    current: '$3,420',
    roi: '+90.0%',
    risk: 'B',
    liquidity: 'HIGH',
    horizon: 'MEDIUM',
    category: 'CRYPTO',
  },
  {
    name: 'APPLE INC.',
    ticker: 'AAPL',
    buyIn: '$142.00',
    current: '$198.50',
    roi: '+39.8%',
    risk: 'A',
    liquidity: 'HIGH',
    horizon: 'LONG',
    category: 'EQUITY',
  },
];

const FILTERS = ['ALL', 'EQUITY', 'CRYPTO', 'REAL_ESTATE', 'CASH'];

export default function AssetVault({ images }) {
  const [filter, setFilter] = useState('ALL');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const filtered = filter === 'ALL' ? ASSETS : ASSETS.filter(a => a.category === filter);

  return (
    <section id="assets" className="border-t-2 border-foreground">
      {}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-foreground">
        <div className="lg:col-span-8 p-6 md:p-12">
          <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">
            SECTION_02 
          </p>
          <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.05em] leading-[0.9]">
            THE ASSET<br />VAULT
          </h2>
        </div>
        <div className="lg:col-span-4 p-6 border-t-2 lg:border-t-0 lg:border-l-2 border-foreground flex flex-col justify-center">
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-3">
            FILTER_BY_CLASS
          </p>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border-2 border-foreground transition-all btn-invert ${
                  filter === f ? 'bg-foreground text-background' : 'bg-transparent'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((asset, i) => (
            <motion.div
              key={asset.ticker}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="border-b-2 border-r-2 border-foreground relative overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={images[i % images.length]}
                  alt={`Asset visualization for ${asset.name}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/60 group-hover:bg-foreground/80 transition-colors" />
                
                {}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-background/60 tracking-wider">
                      {asset.category}
                    </span>
                    <span className={`text-[11px] font-mono font-bold ${
                      asset.roi.startsWith('+') ? 'text-accent' : 'text-destructive'
                    }`}>
                      {asset.roi}
                    </span>
                  </div>
                  
                  <div>
                    <p className="font-heading font-black text-background text-xl uppercase tracking-tight">
                      {asset.name}
                    </p>
                    <p className="text-background/60 text-[11px] font-mono mt-1">
                      {asset.ticker}
                    </p>
                  </div>
                </div>
              </div>

              {}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: hoveredIdx === i ? 'auto' : 0 }}
                className="overflow-hidden bg-foreground text-background"
              >
                <div className="p-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[9px] font-mono text-background/50">BUY_IN</p>
                    <p className="text-sm font-mono font-bold">{asset.buyIn}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-background/50">CURRENT</p>
                    <p className="text-sm font-mono font-bold">{asset.current}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-background/50">RISK_GRADE</p>
                    <p className="text-sm font-mono font-bold">{asset.risk}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-background/50">LIQUIDITY</p>
                    <p className="text-sm font-mono font-bold">{asset.liquidity}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}