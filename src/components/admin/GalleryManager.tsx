
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
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);
  const { toast } = useToast();

  const categories = [
    "Education Programs",
    "Women Empowerment",
    "Legal Aid",
    "Emergency Relief",
    "Volunteers",
    "Events",
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

  const onSubmit = async (data: any) => {
    try {
      const imageData = {
        ...data,
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
      form.reset();
      fetchImages();
    } catch (error) {
      console.error('Error saving image:', error);
      toast({
        title: "Error",
        description: "Failed to save image",
        variant: "destructive"
      });
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

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
    setIsAddDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-koshish-blue">Gallery Management</h2>
          <p className="text-gray-600">Manage photos and media content</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingImage(null);
              form.reset();
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingImage ? 'Edit Image' : 'Add New Image'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter image title" />
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
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/image.jpg" />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingImage ? 'Update' : 'Add'} Image
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.length > 0 ? (
          images.map((image: any) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=400&h=300&fit=crop";
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(image)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteImage(image.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{image.title}</h3>
                {image.description && (
                  <p className="text-sm text-gray-600 mb-2">{image.description}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {image.category && (
                    <Badge variant="secondary">{image.category}</Badge>
                  )}
                  {image.tags && image.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Added: {new Date(image.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No images in gallery yet</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;
