
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, Eye, FileText } from "lucide-react";

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      image_url: "",
      tags: "",
      published: false
    }
  });

  useEffect(() => {
    checkUser();
    fetchPosts();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user);
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create posts",
        variant: "destructive"
      });
      return;
    }

    try {
      const postData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : [],
        author_id: user.id
      };

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) throw error;
        toast({ title: "Success", description: "Post updated successfully" });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) throw error;
        toast({ title: "Success", description: "Post created successfully" });
      }

      setIsAddDialogOpen(false);
      setEditingPost(null);
      form.reset();
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive"
      });
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: "Success", description: "Post deleted successfully" });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive"
      });
    }
  };

  const togglePublished = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Post ${published ? 'published' : 'unpublished'} successfully`
      });
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (post: any) => {
    setEditingPost(post);
    form.reset({
      title: post.title,
      excerpt: post.excerpt || "",
      content: post.content,
      image_url: post.image_url || "",
      tags: post.tags ? post.tags.join(', ') : "",
      published: post.published
    });
    setIsAddDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
          <h2 className="text-3xl font-bold text-koshish-blue">Blog Management</h2>
          <p className="text-gray-600">Create and manage blog posts</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingPost(null);
              form.reset();
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
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
                        <Input {...field} placeholder="Enter post title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Brief description..." rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Write your blog post content here..." rows={10} />
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
                      <FormLabel>Featured Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/image.jpg" />
                      </FormControl>
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
                        <Input {...field} placeholder="education, women empowerment, legal aid" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Publish Post</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Make this post visible to the public
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
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
                    {editingPost ? 'Update' : 'Create'} Post
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    
                    {post.excerpt && (
                      <p className="text-gray-600">{post.excerpt}</p>
                    )}
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {post.content.length} characters
                      </div>
                      <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                      {post.updated_at !== post.created_at && (
                        <span>Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublished(post.id, !post.published)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {post.published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(post)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deletePost(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No blog posts found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlogManager;
