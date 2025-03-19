
import { useState } from 'react';
import { ArrowRight, Camera, Shirt } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UploadArea from '@/components/UploadArea';
import ResultCard from '@/components/ResultCard';
import { processImages } from '@/services/tryOnService';

const TryOn = () => {
  const [humanImage, setHumanImage] = useState<File | null>(null);
  const [garmentImage, setGarmentImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleHumanImageSelected = (file: File) => {
    setHumanImage(file);
    setResultImage(null);
    setError(null);
  };

  const handleGarmentImageSelected = (file: File) => {
    setGarmentImage(file);
    setResultImage(null);
    setError(null);
  };

  const handleProcess = async () => {
    if (!humanImage || !garmentImage) {
      setError('Please upload both a human image and a garment image.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await processImages(humanImage, garmentImage);
      
      if (result.success) {
        setResultImage(result.resultImage);
      } else {
        setError(result.error || 'Failed to process images');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
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
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                  2
                </div>
                <h2 className="ml-3 text-xl font-semibold">Upload a Garment</h2>
              </div>
              
              <UploadArea 
                onFileSelected={handleGarmentImageSelected}
                label="Upload a clothing item"
                className="h-80"
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
              disabled={!humanImage || !garmentImage || isProcessing}
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
              <div className="mt-4 text-destructive text-sm">
                {error}
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
            <h2 className="text-2xl font-semibold mb-6 text-center">Featured Try-On Examples</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResultCard 
                imageUrl="/lovable-uploads/9ba1e5e1-ddfd-448f-a1a8-fc3b2bcb6158.png"
                title="Casual Blue Outfit"
              />
              <ResultCard 
                imageUrl="/lovable-uploads/c8499580-57dd-4d36-a597-43337a4473ef.png"
                title="Elegant Evening Dress"
              />
              <ResultCard 
                imageUrl="/lovable-uploads/81c125a4-d1a5-4e6a-8ac8-15736dc2452a.png"
                title="Professional Suit"
              />
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
