
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Download, Eye } from "lucide-react";

const DonationsManager = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch donations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('donations')
        .update({ payment_status: status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Payment status updated successfully"
      });

      fetchDonations();
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        title: "Error",
        description: "Failed to update payment status",
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

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      refunded: "bg-gray-100 text-gray-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const filteredDonations = donations.filter((donation: any) => {
    const matchesSearch = donation.donor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.donor_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.cause.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || donation.payment_status === statusFilter;
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-koshish-blue">Donations Management</h2>
          <p className="text-gray-600">Manage and track all donations</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or cause..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Donations List */}
      <div className="space-y-4">
        {filteredDonations.length > 0 ? (
          filteredDonations.map((donation: any) => (
            <Card key={donation.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold text-lg">{donation.donor_name}</h3>
                      <Badge className={getStatusBadge(donation.payment_status)}>
                        {donation.payment_status}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{donation.donor_email}</p>
                    {donation.donor_phone && (
                      <p className="text-gray-600">{donation.donor_phone}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      <strong>Cause:</strong> {donation.cause}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Frequency:</strong> {donation.frequency}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Date:</strong> {new Date(donation.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="text-right space-y-4">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(parseFloat(donation.amount))}
                      </p>
                      <p className="text-sm text-gray-500">{donation.currency}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Select
                        value={donation.payment_status}
                        onValueChange={(value) => updatePaymentStatus(donation.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="refunded">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
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
              <p className="text-gray-500">No donations found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DonationsManager;
