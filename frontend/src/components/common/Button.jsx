import React from 'react';

// A reusable premium button component
const Button = ({ 
  children, 
  variant = 'gold', // 'gold' | 'ghost' | 'ghost-white' | 'teal'
  size = 'md',      // 'sm' | 'md' | 'lg' | 'full'
  onClick, 
  className = '',
  type = 'button',
  disabled = false,
  icon = null
}) => {
  
  const baseClasses = "inline-flex items-center justify-center rounded-[50px] font-['Inter'] font-medium transition-all duration-300 focus:outline-none";
  
  const variants = {
    gold: "bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-light)] text-white shadow-[0_4px_14px_0_rgba(201,168,76,0.39)] hover:shadow-[0_6px_20px_rgba(201,168,76,0.5)] hover:-translate-y-0.5",
    ghost: "bg-transparent text-[var(--color-accent-gold)] border border-[var(--color-accent-gold)] hover:bg-[rgba(201,168,76,0.1)]",
    'ghost-white': "bg-transparent text-white border border-white hover:bg-[rgba(255,255,255,0.1)]",
    teal: "bg-[var(--color-teal-pop)] text-white shadow-md hover:-translate-y-0.5"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
    full: "w-full py-3 text-base"
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none" : "cursor-pointer";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
