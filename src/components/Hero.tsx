import { motion } from 'framer-motion';
import { Sparkles, Star, Clock } from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
}

export function Hero({ onJoinClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient background with animated shapes */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-950 dark:via-gray-900 dark:to-secondary-950 -z-10"
        aria-hidden="true"
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-5" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/30 dark:bg-primary-800/10 rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-72 h-72 bg-secondary-200/30 dark:bg-secondary-800/10 rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-accent-200/30 dark:bg-accent-800/10 rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Hero content */}
      <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-full mb-4 border border-primary-100 dark:border-primary-700/30 subtle-shadow">
              <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2" />
              <span className="text-sm font-medium text-primary-800 dark:text-primary-300">
                Coming Soon - Join the Waitlist
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-heading">
              Illuminate Your <span className="gradient-text font-extrabold">Future</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-[750px] mx-auto">
              Be among the first to experience the most innovative platform designed to transform the way you connect, create, and collaborate.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-5 w-full max-w-md mx-auto items-center"
          >
            <button 
              onClick={onJoinClick}
              className="primary-gradient text-white font-medium rounded-xl px-8 py-3.5 w-full md:w-auto transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-200/40 dark:hover:shadow-primary-900/40"
            >
              Join the Waitlist
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-10 justify-center items-center flex-wrap mt-4"
          >
            <div className="flex items-center gap-2">
              <div className="primary-gradient rounded-full p-2.5 subtle-shadow">
                <Star className="w-4 h-4 text-white" />
              </div>
              <p className="font-medium">Early Access</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="accent-gradient rounded-full p-2.5 subtle-shadow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="font-medium">Premium Features</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full p-2.5 subtle-shadow">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <p className="font-medium">Priority Access</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}