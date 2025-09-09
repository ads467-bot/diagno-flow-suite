import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Lock, 
  Bell, 
  Shield,
  Building,
  Save,
  Mail,
  Phone
} from "lucide-react";

interface SettingsProps {
  userRole: "admin" | "franchise";
}

export function Settings({ userRole }: SettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" defaultValue="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" defaultValue="Doe" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="Enter email" defaultValue="john.doe@medlab.com" className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="phone" placeholder="Enter phone number" defaultValue="+91 9876543210" className="pl-10" />
              </div>
            </div>
            <Button className="bg-gradient-primary text-white">
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="currentPassword" type="password" placeholder="Enter current password" className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="newPassword" type="password" placeholder="Enter new password" className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" className="pl-10" />
              </div>
            </div>
            <Button className="bg-gradient-primary text-white">
              <Save className="mr-2 h-4 w-4" />
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Organization Settings (Admin Only) */}
        {userRole === "admin" && (
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Organization Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" placeholder="Enter organization name" defaultValue="MedLab Pro Diagnostics" />
              </div>
              <div>
                <Label htmlFor="orgAddress">Organization Address</Label>
                <Input id="orgAddress" placeholder="Enter organization address" defaultValue="123 Medical Street, Healthcare City" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orgPhone">Contact Phone</Label>
                  <Input id="orgPhone" placeholder="Enter contact phone" defaultValue="+91 1234567890" />
                </div>
                <div>
                  <Label htmlFor="orgEmail">Contact Email</Label>
                  <Input id="orgEmail" type="email" placeholder="Enter contact email" defaultValue="contact@medlabpro.com" />
                </div>
              </div>
              <Button className="bg-gradient-primary text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Organization
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Notification Settings */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" className="text-base font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch id="emailNotifications" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reportAlerts" className="text-base font-medium">Report Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when reports are ready</p>
              </div>
              <Switch id="reportAlerts" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="appointmentReminders" className="text-base font-medium">Appointment Reminders</Label>
                <p className="text-sm text-muted-foreground">Receive appointment notifications</p>
              </div>
              <Switch id="appointmentReminders" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="systemAlerts" className="text-base font-medium">System Alerts</Label>
                <p className="text-sm text-muted-foreground">Important system notifications</p>
              </div>
              <Switch id="systemAlerts" defaultChecked />
            </div>
            
            <Button className="bg-gradient-primary text-white">
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}