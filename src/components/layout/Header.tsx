import { useState, useEffect } from 'react';
import { useMobile } from '../../hooks/use-mobile';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Update header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobile) {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isMenuOpen]);
  
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <motion.a
              href="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold flex items-center font-heading"
            >
              <div className="relative mr-2 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary-600 rounded-full blur-[6px] opacity-30 animate-pulse-slow"></div>
                <Sparkles className="w-8 h-8 text-primary-600 relative z-10" />
              </div>
              <span className="gradient-text">LaunchGlow</span>
            </motion.a>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-8">
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('features');
                }}
                className="text-sm font-medium hover:text-primary-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('faq');
                }}
                className="text-sm font-medium hover:text-primary-600 transition-colors"
              >
                FAQ
              </a>
              <button
                onClick={() => scrollToSection('waitlist-form')}
                className="px-5 py-2.5 text-sm font-medium text-white primary-gradient rounded-lg hover:shadow-md hover:shadow-primary-200 transition-all duration-300"
              >
                Join Waitlist
              </button>
            </nav>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 glass-effect z-40"
          >
            <div className="container px-4 mx-auto py-8">
              <nav className="flex flex-col space-y-6">
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                  className="text-lg font-medium hover:text-primary-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('faq');
                  }}
                  className="text-lg font-medium hover:text-primary-600 transition-colors"
                >
                  FAQ
                </a>
                <button
                  onClick={() => scrollToSection('waitlist-form')}
                  className="px-6 py-3 text-base font-medium text-white primary-gradient rounded-lg hover:shadow-md hover:shadow-primary-200 transition-all duration-300 w-full"
                >
                  Join Waitlist
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}