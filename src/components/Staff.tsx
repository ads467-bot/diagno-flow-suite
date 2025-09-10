import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Users, 
  UserPlus, 
  Search, 
  Edit, 
  Trash2,
  Phone,
  Mail,
  Calendar,
  Clock
} from "lucide-react";

interface StaffProps {
  userRole: "admin" | "franchise";
}

export function Staff({ userRole }: StaffProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const staffMembers = [
    {
      id: "STF001",
      name: "Dr. Sarah Johnson",
      role: "Lab Director",
      department: "Administration",
      email: "sarah.johnson@medlab.com",
      phone: "+91 98765 43210",
      joinDate: "2023-01-15",
      status: "Active",
      shift: "Day",
      salary: "₹1,25,000",
      avatar: "/placeholder.svg"
    },
    {
      id: "STF002", 
      name: "Michael Chen",
      role: "Senior Technician",
      department: "Hematology",
      email: "michael.chen@medlab.com", 
      phone: "+91 98765 43211",
      joinDate: "2023-03-20",
      status: "Active",
      shift: "Day",
      salary: "₹85,000",
      avatar: "/placeholder.svg"
    },
    {
      id: "STF003",
      name: "Priya Sharma",
      role: "Receptionist",
      department: "Front Office", 
      email: "priya.sharma@medlab.com",
      phone: "+91 98765 43212",
      joinDate: "2023-06-10",
      status: "Active",
      shift: "Morning",
      salary: "₹35,000",
      avatar: "/placeholder.svg"
    },
    {
      id: "STF004",
      name: "James Wilson",
      role: "Lab Technician",
      department: "Biochemistry",
      email: "james.wilson@medlab.com",
      phone: "+91 98765 43213", 
      joinDate: "2023-08-05",
      status: "On Leave",
      shift: "Evening",
      salary: "₹65,000",
      avatar: "/placeholder.svg"
    },
    {
      id: "STF005",
      name: "Anita Patel",
      role: "Quality Controller",
      department: "Quality Assurance",
      email: "anita.patel@medlab.com",
      phone: "+91 98765 43214",
      joinDate: "2023-09-12",
      status: "Active", 
      shift: "Day",
      salary: "₹95,000",
      avatar: "/placeholder.svg"
    },
  ];

  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "On Leave":
        return <Badge className="bg-yellow-100 text-yellow-800">On Leave</Badge>;
      case "Inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      "Lab Director": "bg-purple-100 text-purple-800",
      "Senior Technician": "bg-blue-100 text-blue-800",
      "Lab Technician": "bg-cyan-100 text-cyan-800",
      "Receptionist": "bg-pink-100 text-pink-800",
      "Quality Controller": "bg-orange-100 text-orange-800"
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const activeStaff = filteredStaff.filter(staff => staff.status === "Active").length;
  const totalStaff = filteredStaff.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage your team members and their roles
          </p>
        </div>
        {userRole === "admin" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Add Staff Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogDescription>
                  Enter staff member details
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="staff-name">Full Name</Label>
                  <Input id="staff-name" placeholder="Enter full name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lab-director">Lab Director</SelectItem>
                      <SelectItem value="senior-technician">Senior Technician</SelectItem>
                      <SelectItem value="lab-technician">Lab Technician</SelectItem>
                      <SelectItem value="receptionist">Receptionist</SelectItem>
                      <SelectItem value="quality-controller">Quality Controller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administration">Administration</SelectItem>
                      <SelectItem value="hematology">Hematology</SelectItem>
                      <SelectItem value="biochemistry">Biochemistry</SelectItem>
                      <SelectItem value="front-office">Front Office</SelectItem>
                      <SelectItem value="quality-assurance">Quality Assurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="staff-email">Email</Label>
                  <Input id="staff-email" type="email" placeholder="Enter email address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="staff-phone">Phone</Label>
                  <Input id="staff-phone" placeholder="Enter phone number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="shift">Shift</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8AM - 4PM)</SelectItem>
                      <SelectItem value="day">Day (9AM - 6PM)</SelectItem>
                      <SelectItem value="evening">Evening (2PM - 10PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="salary">Monthly Salary (₹)</Label>
                  <Input id="salary" type="number" placeholder="Enter salary amount" />
                </div>
              </div>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Staff Member
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold text-primary">{totalStaff}</p>
              </div>
              <Users className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Staff</p>
                <p className="text-2xl font-bold text-green-600">{activeStaff}</p>
              </div>
              <UserPlus className="w-8 h-8 text-green-600/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold text-primary">5</p>
              </div>
              <Calendar className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {filteredStaff.filter(s => s.status === "On Leave").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Staff Members</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
                {userRole === "admin" && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={staff.avatar} />
                        <AvatarFallback>
                          {staff.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{staff.name}</div>
                        <div className="text-sm text-muted-foreground">{staff.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadge(staff.role)}>
                      {staff.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span>{staff.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{staff.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{staff.joinDate}</TableCell>
                  <TableCell>{staff.shift}</TableCell>
                  <TableCell className="font-medium">{staff.salary}</TableCell>
                  <TableCell>{getStatusBadge(staff.status)}</TableCell>
                  {userRole === "admin" && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}