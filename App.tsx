
import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import LoginScreen from './components/LoginScreen';
import BuyScreen from './components/BuyScreen';
import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';
import BlogScreen from './components/BlogScreen';

type ViewState = 'home' | 'access' | 'buy' | 'about' | 'blogs';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const config = {
      particleCount: 60,
      connectionDistance: 150,
      mouseDistance: 200,
      baseSpeed: 0.5,
      color: 'rgba(38, 161, 123, 0.5)', // Tether Green
      lineColor: 'rgba(38, 161, 123, 0.15)'
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * config.baseSpeed;
        this.vy = (Math.random() - 0.5) * config.baseSpeed;
        this.size = Math.random() * 2 + 1;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = config.color;
        context.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);

        for (let i = index + 1; i < particles.length; i++) {
          const p2 = particles[i];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 1 - distance / config.connectionDistance;
            ctx.strokeStyle = config.lineColor.replace('0.15)', `${opacity * 0.15})`);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const renderContent = () => {
    switch(currentView) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentView} />;
      case 'access':
        return <LoginScreen onNavigateToBuy={() => setCurrentView('buy')} />;
      case 'buy':
        return <BuyScreen />;
      case 'about':
        return <AboutScreen />;
      case 'blogs':
        return <BlogScreen />;
      default:
        return <HomeScreen onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col relative overflow-hidden selection:bg-primary-500/30 selection:text-primary-200 font-sans">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-noise opacity-25 mix-blend-overlay z-[1]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_95%)] z-[2]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:50px_50px] z-[0]"></div>
      </div>

      {/* Navigation */}
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      {/* Community Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 animate-fade-in-up">
        <a 
          href="https://t.me/RecentCoders" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-zinc-900/80 backdrop-blur-md border border-white/10 pl-4 pr-2 py-2 rounded-full hover:border-primary-500/50 transition-all hover:scale-105 shadow-lg hover:shadow-primary-500/20 cursor-pointer text-decoration-none"
        >
          <div className="flex flex-col items-end leading-none mr-1">
             <span className="text-[10px] font-mono text-zinc-400 group-hover:text-primary-400 tracking-wider uppercase">Community</span>
             <span className="text-[9px] text-zinc-600 group-hover:text-zinc-500">Get Help</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors border border-white/5 group-hover:border-primary-500/30">
            <MessageCircle className="w-4 h-4 text-zinc-300 group-hover:text-primary-400" />
          </div>
        </a>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen pt-20">
        {renderContent()}
        <Footer onNavigate={setCurrentView} />
      </div>
    </div>
  );
};

export default App;
