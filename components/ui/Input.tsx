import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ icon, className = '', ...props }) => {
  return (
    <div className="relative group">
      {/* Focus Glow Background */}
      <div className="absolute -inset-1 bg-primary-500/20 rounded-lg opacity-0 group-focus-within:opacity-100 blur-xl transition duration-500"></div>
      
      <div className="relative overflow-hidden rounded-lg bg-zinc-900/80 border border-white/10 group-focus-within:border-primary-500/50 transition-colors duration-300">
        
        <input
          className={`
            w-full 
            bg-transparent
            text-white 
            font-mono
            text-sm 
            px-4 py-4 
            pl-4
            outline-none 
            placeholder-zinc-700
            ${icon ? 'pr-12' : ''}
            ${className}
          `}
          {...props}
        />
        
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600 group-focus-within:text-primary-400 transition-colors duration-300">
            {icon}
          </div>
        )}

        {/* Animated Scanning Bottom Border */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-zinc-800">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-primary-500 to-transparent -translate-x-full group-focus-within:animate-scan opacity-0 group-focus-within:opacity-100"></div>
        </div>
      </div>
    </div>
  );
};

export default Input;