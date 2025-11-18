
import React from 'react';
import { Home, Key, ShoppingCart, Info, FileText, Shield } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'access', label: 'Access', icon: <Key className="w-4 h-4" /> },
    { id: 'buy', label: 'Exchange', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'blogs', label: 'Insights', icon: <FileText className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[600px]">
      <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-full px-2 py-2 shadow-2xl ring-1 ring-black/50 flex items-center justify-between">
        
        {/* Mobile/Compact Logo */}
        <div 
            className="pl-4 pr-2 flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
        >
            <div className="w-8 h-8 bg-primary-500/10 rounded-full flex items-center justify-center border border-primary-500/20 group-hover:border-primary-500/50 transition-colors">
                <Shield className="w-4 h-4 text-primary-500" />
            </div>
            <span className="font-bold text-white text-sm hidden sm:block tracking-tight">Tether<span className="text-primary-500">OS</span></span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2
                ${currentView === item.id 
                  ? 'text-black bg-primary-500 shadow-[0_0_20px_rgba(38,161,123,0.4)]' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'}
              `}
            >
              {item.icon}
              <span className={`${currentView === item.id ? 'block' : 'hidden sm:block'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
