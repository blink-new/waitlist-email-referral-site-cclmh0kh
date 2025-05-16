import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs: FAQ[] = [
    {
      question: "What is this waitlist for?",
      answer: "This waitlist is for early access to our innovative platform that will transform how you work and collaborate. By joining the waitlist, you'll be among the first to experience our product when it launches."
    },
    {
      question: "How does the referral system work?",
      answer: "After joining the waitlist, you'll receive a unique referral link. For each person who signs up using your link, you'll move up 10 spots on the waitlist. The more friends you refer, the higher your position and the sooner you'll get access."
    },
    {
      question: "Are there any benefits to referring others?",
      answer: "Absolutely! Besides moving up the waitlist, you can unlock different tiers with special benefits. Refer 5+ friends to reach Silver tier, 10+ for Gold tier, and 20+ for Platinum tier. Each tier comes with exclusive features and rewards."
    },
    {
      question: "When will the platform launch?",
      answer: "We're currently in the final stages of development and plan to launch in the coming months. Waitlist members will receive access in order of their position, with referral bonuses applied."
    },
    {
      question: "Is my information secure?",
      answer: "Yes, we take data privacy very seriously. Your email address and other information will only be used to communicate about our platform and provide you access when we launch. We never share your information with third parties."
    },
    {
      question: "Can I leave the waitlist after joining?",
      answer: "Yes, every email we send will include an unsubscribe link. You can opt-out at any time if you change your mind."
    }
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="py-16">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center mb-4 px-4 py-2 rounded-full bg-primary-50 dark:bg-gray-800">
            <HelpCircle className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Common Questions</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-4 font-heading">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our waitlist and upcoming platform.
          </p>
        </motion.div>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mb-4"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-colors
                        ${openIndex === index 
                           ? 'bg-primary-50 dark:bg-gray-800' 
                           : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <span className="font-medium text-lg font-heading">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-primary-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 bg-white dark:bg-gray-900 rounded-b-lg border-t border-gray-100 dark:border-gray-800"
              >
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}