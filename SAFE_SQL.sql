-- ALTERNATIVE SQL - RUN THIS INSTEAD
-- This version avoids permission issues

-- 1. Create the gallery storage bucket (this should work)
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

-- 2. Clean up broken gallery entries (this should work)
DELETE FROM public.gallery 
WHERE image_url LIKE 'blob:%' 
   OR image_url IS NULL
   OR length(image_url) < 10
   OR image_url = 'jgjgjhgjhg';
