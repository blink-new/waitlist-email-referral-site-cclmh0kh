import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitToWaitlist } from '../lib/api';
import { getReferralCodeFromUrl } from '../lib/utils';
import { ReferralStats } from '../types';
import { z } from 'zod';
import { MailIcon } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

interface WaitlistFormProps {
  onSuccess: (data: ReferralStats) => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Validate email
      const result = formSchema.safeParse({ email });
      if (!result.success) {
        setError(result.error.errors[0].message);
        return;
      }
      
      setIsSubmitting(true);
      
      // Get referral code from URL if present
      const referredBy = getReferralCodeFromUrl();
      
      // Submit to waitlist
      const stats = await submitToWaitlist(email, referredBy || undefined);
      
      // Call success callback
      onSuccess(stats);
    } catch (err) {
      setError('Failed to join waitlist. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-8 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg subtle-shadow border border-primary-100 dark:border-gray-800"
      id="waitlist-form"
    >
      <h2 className="text-2xl font-bold mb-6 text-center font-heading">Join Our Waitlist</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="block w-full pl-10 px-4 py-3 rounded-lg border border-primary-100 dark:border-gray-700 
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 dark:text-red-400 mt-1"
            >
              {error}
            </motion.p>
          )}
        </div>
        
        <motion.button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full py-3.5 px-4 text-white font-medium rounded-lg 
                    transition-all duration-300 shadow-md hover:shadow-lg
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-primary-200/50'}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: 'linear-gradient(to right, #6373F7, #36C9F8)'
          }}
        >
          {isSubmitting ? 'Joining...' : 'Join Now'}
        </motion.button>
      </form>
      
      <p className="text-xs text-center mt-6 text-gray-500 dark:text-gray-400">
        We'll never share your email with anyone else. By joining, you agree to our <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>.
      </p>
    </motion.div>
  );
}