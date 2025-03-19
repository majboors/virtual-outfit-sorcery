
import { toast } from "sonner";

interface TryOnResult {
  resultImage: string;
  success: boolean;
  error?: string;
}

export const processImages = async (
  humanImage: File,
  garmentImage: File
): Promise<TryOnResult> => {
  try {
    // First, convert images to base64
    const humanImageBase64 = await fileToBase64(humanImage);
    const garmentImageBase64 = await fileToBase64(garmentImage);
    
    // Create the payload
    const payload = {
      human_image: humanImageBase64,
      garment_image: garmentImageBase64
    };
    
    // Show loading toast
    toast.loading('Processing your images...', { id: 'processing' });
    
    // Make the API request
    const response = await fetch('https://tryon.techrealm.pk/process-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      toast.error('Failed to process images', { id: 'processing' });
      return {
        success: false,
        resultImage: '',
        error: errorData.message || 'An error occurred while processing the images'
      };
    }
    
    const data = await response.json();
    
    // Success
    toast.success('Images processed successfully!', { id: 'processing' });
    
    return {
      success: true,
      resultImage: `data:image/jpeg;base64,${data.result_image}`,
    };
  } catch (error) {
    console.error('Error processing images:', error);
    toast.error('Failed to process images', { id: 'processing' });
    
    return {
      success: false,
      resultImage: '',
      error: 'An unexpected error occurred. Please try again.'
    };
  }
};

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};
