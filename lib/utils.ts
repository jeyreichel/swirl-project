import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const displayFormattedPrice = (price: number): string => {
  // Convert the price to a fixed decimal string
  const fixedPrice = (price / 100).toFixed(2);
  return `$${fixedPrice}`;
};
