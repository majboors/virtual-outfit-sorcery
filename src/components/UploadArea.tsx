
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, Image } from 'lucide-react';

interface UploadAreaProps {
  onFileSelected: (file: File) => void;
  label?: string;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
}

const UploadArea = ({
  onFileSelected,
  label = 'Upload an image',
  className,
  accept = 'image/*',
  maxSize = 5 // 5MB default
}: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    setError(null);
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Call the callback
    onFileSelected(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={cn(
        'relative rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center p-6',
        isDragging 
          ? 'border-primary bg-primary/5' 
          : 'border-border hover:border-primary/50 hover:bg-muted/50',
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {preview ? (
        <div className="w-full h-full relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-contain rounded-lg"
          />
          <button 
            className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setPreview(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 p-4 rounded-full bg-muted">
            {isDragging ? (
              <Image size={24} className="text-primary" />
            ) : (
              <Upload size={24} className="text-muted-foreground" />
            )}
          </div>
          <p className="text-center mb-2 font-medium">
            {label}
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Drag and drop or click to browse
          </p>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Supports: JPG, PNG, WEBP - Max {maxSize}MB
          </p>
        </>
      )}
      
      {error && (
        <div className="mt-2 text-destructive text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default UploadArea;
