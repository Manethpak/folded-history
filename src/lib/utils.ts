import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFavicon(url: string, size: string = "24"): string {
  return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url.includes("https://") ? url : "https://" + url}&size=${size}`
}

export function getDomain(url: string | URL): string {
  return new URL(url).hostname
}
