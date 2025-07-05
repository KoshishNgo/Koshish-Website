
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, UserCheck, UserX, Eye, Mail, Phone } from "lucide-react";

const VolunteersManager = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVolunteers(data || []);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch volunteers",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateVolunteerStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('volunteers')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Volunteer ${status} successfully`
      });

      fetchVolunteers();
    } catch (error) {
      console.error('Error updating volunteer status:', error);
      toast({
        title: "Error",
        description: "Failed to update volunteer status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const filteredVolunteers = volunteers.filter((volunteer: any) => {
    const matchesSearch = volunteer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (volunteer.skills && volunteer.skills.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || volunteer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
      <div>
        <h2 className="text-3xl font-bold text-koshish-blue">Volunteers Management</h2>
        <p className="text-gray-600">Manage volunteer applications and approvals</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Volunteers List */}
      <div className="space-y-4">
        {filteredVolunteers.length > 0 ? (
          filteredVolunteers.map((volunteer: any) => (
            <Card key={volunteer.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold text-lg">{volunteer.full_name}</h3>
                      <Badge className={getStatusBadge(volunteer.status)}>
                        {volunteer.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {volunteer.email}
                      </div>
                      {volunteer.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {volunteer.phone}
                        </div>
                      )}
                    </div>
                    {volunteer.skills && (
                      <p className="text-sm text-gray-600">
                        <strong>Skills:</strong> {volunteer.skills}
                      </p>
                    )}
                    {volunteer.availability && (
                      <p className="text-sm text-gray-600">
                        <strong>Availability:</strong> {volunteer.availability}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Applied on: {new Date(volunteer.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedVolunteer(volunteer)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Volunteer Application Details</DialogTitle>
                        </DialogHeader>
                        {selectedVolunteer && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="font-semibold">Full Name:</label>
                                <p>{selectedVolunteer.full_name}</p>
                              </div>
                              <div>
                                <label className="font-semibold">Email:</label>
                                <p>{selectedVolunteer.email}</p>
                              </div>
                              <div>
                                <label className="font-semibold">Phone:</label>
                                <p>{selectedVolunteer.phone || 'Not provided'}</p>
                              </div>
                              <div>
                                <label className="font-semibold">Status:</label>
                                <Badge className={getStatusBadge(selectedVolunteer.status)}>
                                  {selectedVolunteer.status}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <label className="font-semibold">Skills:</label>
                              <p>{selectedVolunteer.skills || 'Not provided'}</p>
                            </div>
                            <div>
                              <label className="font-semibold">Availability:</label>
                              <p>{selectedVolunteer.availability || 'Not provided'}</p>
                            </div>
                            <div>
                              <label className="font-semibold">Motivation:</label>
                              <p>{selectedVolunteer.motivation || 'Not provided'}</p>
                            </div>
                            <div>
                              <label className="font-semibold">Applied Date:</label>
                              <p>{new Date(selectedVolunteer.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    {volunteer.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => updateVolunteerStatus(volunteer.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <UserCheck className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => updateVolunteerStatus(volunteer.id, 'rejected')}
                        >
                          <UserX className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No volunteers found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VolunteersManager;
