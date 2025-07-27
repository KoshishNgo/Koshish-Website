# 🚨 Gallery Image Fix Guide

## The Problem
Images uploaded through admin panel are saving to database but not displaying properly because of storage configuration issues.

## Quick Fix Steps

### Step 1: Check Your Supabase Storage
1. Go to your Supabase dashboard: https://supabase.com/dashboard/projects
2. Select your project: `ncuerkukueczqczeuppu`
3. Go to **Storage** in the left sidebar
4. Check if you have a bucket named `gallery`

### Step 2: Create Storage Bucket (if missing)
If you don't have a `gallery` bucket:
1. Click **"New bucket"**
2. Name: `gallery`
3. **Public bucket**: ✅ YES (check this box)
4. Click **"Create bucket"**

### Step 3: Configure Bucket Policies
If bucket exists but images don't load, add these policies:

Go to **Storage** → **Policies** → **New Policy**

**Policy 1: Allow Public Read**
```sql
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
```

**Policy 2: Allow Authenticated Upload**
```sql
CREATE POLICY "Allow authenticated uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');
```

**Policy 3: Allow Authenticated Update**
```sql
CREATE POLICY "Allow authenticated updates" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');
```

**Policy 4: Allow Authenticated Delete**
```sql
CREATE POLICY "Allow authenticated deletes" ON storage.objects FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');
```

### Step 4: Test Your Setup

After making these changes:
1. Go to your admin panel
2. Try uploading a new image
3. Check if it appears in the gallery
4. Open browser developer tools (F12) and check the console for any error messages

## What Changed in Gallery Code

I've updated your Gallery component to:

1. **Combine Images**: Now shows both database images AND local images together
2. **Better Error Handling**: Broken image URLs won't crash the gallery
3. **Debug Mode**: In development, you'll see debug info showing:
   - How many images are loaded from database vs local
   - All image URLs and their sources
   - Any errors loading images

4. **Visual Indicators**: Database images show a green "New" badge

## Expected Behavior After Fix

✅ **Database images** (uploaded via admin) appear first
✅ **Local images** (hardcoded) appear after database images  
✅ **Broken images** are hidden automatically
✅ **Debug info** helps you troubleshoot (only in development)

## If Images Still Don't Show

1. Check browser console (F12) for error messages
2. Look at the debug info section in the gallery
3. Verify image URLs in the debug panel
4. Make sure images are actually uploaded to Supabase storage

## Alternative: Use Local Image Upload

If Supabase storage is still not working, I can modify the admin panel to:
1. Save images to `/public/images/` folder instead
2. Generate local file paths instead of Supabase URLs
3. This would work immediately without storage setup

Let me know if you want this alternative approach!
