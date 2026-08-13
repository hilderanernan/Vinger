import React, { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { twMerge } from 'tailwind-merge';

export interface AvatarProps {
  /** URL gambar profil (opsional) */
  src?: string | null;
  /** Nama tampilan untuk fallback initial */
  displayName: string;
  /** Ukuran avatar */
  size?: 'sm' | 'md' | 'lg';
  /** Indikasi bahwa user ini memiliki voice post yang sedang diputar */
  isPlaying?: boolean;
  /** Class tambahan */
  className?: string;
}

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 80,
} as const;

const Avatar: React.FC<AvatarProps> = ({
  src,
  displayName,
  size = 'md',
  isPlaying = false,
  className,
}) => {
  const [imgError, setImgError] = useState(false);
  const pixelSize = sizeMap[size];

  // Generate initial fallback (1-2 huruf kapital)
  const initials = displayName
    .split(' ')
    .filter((word) => word.length > 0)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // Jika src kosong/null atau gagal load, tampilkan fallback
  const showFallback = !src || imgError;

  return (
    <div
      className={twMerge(
        'relative inline-block shrink-0 rounded-full',
        // Ukuran sesuai size
        `h-${pixelSize} w-${pixelSize}`,
        // Container untuk ring animasi (jika isPlaying)
        isPlaying && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
        className
      )}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {showFallback ? (
        // Fallback dengan initial
        <div
          className="flex h-full w-full items-center justify-center rounded-full bg-surface text-text-primary text-base font-semibold uppercase"
          style={{ fontSize: pixelSize * 0.4 }}
        >
          {initials || '?'}
        </div>
      ) : (
        <Image
          src={src}
          alt={displayName}
          width={pixelSize}
          height={pixelSize}
          className="rounded-full object-cover"
          onError={() => setImgError(true)}
          priority={size === 'lg'} // profile picture dianggap penting
        />
      )}

      {/* Indikator "Playing" berupa gelombang/glow di sekeliling avatar */}
      {isPlaying && (
        <div className="absolute inset-0 rounded-full animate-pulse ring-2 ring-primary ring-offset-2 ring-offset-background" />
      )}
    </div>
  );
};

export default Avatar;
