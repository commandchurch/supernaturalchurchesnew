import React from 'react';
import { cn } from '../../lib/utils';

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'supernatural' | 'animated';
  children: React.ReactNode;
}

const EnhancedCardComponent = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseClasses = "rounded-lg border bg-card text-card-foreground shadow-sm";

    const variants = {
      default: "border-gray-200 bg-white",
      gradient: "border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm",
      supernatural: "border-supernatural-accent bg-gradient-to-br bg-supernatural-gradient backdrop-blur-sm",
      animated: "border-orange-500 bg-gradient-to-br from-orange-500 to-red-500 backdrop-blur-sm animate-pulse"
    };

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

EnhancedCardComponent.displayName = "EnhancedCard";

export const EnhancedCard = React.memo(EnhancedCardComponent);
EnhancedCard.displayName = "EnhancedCard";

const EnhancedCardHeaderComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

EnhancedCardHeaderComponent.displayName = "EnhancedCardHeader";

export const EnhancedCardHeader = React.memo(EnhancedCardHeaderComponent);

const EnhancedCardTitleComponent = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { gradient?: boolean }
>(({ className, gradient, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      gradient && "bg-supernatural-gradient bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
));

EnhancedCardTitleComponent.displayName = "EnhancedCardTitle";

export const EnhancedCardTitle = React.memo(EnhancedCardTitleComponent);

const EnhancedCardDescriptionComponent = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

EnhancedCardDescriptionComponent.displayName = "EnhancedCardDescription";

export const EnhancedCardDescription = React.memo(EnhancedCardDescriptionComponent);

const EnhancedCardContentComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

EnhancedCardContentComponent.displayName = "EnhancedCardContent";

export const EnhancedCardContent = React.memo(EnhancedCardContentComponent);

const EnhancedCardFooterComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

EnhancedCardFooterComponent.displayName = "EnhancedCardFooter";

export const EnhancedCardFooter = React.memo(EnhancedCardFooterComponent);
