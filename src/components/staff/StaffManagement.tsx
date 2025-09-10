import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, UserCheck, Phone, Mail, Calendar, Award } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface StaffManagementProps {
  userRole: "admin" | "franchise";
  view?: "add" | "list" | "my";
}

export function StaffManagement({ userRole, view = "list" }: StaffManagementProps) {
  const staffStats = [
    { title: "Total Staff", value: "45", icon: Users, color: "bg-blue-500" },
    { title: "Active Today", value: "38", icon: UserCheck, color: "bg-green-500" },
    { title: "On Leave", value: "3", icon: Calendar, color: "bg-orange-500" },
    { title: "New This Month", value: "2", icon: UserPlus, color: "bg-purple-500" },
  ];

  const staffMembers = [
    {
      id: "STF001",
      name: "Dr. Rajesh Kumar",
      role: "Senior Pathologist",
      department: "Pathology",
      phone: "+91 9876543210",
      email: "rajesh.kumar@pathlab.com",
      status: "Active",
      joinDate: "2020-03-15",
      experience: "15 years"
    },
    {
      id: "STF002",
      name: "Ms. Priya Sharma",
      role: "Lab Technician",
      department: "Laboratory",
      phone: "+91 9876543211",
      email: "priya.sharma@pathlab.com",
      status: "Active",
      joinDate: "2022-07-01",
      experience: "5 years"
    },
    {
      id: "STF003",
      name: "Mr. Amit Patel",
      role: "Receptionist",
      department: "Front Desk",
      phone: "+91 9876543212",
      email: "amit.patel@pathlab.com",
      status: "On Leave",
      joinDate: "2021-11-20",
      experience: "3 years"
    },
    {
      id: "STF004",
      name: "Dr. Sunita Verma",
      role: "Microbiologist",
      department: "Microbiology",
      phone: "+91 9876543213",
      email: "sunita.verma@pathlab.com",
      status: "Active",
      joinDate: "2019-08-10",
      experience: "12 years"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return <Badge className="bg-green-500 text-white">Active</Badge>;
      case "On Leave": return <Badge variant="outline" className="text-orange-600">On Leave</Badge>;
      case "Inactive": return <Badge variant="outline" className="text-red-600">Inactive</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    if (role.includes("Dr.")) return <Badge variant="outline" className="text-blue-600">Doctor</Badge>;
    if (role.includes("Technician")) return <Badge variant="outline" className="text-green-600">Technician</Badge>;
    return <Badge variant="outline" className="text-gray-600">Staff</Badge>;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Manage laboratory staff and their details</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Performance
          </Button>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {staffStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Staff List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Staff Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {staffMembers.map((staff) => (
              <div key={staff.id} className="flex items-start justify-between p-6 border rounded-lg">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(staff.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{staff.name}</h3>
                      {getRoleBadge(staff.role)}
                      {getStatusBadge(staff.status)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{staff.role} • {staff.department}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {staff.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {staff.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>ID: {staff.id}</span>
                        <span>Joined: {staff.joinDate}</span>
                        <span>Experience: {staff.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}