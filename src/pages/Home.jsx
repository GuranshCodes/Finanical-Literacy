import React from 'react';
import Navbar from '../components/finance/Navbar';
import MetadataTicker from '../components/finance/MetadataTicker';
import CommandCenter from '../components/finance/CommandCenter';
import AboutSection from '../components/finance/AboutSection';
import ExpenseBreakdown from '../components/finance/ExpenseBreakdown';
import FlowLedger from '../components/finance/FlowLedger';
import MetricsPanel from '../components/finance/MetricsPanel';
import Footer from '../components/finance/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <Navbar />
      <MetadataTicker />
      <CommandCenter />
      <AboutSection />
      <ExpenseBreakdown />
      <FlowLedger />
      <MetricsPanel />
      <Footer />
    </div>
  );
}

