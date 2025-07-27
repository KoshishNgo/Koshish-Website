import { supabase } from './src/integrations/supabase/client';

// Diagnose gallery and storage issues
async function diagnoseGalleryIssues() {
  console.log('🔍 Diagnosing Gallery Issues...\n');
  
  try {
    // 1. Check gallery table data
    console.log('1️⃣ Checking gallery table...');
    const { data: galleryData, error: galleryError } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (galleryError) {
      console.error('❌ Gallery table error:', galleryError);
      return;
    }
    
    console.log(`✅ Found ${galleryData?.length || 0} items in gallery table`);
    
    if (galleryData && galleryData.length > 0) {
      console.log('\n📋 Gallery items:');
      galleryData.forEach((item, index) => {
        console.log(`   ${index + 1}. "${item.title}"`);
        console.log(`      URL: ${item.image_url}`);
        console.log(`      Created: ${item.created_at}`);
        console.log('');
      });
    } else {
      console.log('ℹ️  No items found in gallery table - this is why admin uploads aren\'t showing');
      return;
    }

    // 2. Check storage bucket
    console.log('2️⃣ Checking storage bucket...');
    const { data: storageList, error: storageError } = await supabase.storage
      .from('gallery')
      .list('', { limit: 10 });
    
    if (storageError) {
      console.error('❌ Storage bucket error:', storageError);
      console.log('🔧 This means the storage bucket is not set up properly');
      console.log('   Please run the SQL commands from SETUP_ADMIN_UPLOADS.sql');
      return;
    }
    
    console.log(`✅ Storage bucket exists with ${storageList?.length || 0} files`);
    
    // 3. Test image accessibility
    if (galleryData && galleryData.length > 0) {
      console.log('\n3️⃣ Testing image URLs...');
      for (const item of galleryData.slice(0, 3)) {
        try {
          console.log(`Testing: ${item.title}`);
          const response = await fetch(item.image_url, { method: 'HEAD' });
          if (response.ok) {
            console.log(`   ✅ Accessible: ${item.image_url}`);
          } else {
            console.log(`   ❌ Not accessible (${response.status}): ${item.image_url}`);
          }
        } catch (error) {
          console.log(`   ❌ Failed to fetch: ${item.image_url} - ${error.message}`);
        }
      }
    }

    // 4. Check bucket policies
    console.log('\n4️⃣ Testing bucket permissions...');
    try {
      const { data: testData, error: testError } = await supabase.storage
        .from('gallery')
        .getPublicUrl('test-file.jpg');
      
      if (testError) {
        console.error('❌ Bucket permission error:', testError);
      } else {
        console.log('✅ Bucket permissions seem OK');
        console.log(`   Test URL format: ${testData.publicUrl}`);
      }
    } catch (error) {
      console.error('❌ Bucket test failed:', error);
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the diagnosis
diagnoseGalleryIssues();
