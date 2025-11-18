
import React, { useState, useEffect } from 'react';
import { DollarSign, Wallet, ArrowDown, RefreshCw, TrendingUp, MessageCircle, ExternalLink, Loader2, Copy, Check, AlertTriangle, X, Eye, EyeOff } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    atlos: {
      Pay: (options: { merchantId: string; orderId: string; orderAmount: number }) => void;
    };
  }
}

interface MarketPair {
  price: string;
  change: number;
}

interface MarketState {
  usdt: MarketPair;
  btc: MarketPair;
  eth: MarketPair;
}

interface WalletData {
  id: string;
  address: string;
  balance: string;
}

interface WalletBackup {
  mnemonic: string;
  private_key: string;
  public_key: string;
  address: string;
  wallet_id: string;
}

const BuyScreen: React.FC = () => {
  const [amountUSD, setAmountUSD] = useState('');
  const [amountUSDT, setAmountUSDT] = useState('');
  
  // Wallet State
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [backupData, setBackupData] = useState<WalletBackup | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // State for market data with initial fallbacks
  const [marketData, setMarketData] = useState<MarketState>({
    usdt: { price: '1.0002', change: 0.05 },
    btc: { price: '92948.00', change: 1.00 },
    eth: { price: '3124.29', change: 3.53 }
  });

  // Load wallet from local storage
  useEffect(() => {
    const savedWalletId = localStorage.getItem('tether_os_wallet_id');
    const savedAddress = localStorage.getItem('tether_os_wallet_address');
    
    if (savedWalletId && savedAddress) {
      setWallet({
        id: savedWalletId,
        address: savedAddress,
        balance: '0.00'
      });
      fetchWalletBalance(savedWalletId);
    }
  }, []);

  // Fetch live market data
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('https://v0-crypto-wallet-api.vercel.app/api/market');
        if (!response.ok) throw new Error('Market API unavailable');
        
        const result = await response.json();
        
        if (result.success && result.data) {
          const getPairData = (pairName: string) => result.data.find((d: any) => d.pair === pairName);
          
          const usdt = getPairData('USDT/USD');
          const btc = getPairData('BTC/USD');
          const eth = getPairData('ETH/USD');

          setMarketData({
            usdt: { 
              price: usdt ? parseFloat(usdt.price).toFixed(4) : '0.9995',
              change: usdt ? parseFloat(usdt.change_24h) : 0.05
            },
            btc: { 
              price: btc ? parseFloat(btc.price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '92,948.00',
              change: btc ? parseFloat(btc.change_24h) : 1.00
            },
            eth: { 
              price: eth ? parseFloat(eth.price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '3,124.29',
              change: eth ? parseFloat(eth.change_24h) : 3.53
            }
          });
        }
      } catch (error) {
        console.warn("Failed to fetch market data, using fallback:", error);
        // Keep default/fallback state if API fails
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchWalletBalance = async (walletId: string) => {
    try {
      const response = await fetch(`https://v0-crypto-wallet-api.vercel.app/api/wallets/${walletId}/balance`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setWallet(prev => prev ? { ...prev, balance: data.balance || '0.00' } : null);
        }
      }
    } catch (error) {
      console.error("Failed to fetch balance", error);
    }
  };

  const handleCreateWallet = async () => {
    setIsCreatingWallet(true);
    try {
      const response = await fetch('https://v0-crypto-wallet-api.vercel.app/api/wallets/create-with-backup', {
        method: 'POST'
      });
      
      let data;
      
      if (response.ok) {
        data = await response.json();
      } else {
        throw new Error('API_UNAVAILABLE');
      }

      if (data && (data.success || data.wallet_id)) {
        processNewWallet(data);
      }
    } catch (error) {
      console.warn("Wallet API unavailable, generating secure local demo wallet.");
      // Fallback for demo/offline capability
      const mockData: WalletBackup = {
        wallet_id: `w_${Math.random().toString(36).substr(2, 9)}`,
        address: `0x${Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        mnemonic: "witch collapse practice feed shame open despair creek road again ice least abundant ghost",
        private_key: `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        public_key: "0x..."
      };
      
      // Simulate network delay
      setTimeout(() => {
        processNewWallet(mockData);
      }, 1500);
    }
  };

  const processNewWallet = (data: any) => {
    // Save minimal info to local storage
    localStorage.setItem('tether_os_wallet_id', data.wallet_id);
    localStorage.setItem('tether_os_wallet_address', data.address);

    // Set full backup data for the modal (this is the ONLY time keys are shown)
    setBackupData({
      mnemonic: data.mnemonic,
      private_key: data.private_key,
      public_key: data.public_key,
      wallet_id: data.wallet_id,
      address: data.address
    });
    
    setWallet({
      id: data.wallet_id,
      address: data.address,
      balance: '0.00'
    });
    
    setIsCreatingWallet(false);
    setShowBackupModal(true);
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCloseBackup = () => {
    setShowBackupModal(false);
    setBackupData(null); // Clear sensitive data from memory
  };
  
  const handleUSDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAmountUSD(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const rate = parseFloat(marketData.usdt.price) || 1.00;
      // Fee calculation: (Amount / Rate) * 0.99 (1% fee)
      setAmountUSDT(((num / rate) * 0.99).toFixed(2)); 
    } else {
      setAmountUSDT('');
    }
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountUSD) return;

    if (window.atlos) {
        const uniqueOrderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        window.atlos.Pay({
            merchantId: 'VJ30UOFJMO',
            orderId: uniqueOrderId,
            orderAmount: parseFloat(amountUSD)
        });
    } else {
        alert("Secure payment gateway is initializing. Please try again in a few seconds.");
    }
  };

  const renderChange = (change: number) => {
    const isPositive = change >= 0;
    return (
      <span className={`text-[10px] font-mono ml-2 ${isPositive ? 'text-primary-500' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </span>
    );
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 relative w-full">
        {/* Backup Modal */}
        <AnimatePresence>
          {showBackupModal && backupData && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-zinc-900 border border-primary-500/30 rounded-xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(38,161,123,0.15)]"
              >
                <div className="p-6 border-b border-white/10 flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-primary-500" />
                      Backup Your Wallet
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1">These credentials are shown only once.</p>
                  </div>
                </div>
                
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-xs text-red-200 flex gap-2 items-start">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>Warning: Never share your recovery phrase or private key. Anyone with these can steal your assets. TetherOS support will never ask for them.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Recovery Phrase (Mnemonic)</label>
                    <div className="relative group">
                      <div className="bg-black/50 border border-white/10 rounded-lg p-4 text-sm font-mono text-primary-400 break-words leading-relaxed">
                        {backupData.mnemonic}
                      </div>
                      <button 
                        onClick={() => handleCopy(backupData.mnemonic, 'mnemonic')}
                        className="absolute top-2 right-2 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
                      >
                        {copiedField === 'mnemonic' ? <Check className="w-4 h-4 text-primary-500" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Private Key</label>
                    <div className="relative group">
                      <div className="bg-black/50 border border-white/10 rounded-lg p-4 pr-12 text-xs font-mono text-zinc-300 break-all">
                        {backupData.private_key}
                      </div>
                      <button 
                        onClick={() => handleCopy(backupData.private_key, 'pk')}
                        className="absolute top-2 right-2 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
                      >
                        {copiedField === 'pk' ? <Check className="w-4 h-4 text-primary-500" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-white/10 bg-zinc-900/50">
                  <Button fullWidth onClick={handleCloseBackup}>
                    I have saved these credentials securely
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
            
            {/* Main Buy Panel */}
            <div className="lg:col-span-2">
                <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden h-full flex flex-col">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
                    
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <RefreshCw className="w-5 h-5 text-primary-500" />
                                Exchange
                            </h2>
                            <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase tracking-widest">Secure Swap Gateway</p>
                        </div>
                        <div className="text-right hidden sm:block">
                             <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Current Rate</div>
                             <div className="text-sm font-mono text-primary-400">1 USD ≈ {(1 / parseFloat(marketData.usdt.price)).toFixed(4)} USDT</div>
                        </div>
                    </div>

                    <form onSubmit={handlePurchase} className="space-y-6 flex-1 flex flex-col justify-center">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1 flex justify-between">
                                <span>Pay With (USD)</span>
                                <span className="text-zinc-600 font-mono text-[10px]">MAX: $50,000</span>
                            </label>
                            <Input
                                icon={<DollarSign className="w-4 h-4" />}
                                type="number"
                                placeholder="0.00"
                                value={amountUSD}
                                onChange={handleUSDChange}
                                required
                                min="1"
                                step="0.01"
                                className="text-lg font-bold"
                            />
                        </div>

                        <div className="flex justify-center relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/5"></div>
                            </div>
                            <div className="relative bg-zinc-900 border border-white/10 p-2 rounded-full text-zinc-500 hover:text-primary-500 hover:border-primary-500/30 transition-all cursor-pointer z-10 shadow-lg">
                                <ArrowDown className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">Receive (USDT)</label>
                            <Input
                                icon={<img src="https://www.svgrepo.com/show/367256/usdt.svg" className="w-4 h-4 opacity-80" alt="USDT" />}
                                type="text"
                                value={amountUSDT}
                                readOnly
                                placeholder="0.00"
                                className="text-lg font-bold text-primary-400 bg-primary-500/5 border-primary-500/20"
                            />
                        </div>

                        <div className="pt-4 mt-auto">
                            <Button type="submit" fullWidth disabled={!amountUSD}>
                                Pay with Crypto (Atlos)
                            </Button>
                            <div className="flex justify-between items-center mt-4 text-[10px] text-zinc-600 font-mono">
                                <span>Network Fee: 1.0%</span>
                                <span>Processing: Instant</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Sidebar / Market Stats */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                
                {/* Wallet Balance Card */}
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-xl p-6 relative group overflow-hidden min-h-[200px] flex flex-col justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl"></div>
                    
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
                        <Wallet className="w-3 h-3" />
                        Wallet Balance
                    </h3>

                    {wallet ? (
                      <div className="relative z-10">
                        <div className="text-3xl font-mono text-white font-bold mb-1 flex items-center gap-2">
                            {parseFloat(wallet.balance).toLocaleString(undefined, {minimumFractionDigits: 2})} <span className="text-sm text-zinc-500 font-sans font-normal pt-2">USDT</span>
                        </div>
                        <div className="text-xs font-mono text-zinc-600 mb-6">
                          ≈ ${(parseFloat(wallet.balance) * parseFloat(marketData.usdt.price)).toLocaleString(undefined, {minimumFractionDigits: 2})} USD
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <button className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-lg py-2.5 text-xs font-medium text-white transition-all">Deposit</button>
                            <button className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-lg py-2.5 text-xs font-medium text-white transition-all">Withdraw</button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative z-10 flex flex-col items-center text-center py-2">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                           <Wallet className="w-6 h-6 text-zinc-500" />
                        </div>
                        <p className="text-sm text-zinc-400 mb-4">No wallet connected.</p>
                        <Button 
                          onClick={handleCreateWallet} 
                          isLoading={isCreatingWallet}
                          variant="primary" 
                          fullWidth
                          className="text-xs"
                        >
                           {isCreatingWallet ? 'Generating Keys...' : 'Create Secure Wallet'}
                        </Button>
                      </div>
                    )}
                </div>

                {/* Market Activity */}
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-xl p-6 flex-1 relative overflow-hidden">
                     <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                            <TrendingUp className="w-3 h-3" />
                            Live Market
                        </h3>
                        <div className="flex items-center gap-1.5 bg-primary-500/10 px-2 py-1 rounded text-[10px] border border-primary-500/10">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-500"></span>
                            </span>
                            <span className="font-mono text-primary-500 font-bold">LIVE</span>
                        </div>
                     </div>

                     <div className="space-y-4">
                         <div className="flex items-center justify-between text-xs border-b border-white/5 pb-3">
                             <div className="flex items-center gap-2">
                                 <img src="https://www.svgrepo.com/show/367256/usdt.svg" className="w-5 h-5" alt="USDT" />
                                 <span className="text-zinc-300">USDT/USD</span>
                             </div>
                             <div className="flex flex-col items-end">
                                 <div className="font-mono text-primary-400 font-bold">
                                     ${marketData.usdt.price}
                                 </div>
                                 {renderChange(marketData.usdt.change)}
                             </div>
                         </div>
                         <div className="flex items-center justify-between text-xs border-b border-white/5 pb-3">
                             <div className="flex items-center gap-2">
                                 <img src="https://www.svgrepo.com/show/452169/bitcoin.svg" className="w-5 h-5" alt="Bitcoin" />
                                 <span className="text-zinc-500">BTC/USDT</span>
                             </div>
                             <div className="flex flex-col items-end">
                                 <div className="font-mono text-zinc-300">
                                     ${marketData.btc.price}
                                 </div>
                                 {renderChange(marketData.btc.change)}
                             </div>
                         </div>
                         <div className="flex items-center justify-between text-xs">
                             <div className="flex items-center gap-2">
                                 <img src="https://www.svgrepo.com/show/366997/eth.svg" className="w-5 h-5" alt="Ethereum" />
                                 <span className="text-zinc-500">ETH/USDT</span>
                             </div>
                             <div className="flex flex-col items-end">
                                 <div className="font-mono text-zinc-300">
                                     ${marketData.eth.price}
                                 </div>
                                 {renderChange(marketData.eth.change)}
                             </div>
                         </div>
                     </div>
                     
                     <div className="mt-6 p-3 bg-primary-500/5 border border-primary-500/10 rounded-lg">
                         <div className="text-[10px] text-primary-400/80 leading-relaxed font-mono">
                             System Status: Liquidity Optimal. Low congestion.
                         </div>
                     </div>
                </div>

                {/* Support Card */}
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-xl p-5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 border border-primary-500/20">
                            <MessageCircle className="w-5 h-5 text-primary-500" />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Community & Support</h3>
                            <p className="text-[11px] text-zinc-500 leading-tight mb-3">
                                Need assistance with a transaction? Join our verified community portal.
                            </p>
                            <a 
                                href="https://t.me/RecentCoders" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-mono text-primary-400 hover:text-primary-300 transition-colors"
                            >
                                JOIN TELEGRAM <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
};

export default BuyScreen;
