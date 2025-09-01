import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'supernatural' | 'glow' | 'outline' | 'primary' | 'accent';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
}

export const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const sizeClasses = {
      sm: "h-9 px-3 text-xs",
      default: "h-10 px-4 py-2",
      lg: "h-11 px-8 text-base"
    };

    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
      accent: "bg-purple-600 text-white hover:bg-purple-700 shadow-lg",
      supernatural: "bg-gradient-to-r from-supernatural-accent-purple to-supernatural-accent-blue text-white hover:from-supernatural-accent-purple/90 hover:to-supernatural-accent-blue/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
      glow: "bg-gradient-to-r from-supernatural-accent-purple to-supernatural-accent-blue text-white shadow-lg shadow-supernatural-accent-purple/25 animate-pulse",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizeClasses[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
EnhancedButton.displayName = "EnhancedButton";

// Real-time Counter Component
interface RealTimeCounterProps {
  value: number;
  label?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export const RealTimeCounter: React.FC<RealTimeCounterProps> = ({
  value,
  label,
  prefix = '',
  suffix = '',
  className = '',
  duration = 2000
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setDisplayValue(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <div className={cn("text-center", className)}>
      <div className="text-3xl font-black">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      {label && <div className="text-sm text-gray-400 mt-1">{label}</div>}
    </div>
  );
};

// Real-time Badge Component
interface RealTimeBadgeProps {
  count: number;
  label: string;
  variant?: 'green' | 'pink' | 'blue' | 'purple';
  animate?: boolean;
  className?: string;
}

export const RealTimeBadge: React.FC<RealTimeBadgeProps> = ({
  count,
  label,
  variant = 'green',
  animate = false,
  className = ''
}) => {
  const variantClasses = {
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-sm text-xs font-medium",
      variantClasses[variant],
      animate && "animate-pulse",
      className
    )}>
      <div className="w-2 h-2 bg-current rounded-full animate-ping"></div>
      <span>{count > 0 ? count : ''} {label}</span>
    </div>
  );
};

// Floating Action Button Component
interface FloatingActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  animate?: boolean;
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  label,
  onClick,
  variant = 'primary',
  position = 'bottom-right',
  animate = false,
  className = ''
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-gray-500/25',
    accent: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/25'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
        positionClasses[position],
        variantClasses[variant],
        animate && "animate-bounce",
        className
      )}
      title={label}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};
