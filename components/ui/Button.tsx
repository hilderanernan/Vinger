import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary/90',
        secondary: 'bg-transparent border border-border text-text-primary hover:bg-surface-hover',
        ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover',
      },
      size: {
        sm: 'h-8 px-3 text-caption rounded-card',
        md: 'h-10 px-4 text-body rounded-card',
        lg: 'h-14 px-8 text-heading rounded-pill',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  /** Icon node yang akan ditampilkan di kiri (default) atau kanan */
  icon?: React.ReactNode;
  /** Posisi icon relatif terhadap teks */
  iconPosition?: 'left' | 'right';
  /** Menampilkan spinner loading dan otomatis disable tombol */
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      iconPosition = 'left',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="inline-flex">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="inline-flex">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
