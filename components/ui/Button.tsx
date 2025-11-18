import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  isLoading, 
  fullWidth = false, 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden rounded-xl font-medium text-sm px-6 py-4 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center group";
  
  const variants = {
    primary: "bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white shadow-[0_0_20px_rgba(0,200,83,0.3)] hover:shadow-[0_0_35px_rgba(0,200,83,0.5)] border border-white/10 hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800",
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Shine effect overlay */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      
      <span className="relative z-20 flex items-center gap-2">
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Verifying Credential...
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

export default Button;