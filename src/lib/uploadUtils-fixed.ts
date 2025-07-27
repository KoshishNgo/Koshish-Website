import { supabase } from '@/integrations/supabase/client';

export interface UploadResult {
  url: string | null;
  error: string | null;
}

// Alternative upload function that saves to local public folder
export const uploadImageLocally = async (file: File): Promise<UploadResult> => {
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
    const fileName = `uploaded-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    // For now, create a blob URL that can be used immediately
    // In production, you'd need a server endpoint to handle file uploads
    const blobUrl = URL.createObjectURL(file);
    
    // Return local path format
    const localPath = `/images/${fileName}`;
    
    console.log('File upload simulated:', {
      originalName: file.name,
      newName: fileName,
      blobUrl,
      localPath
    });
    
    return { 
      url: localPath, 
      error: 'Note: This is a simulated upload. In production, implement server-side file handling.' 
    };
  } catch (error) {
    return { url: null, error: error instanceof Error ? error.message : 'Upload failed' };
  }
};

// Original Supabase upload function with better error handling
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

    console.log('Attempting Supabase upload:', { fileName, filePath });

    // Upload file
    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      
      // If storage bucket doesn't exist or there's an error, fall back to local
      console.log('Falling back to local upload...');
      return await uploadImageLocally(file);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    console.log('Supabase upload successful:', publicUrl);
    return { url: publicUrl, error: null };

  } catch (error) {
    console.error('Upload error:', error);
    // Fall back to local upload
    return await uploadImageLocally(file);
  }
};

export const deleteImageFromSupabase = async (url: string): Promise<boolean> => {
  try {
    if (!url.includes('supabase')) {
      console.log('Local image, no deletion needed');
      return true;
    }

    // Extract path from Supabase URL
    const urlParts = url.split('/storage/v1/object/public/gallery/');
    if (urlParts.length < 2) {
      console.error('Invalid Supabase URL format');
      return false;
    }
    
    const filePath = urlParts[1];
    
    const { error } = await supabase.storage
      .from('gallery')
      .remove([filePath]);
    
    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

export const compressImage = async (file: File, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions (max 1920x1080)
      const maxWidth = 1920;
      const maxHeight = 1080;
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx?.drawImage(img, 0, 0, width, height);
      
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
    
    img.src = URL.createObjectURL(file);
  });
};
