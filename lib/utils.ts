import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Menggabungkan className secara kondisional dan menggabungkan kelas Tailwind
 * untuk menghindari konflik.
 *
 * @param inputs - Daftar className (string, objek, array, dll.)
 * @returns String className yang sudah digabung dan di-merge.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
