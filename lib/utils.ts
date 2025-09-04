import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind + conditional classes
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safe date formatter for orders
 */
export function formatDate(date: any): string {
  if (!date) return "—"
  const d = new Date(date)
  if (isNaN(d.getTime())) return "—"
  return `${d.toLocaleDateString()} • ${d.toLocaleTimeString()}`
}
