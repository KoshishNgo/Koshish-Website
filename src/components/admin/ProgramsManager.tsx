
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, Target, Users } from "lucide-react";

const ProgramsManager = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      goal_amount: "",
      target_beneficiaries: "",
      status: "active",
      image_url: ""
    }
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch programs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const programData = {
        ...data,
        goal_amount: data.goal_amount ? parseFloat(data.goal_amount) : null,
        target_beneficiaries: data.target_beneficiaries ? parseInt(data.target_beneficiaries) : null,
      };

      if (editingProgram) {
        const { error } = await supabase
          .from('programs')
          .update(programData)
          .eq('id', editingProgram.id);

        if (error) throw error;
        toast({ title: "Success", description: "Program updated successfully" });
      } else {
        const { error } = await supabase
          .from('programs')
          .insert([programData]);

        if (error) throw error;
        toast({ title: "Success", description: "Program created successfully" });
      }

      setIsAddDialogOpen(false);
      setEditingProgram(null);
      form.reset();
      fetchPrograms();
    } catch (error) {
      console.error('Error saving program:', error);
      toast({
        title: "Error",
        description: "Failed to save program",
        variant: "destructive"
      });
    }
  };

  const deleteProgram = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: "Success", description: "Program deleted successfully" });
      fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
      toast({
        title: "Error",
        description: "Failed to delete program",
        variant: "destructive"
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const openEditDialog = (program: any) => {
    setEditingProgram(program);
    form.reset({
      title: program.title,
      description: program.description || "",
      goal_amount: program.goal_amount?.toString() || "",
      target_beneficiaries: program.target_beneficiaries?.toString() || "",
      status: program.status,
      image_url: program.image_url || ""
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
          <h2 className="text-3xl font-bold text-koshish-blue">Programs Management</h2>
          <p className="text-gray-600">Manage Charitable Trust programs and initiatives</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingProgram(null);
              form.reset();
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProgram ? 'Edit Program' : 'Add New Program'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter program title" />
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
                        <Textarea {...field} placeholder="Enter program description" rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="goal_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Goal Amount (₹)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="target_beneficiaries"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Beneficiaries</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                        </SelectContent>
                      </Select>
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

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProgram ? 'Update' : 'Create'} Program
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Programs List */}
      <div className="grid gap-6">
        {programs.length > 0 ? (
          programs.map((program: any) => (
            <Card key={program.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-semibold">{program.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        program.status === 'active' ? 'bg-green-100 text-green-800' :
                        program.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {program.status}
                      </span>
                    </div>
                    
                    {program.description && (
                      <p className="text-gray-600">{program.description}</p>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {program.goal_amount && (
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-gray-500">Goal</p>
                            <p className="font-semibold">{formatCurrency(program.goal_amount)}</p>
                          </div>
                        </div>
                      )}
                      
                      {program.raised_amount !== null && (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-600 rounded-full" />
                          <div>
                            <p className="text-gray-500">Raised</p>
                            <p className="font-semibold">{formatCurrency(program.raised_amount)}</p>
                          </div>
                        </div>
                      )}
                      
                      {program.target_beneficiaries && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-600" />
                          <div>
                            <p className="text-gray-500">Target</p>
                            <p className="font-semibold">{program.target_beneficiaries} people</p>
                          </div>
                        </div>
                      )}
                      
                      {program.current_beneficiaries !== null && (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-orange-600 rounded-full" />
                          <div>
                            <p className="text-gray-500">Current</p>
                            <p className="font-semibold">{program.current_beneficiaries} people</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      Created: {new Date(program.created_at).toLocaleDateString()}
                      {program.updated_at !== program.created_at && (
                        <span> • Updated: {new Date(program.updated_at).toLocaleDateString()}</span>
                      )}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(program)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteProgram(program.id)}
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
              <p className="text-gray-500">No programs found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProgramsManager;
