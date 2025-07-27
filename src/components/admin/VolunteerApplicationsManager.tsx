import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, UserCheck, UserX, Eye, Mail, Phone, Users } from "lucide-react";

const VolunteerApplicationsManager = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('volunteer_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching volunteer applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch volunteer applications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('volunteer_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Application ${status} successfully`
      });
      
      fetchApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      under_review: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTypeBadge = (type: string) => {
    return type === 'internship' 
      ? "bg-purple-100 text-purple-800" 
      : "bg-blue-100 text-blue-800";
  };

  const filteredApplications = applications.filter((application: any) => {
    const matchesSearch = application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (application.skills && application.skills.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || application.status === statusFilter;
    const matchesType = typeFilter === "all" || application.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
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
        <h2 className="text-3xl font-bold text-koshish-blue">Volunteer Applications</h2>
        <p className="text-gray-600">Manage volunteer and internship applications</p>
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
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="volunteer">Volunteers</SelectItem>
                <SelectItem value="internship">Internships</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application: any) => (
            <Card key={application.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold text-lg">{application.name}</h3>
                      <Badge className={getStatusBadge(application.status)}>
                        {application.status?.replace('_', ' ')}
                      </Badge>
                      <Badge className={getTypeBadge(application.type)}>
                        {application.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {application.email}
                      </div>
                      {application.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {application.phone}
                        </div>
                      )}
                    </div>
                    {application.skills && (
                      <p className="text-sm text-gray-600">
                        <strong>Skills:</strong> {application.skills}
                      </p>
                    )}
                    {application.availability && (
                      <p className="text-sm text-gray-600">
                        <strong>Availability:</strong> {application.availability}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Applied on: {new Date(application.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            {selectedApplication?.type === 'internship' ? 'Internship' : 'Volunteer'} Application Details
                          </DialogTitle>
                        </DialogHeader>
                        {selectedApplication && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="font-semibold">Name:</label>
                                <p>{selectedApplication.name}</p>
                              </div>
                              <div>
                                <label className="font-semibold">Email:</label>
                                <p>{selectedApplication.email}</p>
                              </div>
                              <div>
                                <label className="font-semibold">Phone:</label>
                                <p>{selectedApplication.phone}</p>
                              </div>
                              <div>
                                <label className="font-semibold">Age:</label>
                                <p>{selectedApplication.age || 'Not provided'}</p>
                              </div>
                              <div>
                                <label className="font-semibold">Type:</label>
                                <Badge className={getTypeBadge(selectedApplication.type)}>
                                  {selectedApplication.type}
                                </Badge>
                              </div>
                              <div>
                                <label className="font-semibold">Status:</label>
                                <Badge className={getStatusBadge(selectedApplication.status)}>
                                  {selectedApplication.status?.replace('_', ' ')}
                                </Badge>
                              </div>
                            </div>
                            {selectedApplication.skills && (
                              <div>
                                <label className="font-semibold">Skills & Qualifications:</label>
                                <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded">{selectedApplication.skills}</p>
                              </div>
                            )}
                            {selectedApplication.experience && (
                              <div>
                                <label className="font-semibold">Previous Experience:</label>
                                <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded">{selectedApplication.experience}</p>
                              </div>
                            )}
                            {selectedApplication.why && (
                              <div>
                                <label className="font-semibold">Why do they want to volunteer?</label>
                                <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded">{selectedApplication.why}</p>
                              </div>
                            )}
                            {selectedApplication.interests && selectedApplication.interests.length > 0 && (
                              <div>
                                <label className="font-semibold">Areas of Interest:</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {selectedApplication.interests.map((interest: string, idx: number) => (
                                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                      {interest}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="font-semibold">Availability:</label>
                                <p>{selectedApplication.availability || 'Not provided'}</p>
                              </div>
                              <div>
                                <label className="font-semibold">Location:</label>
                                <p>{selectedApplication.location || 'Not provided'}</p>
                              </div>
                            </div>
                            <div>
                              <label className="font-semibold">Applied Date:</label>
                              <p>{new Date(selectedApplication.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-2 pt-4 border-t">
                              <Button 
                                size="sm" 
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'under_review')}
                                className="bg-yellow-600 hover:bg-yellow-700"
                              >
                                Under Review
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'accepted')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Accept
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    {application.status === 'new' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => updateApplicationStatus(application.id, 'accepted')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => updateApplicationStatus(application.id, 'rejected')}
                        >
                          <UserX className="w-4 h-4 mr-1" />
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
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No volunteer applications found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VolunteerApplicationsManager;
