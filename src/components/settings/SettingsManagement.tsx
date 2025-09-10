import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  UserCog, 
  KeyRound, 
  ShieldCheck, 
  Info, 
  LogOut,
  Award,
  Bell,
  Database,
  Printer,
  Wifi
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SettingsManagementProps {
  userRole: "admin" | "franchise";
  view?: "profile" | "password" | "security" | "about" | "certificate";
}

export function SettingsManagement({ userRole, view = "profile" }: SettingsManagementProps) {
  const systemSettings = [
    { title: "User Profile", icon: UserCog, description: "Update personal information and preferences", action: "Configure" },
    { title: "Change Password", icon: KeyRound, description: "Update your account password", action: "Change" },
    { title: "Security Settings", icon: ShieldCheck, description: "Manage two-factor authentication and security", action: "Manage" },
    { title: "Notifications", icon: Bell, description: "Configure email and system notifications", action: "Settings" },
    { title: "Generate Certificate", icon: Award, description: "Generate lab certification documents", action: "Generate" },
    { title: "Database Backup", icon: Database, description: "Backup and restore system data", action: "Backup" },
    { title: "Printer Settings", icon: Printer, description: "Configure report and label printers", action: "Setup" },
    { title: "Network Settings", icon: Wifi, description: "Configure network and connectivity", action: "Configure" },
  ];

  const userProfile = {
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@pathlab.com",
    phone: "+91 9876543210",
    designation: "Senior Pathologist",
    labName: "PATHO LAB - FAMILY DIAGNOSTIC",
    address: "123 Medical Complex, Health Street, Mumbai - 400001"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage system preferences and account settings</p>
        </div>
        <Button variant="destructive" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="h-5 w-5" />
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={userProfile.name} />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={userProfile.email} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue={userProfile.phone} />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input id="designation" defaultValue={userProfile.designation} />
              </div>
              <div>
                <Label htmlFor="labName">Laboratory Name</Label>
                <Input id="labName" defaultValue={userProfile.labName} />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={userProfile.address} />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button>Update Profile</Button>
          </div>
        </CardContent>
      </Card>

      {/* System Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoBackup">Automatic Backup</Label>
                <p className="text-sm text-muted-foreground">Enable automatic daily data backup</p>
              </div>
              <Switch id="autoBackup" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="darkMode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Use dark theme for the interface</p>
              </div>
              <Switch id="darkMode" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add extra security to your account</p>
              </div>
              <Switch id="twoFactor" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemSettings.map((setting, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <setting.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{setting.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{setting.description}</p>
                  <Button size="sm" variant="outline">
                    {setting.action}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            About System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">System Information</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Version: 2.1.5</p>
                <p>Build: 20241201</p>
                <p>Database: MySQL 8.0</p>
                <p>Server: Ubuntu 22.04</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">License</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Licensed to: PATHO LAB</p>
                <p>License Type: Enterprise</p>
                <p>Expires: Dec 31, 2024</p>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Support</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Email: support@pathlab.com</p>
                <p>Phone: +91 1800-XXX-XXXX</p>
                <p>Documentation: Available</p>
                <Button size="sm" variant="outline" className="mt-2">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}