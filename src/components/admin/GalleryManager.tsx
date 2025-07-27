import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, Image as ImageIcon, Upload, Eye, Loader2 } from "lucide-react";
import { compressImage, uploadImageToSupabase, deleteImageFromSupabase } from "@/lib/uploadUtils";

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { toast } = useToast();

  const categories = [
    "Education Programs",
    "Women Empowerment", 
    "Legal Aid",
    "Emergency Relief",
    "Volunteers",
    "Events",
    "Human Rights",
    "Peace and Harmony",
    "Youth",
    "Local Self Governance",
    "Environment",
    "Other"
  ];

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      category: "",
      tags: ""
    }
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast({
        title: "Error",
        description: "Failed to fetch gallery images",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive"
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    try {
      // Compress image if it's too large
      const compressedFile = file.size > 1024 * 1024 ? await compressImage(file) : file;
      
      setSelectedFile(compressedFile);
      const url = URL.createObjectURL(compressedFile);
      setPreviewUrl(url);
      form.setValue('image_url', url); // Temporary preview
      
      toast({
        title: "Image selected",
        description: `File ready for upload: ${compressedFile.name}`,
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Error",
        description: "Failed to process the selected image",
        variant: "destructive"
      });
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setUploading(true);
      let imageUrl = data.image_url;
      
      // If there's a selected file, upload it first
      if (selectedFile) {
        const result = await uploadImageToSupabase(selectedFile);
        
        if (result.error && !result.url) {
          toast({
            title: "Upload failed",
            description: result.error,
            variant: "destructive"
          });
          return;
        }
        
        if (result.url) {
          imageUrl = result.url;
        }
        
        if (result.error) {
          toast({
            title: "Warning",
            description: result.error,
            variant: "default"
          });
        }
      }

      const imageData = {
        ...data,
        image_url: imageUrl,
        tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : [],
      };

      if (editingImage) {
        const { error } = await supabase
          .from('gallery')
          .update(imageData)
          .eq('id', editingImage.id);

        if (error) throw error;
        toast({ title: "Success", description: "Image updated successfully" });
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert([imageData]);

        if (error) throw error;
        toast({ title: "Success", description: "Image added successfully" });
      }

      setIsAddDialogOpen(false);
      setEditingImage(null);
      setSelectedFile(null);
      setPreviewUrl("");
      form.reset();
      fetchImages();
    } catch (error) {
      console.error('Error saving image:', error);
      toast({
        title: "Error",
        description: "Failed to save image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      // Find the image to get its URL for storage deletion
      const imageToDelete = images.find((img: any) => img.id === id);
      
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Try to delete from storage (if it's a Supabase storage URL)
      if (imageToDelete?.image_url?.includes('supabase')) {
        await deleteImageFromSupabase(imageToDelete.image_url);
      }

      toast({ title: "Success", description: "Image deleted successfully" });
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (image: any) => {
    setEditingImage(image);
    form.reset({
      title: image.title,
      description: image.description || "",
      image_url: image.image_url,
      category: image.category || "",
      tags: image.tags ? image.tags.join(', ') : ""
    });
    setPreviewUrl(image.image_url);
    setIsAddDialogOpen(true);
  };

  const resetDialog = () => {
    setIsAddDialogOpen(false);
    setEditingImage(null);
    setSelectedFile(null);
    setPreviewUrl("");
    form.reset();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-32 md:h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-koshish-blue">Gallery Management</h2>
          <p className="text-sm md:text-base text-gray-600">Manage photos and media content</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingImage ? 'Edit Image' : 'Add New Image'}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Image Upload Section */}
                <div className="space-y-4">
                  <FormLabel>Image Upload</FormLabel>
                  
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label 
                      htmlFor="image-upload" 
                      className="cursor-pointer block"
                    >
                      {previewUrl ? (
                        <div className="space-y-2">
                          <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="max-h-32 md:max-h-48 mx-auto rounded"
                          />
                          <p className="text-sm text-gray-600">Click to change image</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto" />
                          <p className="text-sm md:text-base text-gray-600">Click to upload image</p>
                          <p className="text-xs text-gray-500">PNG, JPG, WebP up to 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* OR Divider */}
                  <div className="flex items-center">
                    <hr className="flex-1" />
                    <span className="px-3 text-sm text-gray-500">OR</span>
                    <hr className="flex-1" />
                  </div>

                  {/* URL Input */}
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="https://example.com/image.jpg"
                            onChange={(e) => {
                              field.onChange(e);
                              if (e.target.value && !selectedFile) {
                                setPreviewUrl(e.target.value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter image title..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Describe the image..." rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (comma separated)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="education, volunteer, event" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetDialog}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={uploading}
                    className="w-full sm:w-auto"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      editingImage ? 'Update Image' : 'Add Image'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-koshish-blue" />
              <div>
                <p className="text-lg md:text-2xl font-bold">{images.length}</p>
                <p className="text-xs md:text-sm text-gray-600">Total Images</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {categories.slice(0, 3).map((category) => (
          <Card key={category}>
            <CardContent className="p-3 md:p-4">
              <div>
                <p className="text-lg md:text-2xl font-bold">
                  {images.filter((img: any) => img.category === category).length}
                </p>
                <p className="text-xs md:text-sm text-gray-600 truncate">{category}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {images.length > 0 ? (
          images.map((image: any) => (
            <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative group">
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-32 md:h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=400&h=300&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => window.open(image.image_url, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => openEditDialog(image)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteImage(image.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-3 md:p-4">
                <h3 className="font-semibold mb-2 text-sm md:text-base truncate">{image.title}</h3>
                {image.description && (
                  <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-2">{image.description}</p>
                )}
                <div className="flex flex-wrap gap-1 mb-2">
                  {image.category && (
                    <Badge variant="secondary" className="text-xs">{image.category}</Badge>
                  )}
                  {image.tags && image.tags.slice(0, 2).map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                  {image.tags && image.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">+{image.tags.length - 2}</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Added: {new Date(image.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 md:p-12 text-center">
                <ImageIcon className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-600 mb-2">No images yet</h3>
                <p className="text-sm md:text-base text-gray-500 mb-4">Start building your gallery by adding some images</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Image
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;
