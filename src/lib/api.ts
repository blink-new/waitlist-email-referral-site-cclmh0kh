import { WaitlistEntry, ReferralStats } from '../types';
import { generateReferralCode, createReferralLink } from './utils';

// Mock database for storing waitlist entries (in a real app, this would be a backend API)
const waitlistEntries: WaitlistEntry[] = [];
let currentPosition = 1;

// Submit email to waitlist
export const submitToWaitlist = async (
  email: string, 
  referredBy?: string
): Promise<ReferralStats> => {
  // Check if email already exists
  const existingEntry = waitlistEntries.find(entry => entry.email === email);
  
  if (existingEntry) {
    // Return existing entry stats
    return {
      referralCode: existingEntry.referralCode,
      referralCount: existingEntry.referralCount,
      position: calculateFinalPosition(existingEntry),
      referralLink: createReferralLink(existingEntry.referralCode)
    };
  }
  
  // Generate a unique referral code
  const referralCode = generateReferralCode();
  
  // Create new entry
  const newEntry: WaitlistEntry = {
    email,
    referralCode,
    referredBy,
    referralCount: 0,
    position: currentPosition++,
    createdAt: new Date()
  };
  
  // If referred by someone, increment their referral count
  if (referredBy) {
    const referrer = waitlistEntries.find(entry => entry.referralCode === referredBy);
    if (referrer) {
      referrer.referralCount += 1;
    }
  }
  
  // Add to waitlist
  waitlistEntries.push(newEntry);
  
  // Return stats for the new entry
  return {
    referralCode,
    referralCount: 0,
    position: newEntry.position,
    referralLink: createReferralLink(referralCode)
  };
};

// Get referral stats for a specific user
export const getReferralStats = async (email: string): Promise<ReferralStats | null> => {
  const entry = waitlistEntries.find(entry => entry.email === email);
  
  if (!entry) {
    return null;
  }
  
  return {
    referralCode: entry.referralCode,
    referralCount: entry.referralCount,
    position: calculateFinalPosition(entry),
    referralLink: createReferralLink(entry.referralCode)
  };
};

// Calculate final position based on referrals (each referral moves you up by 10 positions)
function calculateFinalPosition(entry: WaitlistEntry): number {
  const positionImprovement = entry.referralCount * 10;
  return Math.max(1, entry.position - positionImprovement);
}

// Check if a referral code is valid
export const isValidReferralCode = async (code: string): Promise<boolean> => {
  return waitlistEntries.some(entry => entry.referralCode === code);
};