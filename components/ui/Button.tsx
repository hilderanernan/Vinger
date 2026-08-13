import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

// --- Definisi variant dengan cva (opsional, tapi lebih rapi) ---
// Jika tidak mau install class-variance-authority, kita bisa pakai objek manual.
// Di sini saya pakai pendekatan manual agar tidak tambah dependency.

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Icon node yang akan ditampilkan di kiri (default) atau kanan */
  icon?: React.ReactNode;
  /** Posisi icon: 'left' atau 'right' */
  iconPosition?: 'left' | 'right';
  /** Menampilkan state loading (disable otomatis) */
  isLoading?: boolean;
  /** Variant tombol */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Ukuran tombol */
  size?: 'sm' | 'md' | 'lg';
  /** Konten tombol */
  children?: React.ReactNode;
}

// Helper untuk menggabungkan class
const buttonVariants = {
  variant: {
    primary:
      'bg-primary text-text hover:bg-indigo-500 active:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    secondary:
      'border border-primary text-primary bg-transparent hover:bg-surface hover:border-primary/80 active:bg-surface-hover',
    ghost:
      'text-text-secondary hover:text-text hover:bg-surface/50 active:bg-surface-hover',
  },
  size: {
    sm: 'px-3 py-1.5 text-body',
    md: 'px-5 py-2.5 text-body',
    lg: 'px-8 py-4 text-heading', // chunky
  },
} as const;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      isLoading = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    // Base classes (selalu ada)
    const baseClasses =
      'inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-all duration-200 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    // Class berdasarkan variant & size
    const variantClasses = buttonVariants.variant[variant];
    const sizeClasses = buttonVariants.size[size];

    // Spinner kecil (SVG animasi)
    const spinner = (
      <svg
        className="h-4 w-4 animate-spin text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Jika loading, tombol di-disable dan tampilkan spinner
    const isDisabled = disabled || isLoading;

    // Urutan konten: icon (kiri) + children + icon (kanan) + spinner
    const content = (
      <>
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        {children && <span>{children}</span>}
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        {isLoading && <span className="shrink-0">{spinner}</span>}
      </>
    );

    return (
      <button
        ref={ref}
        className={twMerge(baseClasses, variantClasses, sizeClasses, className)}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
