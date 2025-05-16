export interface WaitlistEntry {
  email: string;
  referralCode: string;
  referredBy?: string; // Referral code of the person who referred this user
  referralCount: number; // Number of people this user has referred
  position: number; // Position on the waitlist
  createdAt: Date;
}

export interface ReferralStats {
  referralCode: string;
  referralCount: number;
  position: number;
  referralLink: string;
}