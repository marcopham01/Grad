import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Số giả ngẫu nhiên 0..1 cố định theo (seed, i): mép giấy xé, dãy núi giữ nguyên giữa các lần render
export function rand(seed: number, i: number) {
  const x = Math.sin(seed * 78.233 + i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
