import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a random referral code
export function generateReferralCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const length = 8;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}

// Create a referral link using the provided referral code
export function createReferralLink(referralCode: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}?ref=${referralCode}`;
}

// Extract referral code from URL if present
export function getReferralCodeFromUrl(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('ref');
}

// Format large numbers with K suffix for thousands
export function formatNumber(num: number): string {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num.toString();
}

// Calculate position improvement based on referrals
export function calculatePositionImprovement(referralCount: number): number {
  // Each referral improves position by 10 spots
  return referralCount * 10;
}