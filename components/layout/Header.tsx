import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Avatar from '@/components/ui/Avatar';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Nama pengguna untuk avatar fallback */
  displayName?: string;
  /** URL avatar (opsional) */
  avatarSrc?: string | null;
}

/**
 * Header – fixed top bar dengan logo dan avatar profil.
 * Menggunakan backdrop blur dan border bawah tipis.
 */
const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, displayName = 'User', avatarSrc, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={twMerge(
          'fixed top-0 left-0 right-0 z-50 h-14',
          'bg-background/80 backdrop-blur-md border-b border-border',
          'flex items-center',
          className
        )}
        {...props}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:text-indigo-400 transition-colors"
          >
            Vinger
          </Link>

          {/* Right: Avatar profile */}
          <Link href="#" className="block">
            <Avatar
              size="sm"
              displayName={displayName}
              src={avatarSrc}
            />
          </Link>
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

export default Header;
