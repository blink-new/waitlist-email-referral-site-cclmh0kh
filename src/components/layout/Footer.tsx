import { Twitter, Facebook, Instagram, Linkedin, Sparkles } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-50/50 dark:bg-gray-900/50 py-16 border-t border-primary-100 dark:border-gray-800 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold flex items-center mb-6 font-heading">
              <div className="relative mr-2 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary-600 rounded-full blur-[6px] opacity-30"></div>
                <Sparkles className="w-6 h-6 text-primary-600 relative z-10" />
              </div>
              <span className="gradient-text">LaunchGlow</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-6">
              Be among the first to experience our innovative platform that will transform the way you connect, create, and collaborate.
            </p>
            <div className="flex space-x-5">
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary-600 transition-all duration-300 hover:-translate-y-1" 
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary-600 transition-all duration-300 hover:-translate-y-1" 
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary-600 transition-all duration-300 hover:-translate-y-1" 
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary-600 transition-all duration-300 hover:-translate-y-1" 
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-5 font-heading text-gray-900 dark:text-gray-100">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">About</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">Careers</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">Press</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-5 font-heading text-gray-900 dark:text-gray-100">Legal</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">Data Processing</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-100 dark:border-gray-800 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} LaunchGlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
