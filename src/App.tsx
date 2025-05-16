import { useState } from 'react';
import { Hero } from './components/Hero';
import { WaitlistForm } from './components/WaitlistForm';
import { ReferralDashboard } from './components/ReferralDashboard';
import { FeaturesSection } from './components/features/FeaturesSection';
import { FAQSection } from './components/faq/FAQSection';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ReferralStats } from './types';
import { motion } from 'framer-motion';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [referralStats, setReferralStats] = useState<ReferralStats | null>(null);
  
  const handleJoinClick = () => {
    setShowForm(true);
    // Scroll to form with smooth animation
    setTimeout(() => {
      const formElement = document.getElementById('waitlist-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  const handleFormSuccess = (stats: ReferralStats) => {
    setReferralStats(stats);
    setShowForm(false);
    
    // Scroll to referral dashboard with smooth animation
    setTimeout(() => {
      const dashboardElement = document.getElementById('referral-dashboard');
      if (dashboardElement) {
        dashboardElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Hero onJoinClick={handleJoinClick} />
        
        <div className="container px-4 mx-auto py-12 md:py-16">
          {showForm && (
            <motion.div 
              id="waitlist-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <WaitlistForm onSuccess={handleFormSuccess} />
            </motion.div>
          )}
          
          {referralStats && (
            <motion.div 
              id="referral-dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <ReferralDashboard stats={referralStats} />
            </motion.div>
          )}
          
          <FeaturesSection />
          <FAQSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;