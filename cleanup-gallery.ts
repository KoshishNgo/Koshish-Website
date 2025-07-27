import { supabase } from './src/integrations/supabase/client';

// Clean up invalid gallery entries
async function cleanupGallery() {
  console.log('🧹 Cleaning up invalid gallery entries...');
  
  try {
    // Get all gallery items
    const { data: allItems, error: fetchError } = await supabase
      .from('gallery')
      .select('*');
    
    if (fetchError) {
      console.error('❌ Error fetching gallery items:', fetchError);
      return;
    }
    
    console.log(`📊 Found ${allItems?.length || 0} total gallery items`);
    
    if (!allItems || allItems.length === 0) {
      console.log('✅ No items to clean up');
      return;
    }
    
    // Find invalid items
    const invalidItems = allItems.filter(item => {
      const url = item.image_url;
      return !url || 
             url.length < 5 || 
             url === 'jgjgjhgjhg' || 
             url.startsWith('blob:') ||
             !url.startsWith('http') && !url.startsWith('/');
    });
    
    console.log(`🗑️ Found ${invalidItems.length} invalid items to remove:`);
    invalidItems.forEach(item => {
      console.log(`   - "${item.title}" with URL: ${item.image_url}`);
    });
    
    if (invalidItems.length === 0) {
      console.log('✅ No invalid items found');
      return;
    }
    
    // Delete invalid items
    const invalidIds = invalidItems.map(item => item.id);
    const { error: deleteError } = await supabase
      .from('gallery')
      .delete()
      .in('id', invalidIds);
    
    if (deleteError) {
      console.error('❌ Error deleting invalid items:', deleteError);
    } else {
      console.log(`✅ Successfully removed ${invalidItems.length} invalid gallery items`);
    }
    
    // Show remaining valid items
    const { data: remainingItems } = await supabase
      .from('gallery')
      .select('*');
    
    console.log(`📊 Remaining valid items: ${remainingItems?.length || 0}`);
    if (remainingItems && remainingItems.length > 0) {
      remainingItems.forEach(item => {
        console.log(`   ✅ "${item.title}" - ${item.image_url}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the cleanup
cleanupGallery();
