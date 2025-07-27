-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to gallery images
CREATE POLICY "Public read access on gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

-- Policy for authenticated users to upload gallery images
CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'gallery' 
    AND auth.role() = 'authenticated'
    AND public.is_admin(auth.uid())
  );

-- Policy for admins to delete gallery images
CREATE POLICY "Admins can delete gallery images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'gallery' 
    AND public.is_admin(auth.uid())
  );

-- Policy for admins to update gallery images
CREATE POLICY "Admins can update gallery images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'gallery' 
    AND public.is_admin(auth.uid())
  );
