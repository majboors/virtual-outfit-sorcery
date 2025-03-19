
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

const ComparisonSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className
}: ComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [beforeImageLoaded, setBeforeImageLoaded] = useState(false);
  const [afterImageLoaded, setAfterImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeImageRef = useRef<HTMLImageElement>(null);
  const afterImageRef = useRef<HTMLImageElement>(null);

  // Determine if both images are loaded
  const isLoaded = beforeImageLoaded && afterImageLoaded;

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleBeforeImageLoad = () => {
    setBeforeImageLoaded(true);
  };

  const handleAfterImageLoad = () => {
    setAfterImageLoaded(true);
  };

  useEffect(() => {
    // Reset loaded state when image sources change
    setBeforeImageLoaded(false);
    setAfterImageLoaded(false);
    
    // Check if images are already cached and loaded
    if (beforeImageRef.current?.complete) {
      setBeforeImageLoaded(true);
    }
    
    if (afterImageRef.current?.complete) {
      setAfterImageLoaded(true);
    }
  }, [beforeImage, afterImage]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const containerWidth = rect.width;
      
      const newPosition = Math.min(Math.max((x / containerWidth) * 100, 0), 100);
      setSliderPosition(newPosition);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const containerWidth = rect.width;
      
      const newPosition = Math.min(Math.max((x / containerWidth) * 100, 0), 100);
      setSliderPosition(newPosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative w-full h-full overflow-hidden rounded-xl shadow-elevated cursor-grab active:cursor-grabbing',
        !isLoaded && 'bg-muted',
        className
      )}
    >
      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      
      {/* Before Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          ref={beforeImageRef}
          src={beforeImage} 
          alt="Before" 
          className={cn(
            "object-cover w-full h-full",
            !beforeImageLoaded && "opacity-0"
          )}
          onLoad={handleBeforeImageLoad}
        />
      </div>
      
      {/* After Image (shown based on slider position) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden" 
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          ref={afterImageRef}
          src={afterImage} 
          alt="After" 
          className={cn(
            "object-cover w-full h-full",
            !afterImageLoaded && "opacity-0"
          )}
          style={{ objectPosition: 'left center' }}
          onLoad={handleAfterImageLoad}
        />
      </div>
      
      {/* Slider */}
      <div 
        className={cn(
          "absolute inset-y-0 flex items-center justify-center w-1 bg-white cursor-grab active:cursor-grabbing",
          !isLoaded && "opacity-0"
        )}
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center z-10">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8L22 12M22 12L18 16M22 12H2M6 8L2 12M2 12L6 16" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className={cn(
        "absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium",
        !isLoaded && "opacity-0"
      )}>
        {beforeLabel}
      </div>
      <div className={cn(
        "absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium",
        !isLoaded && "opacity-0"
      )}>
        {afterLabel}
      </div>
    </div>
  );
};

export default ComparisonSlider;
