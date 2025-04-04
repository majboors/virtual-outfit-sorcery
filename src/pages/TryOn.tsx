
import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Camera, Shirt, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UploadArea from '@/components/UploadArea';
import ResultCard from '@/components/ResultCard';
import { MetaTags } from '@/utils/MetaTags';
import { processImages } from '@/services/tryOnService';
import { toast } from 'sonner';

const TryOn = () => {
  const [humanImage, setHumanImage] = useState<File | null>(null);
  const [garmentImage, setGarmentImage] = useState<File | null>(null);
  const [selectedGarmentUrl, setSelectedGarmentUrl] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);
  
  const garmentSectionRef = useRef<HTMLDivElement>(null);

  const handleHumanImageSelected = (file: File) => {
    setHumanImage(file);
    setResultImage(null);
    setError(null);
  };

  const handleGarmentImageSelected = (file: File) => {
    setGarmentImage(file);
    setSelectedGarmentUrl(null);
    setResultImage(null);
    setError(null);
  };

  const handleFeaturedGarmentSelected = (url: string) => {
    setSelectedGarmentUrl(url);
    setGarmentImage(null);
    setResultImage(null);
    setError(null);
    
    toast.success('Garment selected! Now upload your photo or select another garment.');
    
    if (garmentSectionRef.current) {
      garmentSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleProcess = async () => {
    if (!humanImage) {
      setError('Please upload a photo of yourself.');
      return;
    }
    
    if (!garmentImage && !selectedGarmentUrl) {
      setError('Please upload or select a garment image.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setShowFullScreenLoader(true);
    
    console.log(`Processing attempt ${retryCount + 1}`);

    try {
      const garmentToProcess = selectedGarmentUrl || garmentImage;
      
      if (!garmentToProcess) {
        throw new Error('No garment selected');
      }
      
      const result = await processImages(humanImage, garmentToProcess);
      
      if (result.success) {
        setResultImage(result.resultImage);
        setRetryCount(0);
      } else {
        console.error('Processing failed with error:', result.error, 'Raw error:', result.rawError);
        setError(result.error || 'Failed to process images');
        
        if (result.rawError) {
          console.error('Additional error details:', result.rawError);
        }
      }
    } catch (err) {
      console.error('Unexpected error during processing:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
      setShowFullScreenLoader(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
    handleProcess();
  };

  const featuredGarments = [
    {
      imageUrl: "https://zuhd.store/cdn/shop/files/6KuwaitiModernity-SingleButtonBrillianceArtboard1_25e5b7f9-fce4-43e8-ae22-a7731079ad2f.jpg",
      title: "Kuwaiti Modernity"
    },
    {
      imageUrl: "https://zuhd.store/cdn/shop/files/Artboard2_f1eceec2-50f2-4fd6-af95-edaa3fca71ea.jpg?v=1695285662&width=1080",
      title: "Modern Thobe"
    },
    {
      imageUrl: "https://zuhd.store/cdn/shop/products/6KuwaitiModernity-SingleButtonBrillianceArtboard1.jpg?v=1695127828&width=1080",
      title: "Single Button Brilliance"
    },
    {
      imageUrl: "https://zuhd.store/cdn/shop/files/9ZuhdStyle-ModernIslamicAttireArtboard1.jpg?v=1694082159&width=1080",
      title: "Zuhd Style"
    },
    {
      imageUrl: "https://zuhd.store/cdn/shop/products/Artboard1_fdb57087-f939-47bb-81c4-862fdba4503f.png?v=1695127396&width=1080",
      title: "Modern Islamic Attire"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags 
        title="Try On Clothes Virtually"
        description="Upload your photo and try on clothes virtually using our AI technology. See how garments will look on you before purchasing."
        canonicalUrl="https://virtualfit.ai/try-on"
      />
      
      <Navbar />
      
      {showFullScreenLoader && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-2">Processing Your Try-On</h3>
            <p className="text-muted-foreground">Please wait while our AI generates your personalized try-on result...</p>
            {retryCount > 0 && (
              <div className="mt-4 text-sm text-muted-foreground">
                Attempt {retryCount + 1}... 
              </div>
            )}
          </div>
        </div>
      )}
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Virtual Try-On Experience
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload your photo and a garment to see how it looks on you with our AI try-on technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                  1
                </div>
                <h2 className="ml-3 text-xl font-semibold">Upload Your Photo</h2>
              </div>
              
              <UploadArea 
                onFileSelected={handleHumanImageSelected}
                label="Upload a full body photo"
                className="h-80"
              />
              
              <div className="text-sm text-muted-foreground">
                <p>For best results:</p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>Use a clear, well-lit photo</li>
                  <li>Stand against a simple background</li>
                  <li>Face the camera directly</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6" ref={garmentSectionRef}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                  2
                </div>
                <h2 className="ml-3 text-xl font-semibold">
                  {selectedGarmentUrl ? 'Selected Garment' : 'Upload a Garment'}
                </h2>
              </div>
              
              {selectedGarmentUrl && (
                <div className="mb-4 text-center">
                  <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">
                    Garment selected from featured collection
                  </div>
                </div>
              )}
              
              <UploadArea 
                onFileSelected={handleGarmentImageSelected}
                label={selectedGarmentUrl ? "Change selected garment" : "Upload a clothing item"}
                className="h-80"
                initialPreview={selectedGarmentUrl}
              />
              
              <div className="text-sm text-muted-foreground">
                <p>For best results:</p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>Use a product photo with a solid background</li>
                  <li>Ensure the garment is clearly visible</li>
                  <li>Front-facing garment images work best</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <button
              onClick={handleProcess}
              disabled={(!humanImage || (!garmentImage && !selectedGarmentUrl)) || isProcessing}
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Generate Try-On
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            {error && (
              <div className="mt-4 space-y-2">
                <div className="text-destructive text-sm font-medium">
                  {error}
                </div>
                <button 
                  onClick={handleRetry}
                  className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium"
                >
                  <RefreshCw size={14} className="mr-1" />
                  Try again
                </button>
              </div>
            )}
          </div>
          
          {resultImage && (
            <div className="fade-in">
              <h2 className="text-2xl font-semibold mb-6 text-center">Your Try-On Result</h2>
              <div className="max-w-md mx-auto">
                <ResultCard 
                  imageUrl={resultImage}
                  title="Try-On Result"
                />
              </div>
            </div>
          )}
          
          <div className="mt-16 pt-12 border-t">
            <h2 className="text-2xl font-semibold mb-6 text-center">Featured Garments - Click to Select</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGarments.map((garment, index) => (
                <div 
                  key={index} 
                  className={`cursor-pointer transform transition-all duration-200 hover:scale-105 ${selectedGarmentUrl === garment.imageUrl ? 'ring-4 ring-primary ring-offset-2' : ''}`}
                  onClick={() => handleFeaturedGarmentSelected(garment.imageUrl)}
                >
                  <ResultCard 
                    imageUrl={garment.imageUrl}
                    title={garment.title}
                  />
                  <div className="mt-2 text-center">
                    <button className="text-sm text-primary font-medium hover:text-primary/80">
                      Select for Try-On
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 p-8 bg-primary/5 rounded-xl border border-primary/10">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-xl font-semibold mb-4">
                Experience the future of online shopping
              </h3>
              <p className="text-muted-foreground mb-6">
                Our AI-powered virtual try-on technology helps you make confident purchase decisions by showing exactly how clothes will look on you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center text-sm font-medium">
                  <Camera size={16} className="mr-2 text-primary" />
                  Realistic Try-On
                </div>
                <div className="flex items-center text-sm font-medium">
                  <Shirt size={16} className="mr-2 text-primary" />
                  Works with any garment
                </div>
                <div className="flex items-center text-sm font-medium">
                  <svg width="16" height="16" className="mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Fast processing
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TryOn;
