
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import HowItWorks from '@/components/HowItWorks';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection />
        
        <FeatureSection
          title="Virtual Try On Clothes With AI Magic"
          description="Dive into the enchanting realm of fashion with our AI clothes technology. By training sophisticated models on extensive image datasets, our system converts your photos into virtual try-on experiences in just seconds."
          beforeImage="/lovable-uploads/9ba1e5e1-ddfd-448f-a1a8-fc3b2bcb6158.png"
          afterImage="/lovable-uploads/c8499580-57dd-4d36-a597-43337a4473ef.png"
          className="bg-gradient-to-br from-blue-50 to-indigo-50/50"
        >
          <Link 
            to="/try-on" 
            className="inline-flex items-center justify-center mt-4 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Try it yourself
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </FeatureSection>
        
        <FeatureSection
          title="Versatile Clothes Try-on for Every Occasion"
          description="Virtually try on clothes in different styles to suit specific occasions and needs. Whether you're preparing for a formal event, a casual outing, or seeking daily inspiration, our technology adapts to your needs."
          beforeImage="/lovable-uploads/81c125a4-d1a5-4e6a-8ac8-15736dc2452a.png"
          afterImage="/lovable-uploads/340fb536-7eea-460d-b21e-ee8df9acdd26.png"
          reversed={true}
        />
        
        <FeatureSection
          title="Produce Realistic Clothing Try-on Effects"
          description="Our virtual clothing try-on tool utilizes smart artificial intelligence, providing a realistic preview of how outfits will look on you. It is meticulously designed to accommodate various clothing styles and body types."
          beforeImage="/lovable-uploads/340fb536-7eea-460d-b21e-ee8df9acdd26.png"
          afterImage="/lovable-uploads/81c125a4-d1a5-4e6a-8ac8-15736dc2452a.png"
          className="bg-gradient-to-br from-blue-50 to-indigo-50/50"
        >
          <Link 
            to="/try-on" 
            className="inline-flex items-center justify-center mt-4 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Try on clothes now
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </FeatureSection>
        
        <HowItWorks />
        
        <section id="about" className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">About Our Technology</h2>
                <p className="text-muted-foreground mb-4">
                  Our virtual try-on solution leverages state-of-the-art AI technology to create realistic visualizations of how clothing items will look on different body types.
                </p>
                <p className="text-muted-foreground mb-4">
                  The system analyzes both the human subject and the garment, understanding body proportions, fabric properties, and how they interact. This allows for accurate renderings that show proper fit, draping, and style.
                </p>
                <p className="text-muted-foreground">
                  Whether you're a shopper wanting to try before you buy, a fashion designer visualizing concepts, or a retailer enhancing your online shopping experience, our technology provides the perfect solution.
                </p>
              </div>
              
              <div className="relative">
                <div className="aspect-video rounded-xl overflow-hidden shadow-elevated bg-muted">
                  <img 
                    src="/lovable-uploads/340fb536-7eea-460d-b21e-ee8df9acdd26.png" 
                    alt="Virtual Try-On Technology" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute -bottom-6 -left-6 w-1/2 aspect-square bg-primary/10 rounded-xl -z-10 animate-pulse-subtle" />
                <div className="absolute -top-6 -right-6 w-1/3 aspect-square bg-primary/5 rounded-full -z-10 animate-float" />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Shopping Experience?</h2>
            <p className="text-primary-foreground/90 mb-8 text-lg">
              Try our virtual fitting room today and see how clothing items will look on you before making a purchase decision.
            </p>
            <Link 
              to="/try-on" 
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-md font-medium hover:bg-primary-foreground transition-colors"
            >
              Try On Clothes Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
