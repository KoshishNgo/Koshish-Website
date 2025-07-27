# 🔧 MANUAL STORAGE SETUP (No SQL Required)

## The Error Explained
The error `must be owner of table objects` means you need to set up storage policies through the Supabase dashboard instead of SQL.

## ✅ STEP 1: Run Safe SQL
First, run this safer SQL in your Supabase SQL Editor:

```sql
-- Create the gallery storage bucket
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

-- Clean up broken entries
DELETE FROM public.gallery 
WHERE image_url LIKE 'blob:%' 
   OR image_url IS NULL
   OR length(image_url) < 10
   OR image_url = 'jgjgjhgjhg';
```

## 🎯 STEP 2: Manual Storage Setup

### 2A. Go to Storage Section
1. **Supabase Dashboard** → **Storage** (left sidebar)
2. You should see a `gallery` bucket created
3. If not, click **"New Bucket"** and create it manually:
   - **Name**: `gallery`
   - **Public**: ✅ Check this
   - **File size limit**: `5242880` (5MB)

### 2B. Set Up Policies Manually
1. **Click on the `gallery` bucket**
2. **Go to "Policies" tab**
3. **Click "New Policy"**

**Create these 4 policies:**

#### Policy 1: Public Read
- **Policy Name**: `Public read access`
- **Allowed Operation**: `SELECT`
- **Policy Definition**: `true`

#### Policy 2: Authenticated Upload
- **Policy Name**: `Authenticated uploads`
- **Allowed Operation**: `INSERT`
- **Policy Definition**: `auth.role() = 'authenticated'`

#### Policy 3: Authenticated Update
- **Policy Name**: `Authenticated updates`
- **Allowed Operation**: `UPDATE`
- **Policy Definition**: `auth.role() = 'authenticated'`

#### Policy 4: Authenticated Delete
- **Policy Name**: `Authenticated deletes`
- **Allowed Operation**: `DELETE`
- **Policy Definition**: `auth.role() = 'authenticated'`

## 🚀 STEP 3: Test Upload

After setup:
1. **Go to admin panel** (`/admin`)
2. **Upload a test image**
3. **Check if it appears in gallery**

## 🆘 If Manual Setup is Too Complex

**Quick Alternative**: I can modify your admin panel to save images locally instead of using Supabase Storage. This would work immediately without any storage setup.

**Which would you prefer?**
- ✅ **Option A**: Continue with manual storage setup (more professional)
- ✅ **Option B**: Switch to local image storage (works immediately)

Try the safe SQL first, then let me know if you want help with the manual policies or prefer the local storage approach!
