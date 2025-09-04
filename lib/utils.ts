// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// ✅ Utility for conditional Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ✅ Safe date formatter (fixes Vercel build error)
export function formatDateTime(date: string | Date | null | undefined) {
  if (!date) return "—"
  const d = new Date(date)
  if (isNaN(d.getTime())) return "—"
  return `${d.toLocaleDateString()} • ${d.toLocaleTimeString()}`
}
