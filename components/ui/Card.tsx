import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Jika true, tambahkan efek hover dan cursor pointer (untuk card yang bisa diklik) */
  interactive?: boolean;
  /** Jika true, hilangkan padding default (untuk custom layout di dalam card) */
  noPadding?: boolean;
}

/**
 * Card adalah container utama untuk voice post item dan komponen sejenis.
 * Menggunakan background surface, border tipis, dan radius card dari konfigurasi.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, noPadding = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          'bg-surface rounded-card border border-border transition-colors duration-200',
          !noPadding && 'p-4',
          interactive && 'hover:bg-surface-hover cursor-pointer',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export default Card;
