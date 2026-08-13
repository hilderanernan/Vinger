import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export interface BottomNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Ikon untuk Feed (kiri) */
  iconFeed?: React.ReactNode;
  /** Ikon untuk Profile (kanan) */
  iconProfile?: React.ReactNode;
  /** Ikon untuk tombol Record (tengah) – wajib diisi agar terlihat jelas */
  iconRecord?: React.ReactNode;
}

// Default icons (simple SVG) – fallback jika tidak diberikan
const defaultIconFeed = (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
    />
  </svg>
);

const defaultIconRecord = (
  <svg
    className="h-7 w-7"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" fill="currentColor" />
  </svg>
);

const defaultIconProfile = (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

/**
 * BottomNav – navigasi utama mobile-first.
 * - Feed (kiri), Record (tengah mengapung), Profile (kanan)
 * - Highlight aktif berdasarkan pathname
 * - Record button lebih besar dan menonjol
 */
const BottomNav = React.forwardRef<HTMLElement, BottomNavProps>(
  (
    {
      className,
      iconFeed = defaultIconFeed,
      iconRecord = defaultIconRecord,
      iconProfile = defaultIconProfile,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname();

    const isFeedActive = pathname === '/';
    const isProfileActive = pathname === '/profile';

    return (
      <nav
        ref={ref}
        className={twMerge(
          'fixed bottom-0 left-0 right-0 z-40',
          'bg-surface border-t border-border',
          'flex items-end justify-around px-2',
          'h-16', // height dasar
          className
        )}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        {...props}
      >
        {/* Feed */}
        <Link
          href="/"
          className={twMerge(
            'flex flex-col items-center gap-0.5 pb-1.5 text-xs',
            'transition-colors duration-200',
            isFeedActive ? 'text-primary' : 'text-secondary'
          )}
        >
          {iconFeed}
          <span className="text-[10px]">Feed</span>
        </Link>

        {/* Record – tombol mengapung di tengah */}
        <div className="relative -mt-6 flex items-center justify-center">
          <Link
            href="/record"
            className={twMerge(
              'flex h-14 w-14 items-center justify-center rounded-full',
              'bg-primary text-text shadow-lg',
              'border-4 border-background', // agar terlihat melayang
              'hover:bg-indigo-600 active:scale-95 transition-transform',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            )}
            aria-label="Rekam voice note"
          >
            {iconRecord}
          </Link>
        </div>

        {/* Profile */}
        <Link
          href="/profile"
          className={twMerge(
            'flex flex-col items-center gap-0.5 pb-1.5 text-xs',
            'transition-colors duration-200',
            isProfileActive ? 'text-primary' : 'text-secondary'
          )}
        >
          {iconProfile}
          <span className="text-[10px]">Profile</span>
        </Link>
      </nav>
    );
  }
);

BottomNav.displayName = 'BottomNav';

export default BottomNav;
