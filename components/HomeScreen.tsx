
import React from 'react';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import Button from './ui/Button';

interface HomeScreenProps {
    onNavigate: (view: any) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <main className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-mono mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            V3.0 LIVE: INSTITUTIONAL GATEWAY OPEN
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Secure Transactions</span>
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Access the world's most trusted stablecoin infrastructure. 
            End-to-end encrypted authentication for high-volume USDT operations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <Button onClick={() => onNavigate('access')} className="w-full sm:w-auto min-w-[160px]">
              Access Gateway
            </Button>
            <Button variant="secondary" onClick={() => onNavigate('about')} className="w-full sm:w-auto min-w-[160px]">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:border-primary-500/30 transition-all group">
            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Bank-Grade Security</h3>
            <p className="text-zinc-500 leading-relaxed">
              Multi-layer encryption protocols ensuring your assets are protected by the highest industry standards.
            </p>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:border-primary-500/30 transition-all group">
            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Settlement</h3>
            <p className="text-zinc-500 leading-relaxed">
              Lightning-fast execution for USD to USDT swaps. Zero latency infrastructure for institutional needs.
            </p>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:border-primary-500/30 transition-all group">
            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Global Compliance</h3>
            <p className="text-zinc-500 leading-relaxed">
              Fully compliant with international financial regulations, providing a safe harbor for your digital assets.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;
