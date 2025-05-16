import { motion } from 'framer-motion';
import { 
  Stars, 
  Rocket, 
  Shield, 
  Users, 
  Zap, 
  Activity, 
  Globe
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <Stars className="h-10 w-10 p-2 bg-primary-100 text-primary-700 rounded-lg" />,
      title: "Early Access",
      description: "Be among the first to experience our platform before public release."
    },
    {
      icon: <Rocket className="h-10 w-10 p-2 bg-primary-100 text-primary-700 rounded-lg" />,
      title: "Exclusive Features",
      description: "Get access to premium features that won't be available in the standard plan."
    },
    {
      icon: <Shield className="h-10 w-10 p-2 bg-primary-100 text-primary-700 rounded-lg" />,
      title: "Priority Support",
      description: "Receive dedicated customer support with faster response times."
    },
    {
      icon: <Users className="h-10 w-10 p-2 bg-primary-100 text-primary-700 rounded-lg" />,
      title: "Referral Rewards",
      description: "Earn special rewards by referring friends and colleagues."
    },
    {
      icon: <Zap className="h-10 w-10 p-2 bg-primary-100 text-primary-700 rounded-lg" />,
      title: "Enhanced Performance",
      description: "Experience optimized performance with our cutting-edge technology."
    },
    {
      icon: <Activity className="h-10 w-10 p-2 bg-primary-100 text-primary-700 rounded-lg" />,
      title: "Advanced Analytics",
      description: "Gain insights with comprehensive data analysis and reporting tools."
    }
  ];

  return (
    <section id="features" className="py-16">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4 font-heading">Amazing Features Coming Soon</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here's what you can look forward to when you join our platform early.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 font-heading">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary-50 dark:bg-gray-800 text-primary-700 dark:text-primary-300 font-medium">
          <Globe className="h-5 w-5 mr-2" />
          <span>Join users from over 100+ countries worldwide</span>
        </div>
      </motion.div>
    </section>
  );
}
