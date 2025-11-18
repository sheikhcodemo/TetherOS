
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const AboutScreen: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <main className="flex-1 w-full py-24 px-6 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Pioneering Digital Finance</h1>
          <p className="text-zinc-400 text-lg">The infrastructure layer for the modern digital economy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-zinc-500 leading-relaxed">
              TetherOS was built to bridge the gap between traditional fiat currency and the digital blockchain ecosystem. 
              We believe in a future where financial transactions are instantaneous, transparent, and accessible to everyone, everywhere.
            </p>
            <p className="text-zinc-500 leading-relaxed">
              By leveraging the stability of the US Dollar and the efficiency of blockchain technology, we provide a secure gateway for individuals and institutions to enter the crypto market.
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <ul className="space-y-4 relative z-10">
              {[
                '100% Reserve Backing',
                'Quarterly Audits',
                '24/7 Institutional Support',
                'Military-Grade Encryption',
                'Global Regulatory Compliance'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12">
           <h2 className="text-2xl font-bold text-white mb-10 text-center tracking-tight">Trusted By Industry Leaders</h2>
           
           <motion.div 
             className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center"
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
           >
               
               {/* Binance */}
               <motion.div 
                 variants={itemVariants}
                 className="w-full flex items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 group cursor-pointer"
               >
                   <img 
                     src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Binance_Logo.svg" 
                     alt="Binance" 
                     className="h-8 object-contain group-hover:scale-110 transition-transform duration-300" 
                   />
               </motion.div>

               {/* Ethereum */}
               <motion.div 
                 variants={itemVariants}
                 className="w-full flex items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 group cursor-pointer"
               >
                   <img 
                     src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" 
                     alt="Ethereum" 
                     className="h-12 object-contain group-hover:scale-110 transition-transform duration-300" 
                   />
               </motion.div>

               {/* Bitcoin */}
               <motion.div 
                 variants={itemVariants}
                 className="w-full flex items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 group cursor-pointer"
               >
                   <img 
                     src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" 
                     alt="Bitcoin" 
                     className="h-10 object-contain group-hover:scale-110 transition-transform duration-300" 
                   />
               </motion.div>

               {/* Circle */}
               <motion.div 
                 variants={itemVariants}
                 className="w-full flex items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 group cursor-pointer"
               >
                   <img 
                     src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Circle_USDC_Logo.svg" 
                     alt="Circle" 
                     className="h-8 object-contain group-hover:scale-110 transition-transform duration-300" 
                   />
               </motion.div>
           </motion.div>
        </div>
      </div>
    </main>
  );
};

export default AboutScreen;
