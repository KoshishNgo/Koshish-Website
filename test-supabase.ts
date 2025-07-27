import { supabase } from './src/lib/supabase/client';

// Test Supabase Connection and Check Data
async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase Connection...');
  
  try {
    // Test 1: Check connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (connectionError) {
      console.error('❌ Connection failed:', connectionError);
      return;
    }
    
    console.log('✅ Supabase connected successfully!');
    
    // Test 2: Check gallery data
    const { data: galleryData, error: galleryError } = await supabase
      .from('gallery')
      .select('*');
    
    if (galleryError) {
      console.error('❌ Gallery query failed:', galleryError);
    } else {
      console.log(`📸 Gallery items in database: ${galleryData?.length || 0}`);
      if (galleryData && galleryData.length > 0) {
        console.log('Gallery items:', galleryData.map(item => item.title));
      }
    }
    
    // Test 3: Check programs data
    const { data: programsData, error: programsError } = await supabase
      .from('programs')
      .select('*');
    
    if (programsError) {
      console.error('❌ Programs query failed:', programsError);
    } else {
      console.log(`🎯 Programs in database: ${programsData?.length || 0}`);
    }
    
    // Test 4: Check contact messages
    const { data: contactData, error: contactError } = await supabase
      .from('contact_messages')
      .select('*');
    
    if (contactError) {
      console.error('❌ Contact messages query failed:', contactError);
    } else {
      console.log(`📧 Contact messages: ${contactData?.length || 0}`);
    }
    
    // Test 5: Test inserting gallery item (then delete it)
    console.log('🧪 Testing data insertion...');
    const { data: insertTest, error: insertError } = await supabase
      .from('gallery')
      .insert({
        title: 'Test Image',
        description: 'This is a test image',
        image_url: '/images/test.jpg',
        category: 'Test'
      })
      .select();
    
    if (insertError) {
      console.error('❌ Insert test failed:', insertError);
    } else {
      console.log('✅ Data insertion works!');
      
      // Clean up test data
      if (insertTest && insertTest[0]) {
        await supabase
          .from('gallery')
          .delete()
          .eq('id', insertTest[0].id);
        console.log('🧹 Test data cleaned up');
      }
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the test
testSupabaseConnection();
