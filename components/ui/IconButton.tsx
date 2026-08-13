import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon node (React component) */
  icon: React.ReactNode;
  /** Ukuran tombol */
  size?: 'sm' | 'md' | 'lg';
  /** Variant tampilan */
  variant?: 'default' | 'active' | 'danger';
  /** Label aksesibilitas (wajib) */
  'aria-label': string;
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
} as const;

const variantMap = {
  default: 'bg-surface text-secondary hover:bg-surface-hover',
  active: 'bg-primary text-text hover:bg-indigo-600 active:bg-indigo-700',
  danger: 'bg-surface text-error hover:bg-error/10 active:bg-error/20',
} as const;

/**
 * IconButton – tombol bulat dengan ikon.
 * Digunakan untuk play/pause, like, record, dan aksi ikonik lainnya.
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon,
      size = 'md',
      variant = 'default',
      disabled = false,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          'inline-flex items-center justify-center rounded-full transition-all duration-200 ease-in-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'active:scale-95',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          sizeMap[size],
          variantMap[variant],
          className
        )}
        disabled={disabled}
        aria-label={ariaLabel}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
