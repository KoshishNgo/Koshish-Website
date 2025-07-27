import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye, Mail, Phone, MessageSquare } from "lucide-react";

const ContactMessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contact messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Message marked as ${status}`
      });
      
      fetchMessages();
    } catch (error) {
      console.error('Error updating message status:', error);
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      read: "bg-yellow-100 text-yellow-800",
      replied: "bg-green-100 text-green-800",
      resolved: "bg-gray-100 text-gray-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const filteredMessages = messages.filter((message: any) => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (message.subject && message.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
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
        <h2 className="text-3xl font-bold text-koshish-blue">Contact Messages</h2>
        <p className="text-gray-600">Manage incoming contact form messages</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, subject, or message..."
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
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message: any) => (
            <Card key={message.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold text-lg">{message.name}</h3>
                      <Badge className={getStatusBadge(message.status)}>
                        {message.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {message.email}
                      </div>
                    </div>
                    {message.subject && (
                      <p className="text-sm font-medium text-gray-800">
                        <strong>Subject:</strong> {message.subject}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {message.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      Received: {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedMessage(message)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Contact Message Details</DialogTitle>
                        </DialogHeader>
                        {selectedMessage && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="font-semibold">Name:</label>
                                <p>{selectedMessage.name}</p>
                              </div>
                              <div>
                                <label className="font-semibold">Email:</label>
                                <p>{selectedMessage.email}</p>
                              </div>
                              <div>
                                <label className="font-semibold">Status:</label>
                                <Badge className={getStatusBadge(selectedMessage.status)}>
                                  {selectedMessage.status}
                                </Badge>
                              </div>
                              <div>
                                <label className="font-semibold">Received:</label>
                                <p>{new Date(selectedMessage.created_at).toLocaleDateString()}</p>
                              </div>
                            </div>
                            {selectedMessage.subject && (
                              <div>
                                <label className="font-semibold">Subject:</label>
                                <p>{selectedMessage.subject}</p>
                              </div>
                            )}
                            <div>
                              <label className="font-semibold">Message:</label>
                              <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded">{selectedMessage.message}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                                className="bg-yellow-600 hover:bg-yellow-700"
                              >
                                Mark as Read
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Mark as Replied
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => updateMessageStatus(selectedMessage.id, 'resolved')}
                                className="bg-gray-600 hover:bg-gray-700"
                              >
                                Mark as Resolved
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        onClick={() => updateMessageStatus(message.id, 'read')}
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        Read
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => updateMessageStatus(message.id, 'replied')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Replied
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No contact messages found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContactMessagesManager;
