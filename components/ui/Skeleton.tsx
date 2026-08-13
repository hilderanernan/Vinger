import React from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lebar skeleton (bisa '100%', '200px', atau angka yang akan dianggap px) */
  width?: string | number;
  /** Tinggi skeleton (bisa '1.5rem', '20px', atau angka yang akan dianggap px) */
  height?: string | number;
  /** Radius sudut */
  rounded?: 'sm' | 'card' | 'pill' | 'full';
}

const roundedMap = {
  sm: 'rounded-sm',
  card: 'rounded-card',
  pill: 'rounded-pill',
  full: 'rounded-full',
} as const;

/**
 * Skeleton – placeholder dasar dengan animasi pulse.
 * Cocok untuk loading state di berbagai elemen.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width = '100%',
  height = '1rem',
  rounded = 'sm',
  ...props
}) => {
  // Konversi angka ke px
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={twMerge(
        'bg-surface-hover animate-pulse',
        roundedMap[rounded],
        className
      )}
      style={{ width: widthStyle, height: heightStyle }}
      {...props}
    />
  );
};

/**
 * VoicePostSkeleton – placeholder khusus untuk card voice post di feed.
 * Meniru struktur card voice post: avatar, nama user, timestamp, dan waveform.
 */
export const VoicePostSkeleton: React.FC = () => {
  return (
    <Card className="flex flex-col gap-3">
      {/* Baris atas: avatar + info */}
      <div className="flex items-center gap-3">
        <Skeleton rounded="full" width={40} height={40} />
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton rounded="sm" width="40%" height="1rem" />
          <Skeleton rounded="sm" width="25%" height="0.75rem" />
        </div>
      </div>
      {/* Baris bawah: waveform placeholder */}
      <Skeleton rounded="card" width="100%" height="2.5rem" />
    </Card>
  );
};

export default Skeleton;
