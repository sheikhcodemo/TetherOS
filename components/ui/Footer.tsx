
import React from 'react';
import { ShieldCheck, Twitter, Github, ExternalLink } from 'lucide-react';

interface FooterProps {
    onNavigate: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-xl mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-primary-500" />
              <span className="text-xl font-bold text-white">Tether<span className="text-primary-500 font-mono">OS</span></span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-sm">
              Secure, decentralized gateway for authorized Tether (USDT) operations. 
              Providing institutional-grade encryption and real-time liquidity access since 2023.
            </p>
            <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-primary-500 hover:text-black transition-all">
                    <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-primary-500 hover:text-black transition-all">
                    <Github className="w-4 h-4" />
                </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-primary-500 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('access')} className="hover:text-primary-500 transition-colors">Secure Access</button></li>
              <li><button onClick={() => onNavigate('buy')} className="hover:text-primary-500 transition-colors">Exchange Gateway</button></li>
              <li><button onClick={() => onNavigate('blogs')} className="hover:text-primary-500 transition-colors">Market Insights</button></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><button onClick={() => onNavigate('about')} className="hover:text-primary-500 transition-colors">About Us</button></li>
              <li>
                  <a href="https://t.me/RecentCoders" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors flex items-center gap-1">
                      Community <ExternalLink className="w-3 h-3" />
                  </a>
              </li>
              <li><span className="cursor-not-allowed opacity-50">Privacy Policy</span></li>
              <li><span className="cursor-not-allowed opacity-50">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600 font-mono">
            © 2024 Tether Operations Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-zinc-700 font-mono">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              SYSTEM STATUS: OPERATIONAL
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
