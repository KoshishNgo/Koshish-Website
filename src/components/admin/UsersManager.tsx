
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Shield, User, Mail, Phone, Calendar } from "lucide-react";

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `User role updated to ${newRole}`
      });

      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive"
      });
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      volunteer: "bg-blue-100 text-blue-800",
      donor: "bg-green-100 text-green-800",
      user: "bg-gray-100 text-gray-800"
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const filteredUsers = users.filter((user: any) => {
    const matchesSearch = 
      (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
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
        <h2 className="text-3xl font-bold text-koshish-blue">Users Management</h2>
        <p className="text-gray-600">Manage user accounts and permissions</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="donor">Donor</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user: any) => (
            <Card key={user.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <h3 className="font-semibold text-lg">
                          {user.full_name || 'No name provided'}
                        </h3>
                      </div>
                      <Badge className={getRoleBadge(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      {user.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </div>
                      )}
                      
                      {user.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {user.phone}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Joined: {new Date(user.created_at).toLocaleDateString()}
                      </div>
                      
                      {user.updated_at !== user.created_at && (
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar className="w-3 h-3" />
                          Updated: {new Date(user.updated_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Select
                      value={user.role}
                      onValueChange={(value) => updateUserRole(user.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="donor">Donor</SelectItem>
                        <SelectItem value="volunteer">Volunteer</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No users found</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Stats */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">User Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-koshish-blue">
                {users.length}
              </div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {users.filter((u: any) => u.role === 'admin').length}
              </div>
              <div className="text-sm text-gray-600">Admins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {users.filter((u: any) => u.role === 'volunteer').length}
              </div>
              <div className="text-sm text-gray-600">Volunteers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {users.filter((u: any) => u.role === 'donor').length}
              </div>
              <div className="text-sm text-gray-600">Donors</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManager;
