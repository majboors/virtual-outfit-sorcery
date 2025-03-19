
import { toast } from "sonner";

interface TryOnResult {
  resultImage: string;
  success: boolean;
  error?: string;
  rawError?: any; // To capture raw error objects for debugging
}

export const processImages = async (
  humanImage: File,
  garmentImage: File | string // Accept either File or direct URL string
): Promise<TryOnResult> => {
  try {
    // Convert human image to base64
    const humanImageBase64 = await fileToBase64(humanImage);
    
    // Handle garment image - could be a File or a URL string
    let garmentImageUrl: string;
    
    if (typeof garmentImage === 'string') {
      // If it's already a URL string, use it directly
      garmentImageUrl = garmentImage;
    } else {
      // Otherwise convert the File to a data URL (not a base64 string)
      const reader = new FileReader();
      garmentImageUrl = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(garmentImage);
      });
    }
    
    // Log payload before sending (without sensitive data)
    console.log('Preparing API request with payload structure:', {
      human_image: 'base64_string_present',
      garment_image: typeof garmentImageUrl === 'string' ? 'url_string_present' : 'data_url_present'
    });
    
    // Create the payload with correct parameter names
    const payload = {
      human_image: humanImageBase64,
      garment_image: garmentImageUrl // Pass the URL directly
    };
    
    // Show loading toast
    toast.loading('Processing your images...', { id: 'processing' });
    
    // Make the API request
    console.log('Sending request to API endpoint');
    const response = await fetch('https://tryon.techrealm.pk/process-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log('API response status:', response.status);
    
    // If not 200 OK, attempt to read the error
    if (!response.ok) {
      let errorMessage = 'Failed to process images';
      let errorData: any = null;
      
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
          console.error('API error response:', errorData);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } else {
          // If not JSON, read as text for logging
          const textResponse = await response.text();
          console.error('API non-JSON error response:', textResponse);
          errorData = { raw: textResponse };
        }
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
        errorData = { parseError: String(parseError) };
      }
      
      toast.error(errorMessage, { id: 'processing' });
      
      return {
        success: false,
        resultImage: '',
        error: errorMessage,
        rawError: errorData
      };
    }
    
    // Parse the successful response
    let data;
    try {
      data = await response.json();
      console.log('API success response received');
    } catch (parseError) {
      console.error('Error parsing successful response:', parseError);
      
      // Try to read as text for debugging
      const textResponse = await response.text();
      console.log('Response content (text):', textResponse.substring(0, 100) + '...');
      
      toast.error('Failed to parse API response', { id: 'processing' });
      return {
        success: false,
        resultImage: '',
        error: 'Failed to parse the response from the server',
        rawError: { parseError, responsePreview: textResponse.substring(0, 100) }
      };
    }
    
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
      error: 'An unexpected error occurred. Please try again.',
      rawError: error
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
