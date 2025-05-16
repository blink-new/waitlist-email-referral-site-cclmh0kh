import { useState } from 'react';
import { motion } from 'framer-motion';
import { ReferralStats } from '../types';
import { formatNumber, calculatePositionImprovement } from '../lib/utils';
import { Share } from '../lib/share';
import { Copy, ArrowUp, Users, Award, Twitter, Facebook, Mail, Check, Trophy, Sparkles, Link } from 'lucide-react';

interface ReferralDashboardProps {
  stats: ReferralStats;
}

export function ReferralDashboard({ stats }: ReferralDashboardProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(stats.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Get position improvement based on referrals
  const improvement = calculatePositionImprovement(stats.referralCount);
  
  // Calculate what position would be without referrals
  const originalPosition = stats.position + improvement;
  
  // Determine tier based on referral count
  const tier = stats.referralCount >= 20 ? 3 : stats.referralCount >= 10 ? 2 : stats.referralCount >= 5 ? 1 : 0;
  const tierNames = ['Bronze', 'Silver', 'Gold', 'Platinum'];
  const tierColors = ['from-amber-600 to-amber-700', 'from-gray-400 to-gray-500', 'from-yellow-400 to-amber-500', 'from-cyan-400 to-blue-500'];
  const tierBgColors = ['bg-amber-50', 'bg-gray-50', 'bg-yellow-50', 'bg-cyan-50'];
  const tierTextColors = ['text-amber-800', 'text-gray-700', 'text-yellow-800', 'text-cyan-800'];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-8 md:p-10 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-lg subtle-shadow border border-primary-100 dark:border-gray-800"
    >
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mb-6"
        >
          <div className="relative mx-auto w-24 h-24">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${tierColors[tier]} opacity-20 blur-md`}></div>
            <div className={`relative z-10 rounded-full w-24 h-24 mx-auto ${tierBgColors[tier]} flex items-center justify-center border-2 border-${tierColors[tier].split(' ')[0]} subtle-shadow`}>
              {tier === 0 && <Trophy className={`w-12 h-12 ${tierTextColors[tier]}`} />}
              {tier === 1 && <Award className={`w-12 h-12 ${tierTextColors[tier]}`} />}
              {tier === 2 && <Award className={`w-12 h-12 ${tierTextColors[tier]}`} />}
              {tier === 3 && <Sparkles className={`w-12 h-12 ${tierTextColors[tier]}`} />}
            </div>
          </div>
        </motion.div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-3 font-heading">Welcome to LaunchGlow!</h2>
        <div className="mb-2 flex items-center justify-center">
          <span className="text-lg font-medium mr-2">Your Position:</span>
          <span className="text-2xl gradient-text font-bold">{stats.position}</span>
        </div>
        
        {improvement > 0 && (
          <motion.div 
            className="flex items-center justify-center gap-1 text-green-600 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ArrowUp className="w-4 h-4" />
            <span className="font-medium">Moved up {improvement} {improvement === 1 ? 'spot' : 'spots'} from referrals</span>
          </motion.div>
        )}
        
        <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${tierColors[tier]} text-white mb-5`}>
          {tierNames[tier]} Tier
        </div>
        
        <p className="text-muted-foreground max-w-lg mx-auto">
          Share your unique referral link below and move up the waitlist! Each referral moves you up 10 spots.
        </p>
      </div>
      
      <div className="mb-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            readOnly
            value={stats.referralLink}
            className="w-full pl-10 px-4 py-4 pr-12 rounded-lg border border-primary-100 dark:border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <motion.button
            onClick={copyToClipboard}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600 p-2"
            aria-label="Copy referral link"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? 
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Check className="w-5 h-5 text-green-500" />
              </motion.div> : 
              <Copy className="w-5 h-5" />
            }
          </motion.button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <motion.div 
          className="bg-primary-50/50 dark:bg-gray-800/50 p-5 rounded-xl text-center subtle-shadow border border-primary-100 dark:border-gray-700 card-hover"
          whileHover={{ y: -5 }}
        >
          <div className="bg-primary-100 dark:bg-primary-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <p className="text-sm text-muted-foreground">Your Referrals</p>
          <p className="text-2xl font-bold mt-1">{stats.referralCount}</p>
        </motion.div>
        
        <motion.div 
          className="bg-green-50/50 dark:bg-gray-800/50 p-5 rounded-xl text-center subtle-shadow border border-green-100 dark:border-gray-700 card-hover"
          whileHover={{ y: -5 }}
        >
          <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <ArrowUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-sm text-muted-foreground">Position Boost</p>
          <p className="text-2xl font-bold mt-1">{improvement}</p>
        </motion.div>
        
        <motion.div 
          className="bg-accent-50/50 dark:bg-gray-800/50 p-5 rounded-xl text-center subtle-shadow border border-accent-100 dark:border-gray-700 card-hover"
          whileHover={{ y: -5 }}
        >
          <div className="bg-accent-100 dark:bg-accent-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-accent-600 dark:text-accent-400" />
          </div>
          <p className="text-sm text-muted-foreground">Current Tier</p>
          <p className="text-2xl font-bold mt-1">{tierNames[tier]}</p>
        </motion.div>
      </div>
      
      <div className="bg-gray-50/80 dark:bg-gray-800/50 p-6 rounded-xl mb-10 subtle-shadow border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-center mb-5 font-heading">Share with Friends</h3>
        <div className="flex justify-center space-x-5">
          <motion.button
            onClick={() => Share.twitter(stats.referralLink, "I just joined the LaunchGlow waitlist! Use my referral link to sign up and we'll both move up the list:")}
            className="p-3 bg-[#1DA1F2] text-white rounded-full hover:bg-opacity-90 transition-all duration-200 subtle-shadow"
            aria-label="Share on Twitter"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Twitter className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            onClick={() => Share.facebook(stats.referralLink)}
            className="p-3 bg-[#4267B2] text-white rounded-full hover:bg-opacity-90 transition-all duration-200 subtle-shadow"
            aria-label="Share on Facebook"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Facebook className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            onClick={() => Share.email("Join the LaunchGlow Waitlist!", `Hey! I just joined the LaunchGlow waitlist and thought you might be interested too. Use my referral link to sign up and we'll both move up the list: ${stats.referralLink}`)}
            className="p-3 bg-gray-700 text-white rounded-full hover:bg-opacity-90 transition-all duration-200 subtle-shadow"
            aria-label="Share via Email"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      
      <div className="space-y-5 backdrop-blur-sm bg-gradient-to-br from-primary-50/50 to-secondary-50/50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-xl subtle-shadow border border-primary-100 dark:border-gray-800">
        <h3 className="font-semibold font-heading">Referral Benefits</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-1 mr-3 mt-0.5">
              <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <span className="font-medium">Each referral</span>: Move up 10 spots on the waitlist
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 mr-3 mt-0.5">
              <Check className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <span className="font-medium">Silver tier (5+ referrals)</span>: Get early access to the platform
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-1 mr-3 mt-0.5">
              <Check className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <span className="font-medium">Gold tier (10+ referrals)</span>: Unlock exclusive premium features
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded-full p-1 mr-3 mt-0.5">
              <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <span className="font-medium">Platinum tier (20+ referrals)</span>: Receive a lifetime discount and VIP support
            </div>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}