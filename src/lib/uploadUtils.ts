import { supabase } from '@/integrations/supabase/client';

export interface UploadResult {
  url: string | null;
  error: string | null;
}

export const uploadImageToSupabase = async (file: File, folder: string = 'gallery'): Promise<UploadResult> => {
  try {
    // Validate file
    if (!file.type.startsWith('image/')) {
      return { url: null, error: 'Please select an image file' };
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      return { url: null, error: 'File size must be less than 5MB' };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    console.log('🔄 Attempting Supabase upload:', fileName);

    // Upload file
    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('❌ Supabase upload error:', error);
      
      // Create a local blob URL as immediate fallback
      const blobUrl = URL.createObjectURL(file);
      console.log('⚠️ Using blob URL fallback:', blobUrl);
      
      return { 
        url: blobUrl, 
        error: `Storage error: ${error.message}. Using temporary preview. Please check storage configuration.` 
      };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    console.log('✅ Supabase upload successful:', publicUrl);
    return { url: publicUrl, error: null };
  } catch (error: any) {
    console.error('❌ Unexpected upload error:', error);
    
    // Always provide fallback
    const blobUrl = URL.createObjectURL(file);
    return { 
      url: blobUrl, 
      error: `Upload failed: ${error.message}. Using temporary preview.` 
    };
  }
};

export const deleteImageFromSupabase = async (imageUrl: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/');
    const bucketIndex = urlParts.findIndex(part => part === 'gallery');
    
    if (bucketIndex === -1 || bucketIndex === urlParts.length - 1) {
      return { success: false, error: 'Invalid image URL' };
    }

    const filePath = urlParts.slice(bucketIndex + 1).join('/');

    const { error } = await supabase.storage
      .from('gallery')
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Unexpected delete error:', error);
    return { success: false, error: error.message };
  }
};

export const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      const { width, height } = img;
      const ratio = Math.min(maxWidth / width, maxWidth / height);
      const newWidth = width * ratio;
      const newHeight = height * ratio;

      // Set canvas size
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
};
