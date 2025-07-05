import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, DollarSign, UserCheck, TrendingUp } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    totalVolunteers: 0,
    activePrograms: 0,
    pendingVolunteers: 0,
  });
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch donations stats
      const { data: donations } = await supabase
        .from('donations')
        .select('amount');
      
      const totalDonations = donations?.length || 0;
      const totalAmount = donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;

      // Fetch volunteers stats
      const { data: volunteers } = await supabase
        .from('volunteers')
        .select('status');
      
      const totalVolunteers = volunteers?.length || 0;
      const pendingVolunteers = volunteers?.filter(v => v.status === 'pending').length || 0;

      // Fetch programs stats
      const { data: programs } = await supabase
        .from('programs')
        .select('status');
      
      const activePrograms = programs?.filter(p => p.status === 'active').length || 0;

      // Fetch recent donations
      const { data: recentDonations } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalDonations,
        totalAmount,
        totalVolunteers,
        activePrograms,
        pendingVolunteers,
      });

      setRecentDonations(recentDonations || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-koshish-blue mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome to your admin dashboard. Here's what's happening.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Heart className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter end={stats.totalDonations} />
            </div>
            <p className="text-xs text-muted-foreground">All time donations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalAmount)}
            </div>
            <p className="text-xs text-muted-foreground">Total funds raised</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volunteers</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter end={stats.totalVolunteers} />
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingVolunteers} pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter end={stats.activePrograms} />
            </div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Donations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDonations.length > 0 ? (
              recentDonations.map((donation: any) => (
                <div key={donation.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{donation.donor_name}</p>
                    <p className="text-sm text-gray-600">{donation.cause}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(donation.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {formatCurrency(Number(donation.amount))}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{donation.payment_status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No donations yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
