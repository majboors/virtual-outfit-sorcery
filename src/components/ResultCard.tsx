
import { useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ResultCardProps {
  imageUrl: string;
  title?: string;
  className?: string;
}

const ResultCard = ({
  imageUrl,
  title,
  className,
}: ResultCardProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = title ? `${title.toLowerCase().replace(/\s+/g, '-')}.jpg` : 'try-on-result.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Image downloaded successfully');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'try-on-result.jpg', { type: 'image/jpeg' });
        
        await navigator.share({
          title: title || 'My Virtual Try-On',
          text: 'Check out my virtual try-on result!',
          files: [file],
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(imageUrl);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share image');
    }
  };

  return (
    <div className={cn(
      'rounded-xl overflow-hidden bg-white shadow-subtle hover:shadow-elevated transition-shadow',
      className
    )}>
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        <img
          src={imageUrl}
          alt={title || 'Try-on result'}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      
      <div className="p-4">
        {title && <h3 className="font-medium mb-2">{title}</h3>}
        
        <div className="flex justify-between">
          <button
            onClick={handleDownload}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Download size={16} className="mr-1" />
            Download
          </button>
          
          <button
            onClick={handleShare}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Share2 size={16} className="mr-1" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
