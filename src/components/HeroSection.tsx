
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-16 px-6 md:px-12 overflow-hidden relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_50%_50%,hsl(221,83%,53%,0.1)_0%,hsl(0,0%,100%,0)_100%)]" />
      
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 md:space-y-8 fade-in">
          <div className="inline-block">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              AI-Powered Virtual Try-On
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Virtual Try On <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Reimagined</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md">
            Experience clothing virtually before you buy. Our AI technology creates realistic try-ons that match your style and body type.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/try-on" 
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-all hover:gap-3 group"
            >
              Try It Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/#how-it-works" 
              className="inline-flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        <div className="relative aspect-[4/3] w-full max-w-md mx-auto md:ml-auto fade-in delayed-200">
          <div className="absolute inset-0 rounded-xl overflow-hidden shadow-elevated">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-30" />
            <img 
              src="/lovable-uploads/9ba1e5e1-ddfd-448f-a1a8-fc3b2bcb6158.png" 
              alt="AI Virtual Try-On Showcase" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-80" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-lg overflow-hidden shadow-elevated glass-card scale-in delayed-300">
            <img 
              src="/lovable-uploads/c8499580-57dd-4d36-a597-43337a4473ef.png" 
              alt="Virtual Try-On Example" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center items-center">
        <div className="w-8 h-12 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
