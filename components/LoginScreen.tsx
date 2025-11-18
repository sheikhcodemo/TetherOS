import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, ChevronRight, Activity, AlertCircle } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';

interface LoginScreenProps {
  onNavigateToBuy?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigateToBuy }) => {
  const [accessKey, setAccessKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && onNavigateToBuy) {
      // Short delay to show the success animation before switching views
      const timer = setTimeout(() => {
        onNavigateToBuy();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, onNavigateToBuy]);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.likhonsheikh.xyz/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessKey }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== false) {
        setIsAuthenticated(true);
      } else {
        // If server returns an error message use it, otherwise default to Invalid Key
        // If status is 500 range, implies server offline logic
        if (response.status >= 500) {
             setError('CONNECTION_REFUSED: SERVER OFFLINE');
        } else {
             setError(data.message || 'INVALID ACCESS KEY');
        }
        // Reset key on error for security
        setAccessKey('');
      }
    } catch (err) {
      console.error(err);
      // Network failures or fetch errors
      setError('CONNECTION_REFUSED: SERVER OFFLINE');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
      
      <div className="w-full max-w-[460px] flex flex-col items-center animate-fade-in-up relative">
        
        {/* Logo Section */}
        <div className="mb-12 flex flex-col items-center relative group">
          {/* Glowing effect behind logo */}
          <div className={`absolute inset-0 bg-primary-500 rounded-full blur-[40px] transition-opacity duration-1000 ${isAuthenticated ? 'opacity-40 scale-125' : 'opacity-15 group-hover:opacity-25'}`}></div>
          
          <div className={`relative w-24 h-24 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_-10px_rgba(38,161,123,0.4)] ring-1 ring-white/5 transition-all duration-500 ${isAuthenticated ? 'scale-110 border-primary-500/50 shadow-[0_0_60px_-10px_rgba(38,161,123,0.6)]' : 'group-hover:scale-105'}`}>
            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/10 to-transparent transition-opacity duration-500 ${isAuthenticated ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/01/USDT_Logo.png" 
                alt="USDT" 
                className="w-14 h-14 object-contain drop-shadow-[0_0_15px_rgba(38,161,123,0.5)]"
            />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 text-center tracking-tight drop-shadow-lg">
            Tether <span className="text-primary-500 font-mono font-light">OS</span>
          </h1>
          <div className="flex items-center gap-2 text-xs font-mono text-primary-500/80 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">
            <span className={`w-1.5 h-1.5 bg-primary-500 rounded-full ${isAuthenticated ? 'animate-none shadow-[0_0_10px_rgba(38,161,123,1)]' : 'animate-pulse'}`}></span>
            {isAuthenticated ? 'CONNECTION SECURE' : 'ENCRYPTED CONNECTION'}
          </div>
        </div>

        {/* Glassmorphism Card with HUD Elements */}
        <div className="w-full relative group">
            
          {/* HUD Elements (Corners) */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary-500/30 rounded-tl-lg transition-all duration-500 group-hover:border-primary-500/60"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary-500/30 rounded-tr-lg transition-all duration-500 group-hover:border-primary-500/60"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary-500/30 rounded-bl-lg transition-all duration-500 group-hover:border-primary-500/60"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary-500/30 rounded-br-lg transition-all duration-500 group-hover:border-primary-500/60"></div>

          <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden min-h-[340px] flex flex-col justify-center transition-all duration-500">
            {/* Subtle moving gradient background inside card */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-50 pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {isAuthenticated ? (
                <div className="flex flex-col items-center text-center animate-fade-in-up z-10">
                    <div className="relative mb-6">
                         <div className="absolute inset-0 bg-primary-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                         <ShieldCheck className="w-16 h-16 text-primary-500 drop-shadow-[0_0_15px_rgba(38,161,123,0.8)] relative z-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Access Granted</h2>
                    <div className="text-xs font-mono text-primary-500 mb-8">IDENTITY CONFIRMED</div>
                    
                    <div className="w-full bg-zinc-900/50 border border-white/5 rounded-full h-1.5 overflow-hidden mb-2">
                        <div className="h-full bg-primary-500 shadow-[0_0_10px_rgba(38,161,123,0.8)] animate-scan" style={{width: '100%', animationDuration: '1.5s'}}></div>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest animate-pulse">
                        Redirecting to Exchange...
                    </p>
                </div>
            ) : (
                <form onSubmit={handleAuthenticate} className="space-y-8 relative z-10">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="access-key" className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">
                            Access Key
                            </label>
                            <div className="text-[10px] font-mono text-zinc-600 flex items-center gap-1">
                                <Activity className="w-3 h-3" />
                                VERIFICATION REQ.
                            </div>
                        </div>
                        
                        <div className="relative">
                            <Input
                                id="access-key"
                                type="password"
                                placeholder="Enter secure key..."
                                value={accessKey}
                                onChange={(e) => {
                                    setAccessKey(e.target.value);
                                    if (error) setError(null);
                                }}
                                icon={<Lock className="w-4 h-4" />}
                                autoFocus
                                className={error ? 'border-red-500/50 focus:border-red-500' : ''}
                            />
                            {error && (
                                <div className="absolute -bottom-6 left-0 flex items-center gap-1.5 text-[10px] text-red-400 font-mono animate-fade-in-up">
                                    <AlertCircle className="w-3 h-3" />
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        fullWidth 
                        isLoading={isLoading}
                    >
                        Authenticate
                        {!isLoading && <ChevronRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />}
                    </Button>

                    <div className="pt-2 text-center">
                        <p className="text-[10px] text-zinc-600 font-mono">
                            Protected by end-to-end 256-bit encryption.
                        </p>
                    </div>
                </form>
            )}
          </div>
        </div>
      </div>

    </main>
  );
};

export default LoginScreen;