import { supabase } from './src/integrations/supabase/client';

// Test Gallery Data and Storage
async function testGalleryData() {
  console.log('🔍 Testing Gallery Data and Storage...');
  
  try {
    // Test 1: Check gallery table data
    console.log('\n1. Checking gallery table...');
    const { data: galleryData, error: galleryError } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (galleryError) {
      console.error('❌ Gallery query failed:', galleryError);
    } else {
      console.log(`✅ Found ${galleryData?.length || 0} images in gallery table`);
      if (galleryData && galleryData.length > 0) {
        galleryData.forEach((item, index) => {
          console.log(`   ${index + 1}. "${item.title}" - ${item.image_url}`);
        });
      }
    }
    
    // Test 2: Check storage bucket
    console.log('\n2. Checking storage bucket...');
    const { data: storageData, error: storageError } = await supabase.storage
      .from('gallery')
      .list('', { limit: 10 });
    
    if (storageError) {
      console.error('❌ Storage query failed:', storageError);
      console.log('ℹ️  This might mean the storage bucket is not set up yet');
    } else {
      console.log(`✅ Found ${storageData?.length || 0} files in storage`);
      if (storageData && storageData.length > 0) {
        storageData.forEach((file, index) => {
          console.log(`   ${index + 1}. ${file.name} (${file.metadata?.size || 'unknown size'})`);
        });
      }
    }
    
    // Test 3: Test image accessibility
    if (galleryData && galleryData.length > 0) {
      console.log('\n3. Testing image accessibility...');
      for (const item of galleryData.slice(0, 3)) { // Test first 3 images
        try {
          const response = await fetch(item.image_url, { method: 'HEAD' });
          if (response.ok) {
            console.log(`✅ Image accessible: ${item.title}`);
          } else {
            console.log(`❌ Image not accessible (${response.status}): ${item.title} - ${item.image_url}`);
          }
        } catch (error) {
          console.log(`❌ Image fetch error: ${item.title} - ${error.message}`);
        }
      }
    }
    
    // Test 4: List all storage buckets
    console.log('\n4. Checking available storage buckets...');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('❌ Failed to list buckets:', bucketsError);
    } else {
      console.log(`✅ Available buckets: ${buckets?.map(b => b.name).join(', ') || 'none'}`);
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the test
testGalleryData();
