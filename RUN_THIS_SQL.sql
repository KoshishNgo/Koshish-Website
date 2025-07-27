-- COPY AND PASTE THIS ENTIRE CODE INTO YOUR SUPABASE SQL EDITOR
-- Go to: https://supabase.com/dashboard/project/ncuerkukueczqczeuppu/sql
-- Then click "RUN"

-- 1. Create the gallery storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

-- 2. Drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public read access for gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update gallery files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete gallery files" ON storage.objects;

-- 3. Create storage policies
CREATE POLICY "Public read access for gallery" ON storage.objects
FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload to gallery" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update gallery files" ON storage.objects
FOR UPDATE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery files" ON storage.objects
FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- 4. Enable Row Level Security
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 5. Clean up any broken entries from previous tests
DELETE FROM public.gallery 
WHERE image_url LIKE 'blob:%' 
   OR image_url IS NULL
   OR length(image_url) < 10
   OR image_url = 'jgjgjhgjhg';
