import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Building, 
  Plus, 
  Search, 
  Edit, 
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Users,
  TestTube,
  DollarSign
} from "lucide-react";

interface FranchiseProps {
  userRole: "admin" | "franchise";
}

export function Franchise({ userRole }: FranchiseProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const franchises = [
    {
      id: "FRN001",
      name: "MedLab Downtown",
      ownerName: "Dr. Rajesh Kumar", 
      location: "Downtown Business District",
      address: "123 Main Street, Downtown, Mumbai - 400001",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@medlab.com",
      establishedDate: "2023-01-15",
      status: "Active",
      testsCompleted: 2450,
      monthlyRevenue: 185000,
      staff: 8,
      performanceScore: 95
    },
    {
      id: "FRN002",
      name: "MedLab Uptown",
      ownerName: "Dr. Priya Sharma",
      location: "Uptown Medical Center",
      address: "456 Health Avenue, Uptown, Mumbai - 400020",
      phone: "+91 98765 43211", 
      email: "priya.sharma@medlab.com",
      establishedDate: "2023-03-20",
      status: "Active",
      testsCompleted: 1890,
      monthlyRevenue: 142000,
      staff: 6,
      performanceScore: 88
    },
    {
      id: "FRN003", 
      name: "MedLab City Mall",
      ownerName: "Dr. Amit Patel",
      location: "City Mall Complex",
      address: "789 Shopping Plaza, City Center, Mumbai - 400015",
      phone: "+91 98765 43212",
      email: "amit.patel@medlab.com", 
      establishedDate: "2023-06-10",
      status: "Active",
      testsCompleted: 1250,
      monthlyRevenue: 98000,
      staff: 5,
      performanceScore: 82
    },
    {
      id: "FRN004",
      name: "MedLab Suburban",
      ownerName: "Dr. Sarah Johnson",
      location: "Suburban Healthcare Hub",
      address: "321 Wellness Road, Suburbs, Mumbai - 400050", 
      phone: "+91 98765 43213",
      email: "sarah.johnson@medlab.com",
      establishedDate: "2023-08-05",
      status: "Under Review",
      testsCompleted: 680,
      monthlyRevenue: 52000,
      staff: 4,
      performanceScore: 75
    },
    {
      id: "FRN005",
      name: "MedLab Express",
      ownerName: "Dr. Michael Chen",
      location: "Express Healthcare Center", 
      address: "654 Quick Care Lane, Express District, Mumbai - 400030",
      phone: "+91 98765 43214",
      email: "michael.chen@medlab.com",
      establishedDate: "2023-09-12",
      status: "Inactive",
      testsCompleted: 420,
      monthlyRevenue: 28000,
      staff: 3,
      performanceScore: 65
    },
  ];

  const filteredFranchises = franchises.filter(franchise =>
    franchise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    franchise.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    franchise.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "Under Review":
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case "Inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600"; 
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const activeFranchises = filteredFranchises.filter(f => f.status === "Active").length;
  const totalRevenue = filteredFranchises.reduce((sum, f) => sum + f.monthlyRevenue, 0);
  const totalTests = filteredFranchises.reduce((sum, f) => sum + f.testsCompleted, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Franchise Management</h1>
          <p className="text-muted-foreground">
            {userRole === "admin" 
              ? "Manage and monitor all franchise locations" 
              : "View franchise network information"}
          </p>
        </div>
        {userRole === "admin" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Franchise
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Franchise</DialogTitle>
                <DialogDescription>
                  Register a new franchise location
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="franchise-name">Franchise Name</Label>
                  <Input id="franchise-name" placeholder="Enter franchise name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="owner-name">Owner Name</Label>
                  <Input id="owner-name" placeholder="Enter owner's full name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location/area" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea id="address" placeholder="Enter complete address" rows={3} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Initial Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Franchise
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
                <p className="text-sm font-medium text-muted-foreground">Total Franchises</p>
                <p className="text-2xl font-bold text-primary">{filteredFranchises.length}</p>
              </div>
              <Building className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Locations</p>
                <p className="text-2xl font-bold text-green-600">{activeFranchises}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tests</p>
                <p className="text-2xl font-bold text-primary">{totalTests.toLocaleString()}</p>
              </div>
              <TestTube className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Network Revenue</p>
                <p className="text-2xl font-bold text-primary">₹{(totalRevenue / 100000).toFixed(1)}L</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Franchise Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Franchise Locations</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search franchises..."
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
                <TableHead>Franchise Details</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Monthly Stats</TableHead>
                <TableHead>Status</TableHead>
                {userRole === "admin" && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFranchises.map((franchise) => (
                <TableRow key={franchise.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{franchise.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {franchise.location}
                      </div>
                      <div className="text-xs text-muted-foreground">{franchise.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{franchise.ownerName}</div>
                      <div className="text-sm text-muted-foreground">
                        Since {franchise.establishedDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{franchise.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span>{franchise.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className={`font-medium ${getPerformanceColor(franchise.performanceScore)}`}>
                        {franchise.performanceScore}%
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {franchise.staff} staff
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div>{franchise.testsCompleted} tests</div>
                      <div className="font-medium">₹{(franchise.monthlyRevenue / 1000).toFixed(0)}k</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(franchise.status)}</TableCell>
                  {userRole === "admin" && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          View
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