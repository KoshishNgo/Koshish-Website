
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, Users, Settings, Database } from "lucide-react";

const AdminGuide = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-koshish-blue mb-4 flex items-center justify-center">
          <Shield className="w-8 h-8 mr-3" />
          Admin Panel Access Guide
        </h1>
        <p className="text-gray-600">Complete guide to accessing and using your NGO admin panel</p>
      </div>

      {/* Access Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="w-5 h-5 mr-2" />
            How to Access Admin Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-koshish-blue mb-2">Step 1: Navigate to Admin URL</h3>
            <p className="text-sm text-gray-700 mb-2">Go to your website URL followed by <code className="bg-gray-200 px-2 py-1 rounded">/admin</code></p>
            <p className="text-xs text-gray-600">Example: <code>https://yourwebsite.com/admin</code></p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-koshish-blue mb-2">Step 2: Create Admin User</h3>
            <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
              <li>Go to your Supabase dashboard</li>
              <li>Navigate to Authentication → Users</li>
              <li>Create a new user or use existing one</li>
              <li>Note down the email and set a password</li>
            </ol>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-koshish-blue mb-2">Step 3: Set Admin Role</h3>
            <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
              <li>In Supabase, go to Table Editor → profiles table</li>
              <li>Find your user's profile row</li>
              <li>Set the <code className="bg-gray-200 px-1 rounded">role</code> field to <Badge variant="outline">admin</Badge></li>
              <li>Save the changes</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Login Credentials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Default Login Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Login Form Fields:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email:</span>
                <code className="bg-white px-2 py-1 rounded">Your admin email</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Password:</span>
                <code className="bg-white px-2 py-1 rounded">Your set password</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Admin Panel Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-koshish-blue">Dashboard</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Statistics overview</li>
                <li>• Recent donations</li>
                <li>• Key metrics</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-koshish-blue">Donations</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• View all donations</li>
                <li>• Update payment status</li>
                <li>• Generate reports</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-koshish-blue">Volunteers</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Review applications</li>
                <li>• Approve/reject volunteers</li>
                <li>• Manage volunteer data</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-koshish-blue">Content Management</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Manage blog posts</li>
                <li>• Upload gallery images</li>
                <li>• Edit programs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Setup */}
      <Card className="border-l-4 border-koshish-gold">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Quick Setup Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">Create user account in Supabase Auth</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">Set user role to 'admin' in profiles table</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">Navigate to /admin URL</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">Login with admin credentials</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">Verify access to all admin features</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="bg-gradient-to-r from-koshish-blue to-blue-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-bold mb-2">Need Help?</h3>
          <p className="text-sm opacity-90">
            If you're having trouble accessing the admin panel, check your Supabase configuration 
            and ensure your user has the correct admin role assigned.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGuide;
