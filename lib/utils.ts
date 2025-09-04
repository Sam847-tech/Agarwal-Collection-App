import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely formats a date string, number, or Date object.
 * Returns fallback if invalid.
 */
export function formatDateSafe(
  value: string | number | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions,
  locale: string = "en-IN",
  fallback: string = "—"
): string {
  if (!value) return fallback

  const date = new Date(value)
  if (isNaN(date.getTime())) return fallback

  try {
    return date.toLocaleDateString(locale, options)
  } catch {
    return fallback
  }
}

/**
 * Safely formats a time string from a date input.
 */
export function formatTimeSafe(
  value: string | number | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" },
  locale: string = "en-IN",
  fallback: string = ""
): string {
  if (!value) return fallback

  const date = new Date(value)
  if (isNaN(date.getTime())) return fallback

  try {
    return date.toLocaleTimeString(locale, options)
  } catch {
    return fallback
  }
}
