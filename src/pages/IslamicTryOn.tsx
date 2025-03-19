
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResultCard from '@/components/ResultCard';
import { Button } from '@/components/ui/button';

const IslamicTryOn = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[80vh] w-full flex flex-col items-center justify-center pt-24 pb-16 px-6 md:px-12 overflow-hidden relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_50%_50%,hsl(180,40%,30%,0.1)_0%,hsl(0,0%,100%,0)_100%)]" />
        
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 fade-in">
            <div className="inline-block">
              <span className="bg-emerald-600/10 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                First In The World
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Islamic <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Virtual Try-On</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              Experience modern Islamic clothing virtually before you buy. Our AI technology creates realistic try-ons that respect modesty while highlighting elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/try-on" 
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-md font-medium hover:bg-emerald-700 transition-all hover:gap-3 group"
              >
                Try It Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Button variant="outline" className="border-emerald-600/20 hover:bg-emerald-50 transition-colors">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative aspect-[4/3] w-full max-w-md mx-auto md:ml-auto fade-in delayed-200">
            <div className="absolute inset-0 rounded-xl overflow-hidden shadow-elevated">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-30" />
              <img 
                src="https://zuhd.store/cdn/shop/files/9ZuhdStyle-ModernIslamicAttireArtboard1.jpg?v=1694082159&width=1080" 
                alt="Islamic Virtual Try-On Showcase" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-lg overflow-hidden shadow-elevated glass-card scale-in delayed-300">
              <img 
                src="https://zuhd.store/cdn/shop/products/Artboard1_fdb57087-f939-47bb-81c4-862fdba4503f.png?v=1695127396&width=1080" 
                alt="Islamic Virtual Try-On Example" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated selection of modern Islamic attire, designed with elegance and modesty in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ResultCard 
              imageUrl="https://zuhd.store/cdn/shop/files/6KuwaitiModernity-SingleButtonBrillianceArtboard1_25e5b7f9-fce4-43e8-ae22-a7731079ad2f.jpg"
              title="Kuwaiti Modernity Thobe"
              className="hover:translate-y-[-4px] transition-transform duration-300"
            />
            <ResultCard 
              imageUrl="https://zuhd.store/cdn/shop/files/Artboard2_f1eceec2-50f2-4fd6-af95-edaa3fca71ea.jpg?v=1695285662&width=1080"
              title="Modern Collar Thobe"
              className="hover:translate-y-[-4px] transition-transform duration-300"
            />
            <ResultCard 
              imageUrl="https://zuhd.store/cdn/shop/products/6KuwaitiModernity-SingleButtonBrillianceArtboard1.jpg?v=1695127828&width=1080"
              title="Single Button Brilliance"
              className="hover:translate-y-[-4px] transition-transform duration-300"
            />
          </div>

          <div className="text-center mt-12">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              View All Collections
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Islamic Virtual Try-On</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our technology is specifically designed with Islamic modest fashion in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-subtle hover:shadow-elevated transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Modesty Focused</h3>
              <p className="text-muted-foreground">
                Our AI respects Islamic dressing guidelines while showcasing modern styles.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-subtle hover:shadow-elevated transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy Protected</h3>
              <p className="text-muted-foreground">
                Your images are processed securely and never stored or shared.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-subtle hover:shadow-elevated transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Culturally Accurate</h3>
              <p className="text-muted-foreground">
                Designed to accurately represent various Islamic clothing styles from different regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to experience Islamic Virtual Try-On?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-emerald-50">
            Join thousands of satisfied customers who have discovered their perfect Islamic attire through our virtual try-on technology.
          </p>
          <Link to="/try-on" className="inline-flex items-center justify-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-md font-medium hover:bg-emerald-50 transition-all">
            Try Islamic Virtual Try-On
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IslamicTryOn;
