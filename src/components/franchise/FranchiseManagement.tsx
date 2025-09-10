import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Plus, CreditCard, MapPin, Users, IndianRupee, TrendingUp } from "lucide-react";

interface FranchiseManagementProps {
  userRole: "admin" | "franchise";
  view?: "add" | "list" | "credits" | "pricing";
}

export function FranchiseManagement({ userRole, view = "list" }: FranchiseManagementProps) {
  const franchiseStats = [
    { title: "Total Franchises", value: "28", icon: Building, color: "bg-blue-500" },
    { title: "Active Franchises", value: "25", icon: TrendingUp, color: "bg-green-500" },
    { title: "Total Revenue", value: "₹12.4L", icon: IndianRupee, color: "bg-purple-500" },
    { title: "Total Credits", value: "₹85K", icon: CreditCard, color: "bg-orange-500" },
  ];

  const franchises = [
    {
      id: "FRN001",
      name: "MediLab Diagnostics",
      owner: "Dr. Rakesh Singh",
      location: "Mumbai, Maharashtra",
      phone: "+91 9876543210",
      email: "rakesh@medilab.com",
      status: "Active",
      joinDate: "2022-03-15",
      monthlyRevenue: "₹85,000",
      credits: "₹12,500",
      testsCompleted: 1250
    },
    {
      id: "FRN002",
      name: "HealthCare Labs",
      owner: "Ms. Neha Patel",
      location: "Delhi, NCR",
      phone: "+91 9876543211",
      email: "neha@healthcare.com",
      status: "Active",
      joinDate: "2021-07-20",
      monthlyRevenue: "₹92,000",
      credits: "₹8,750",
      testsCompleted: 1450
    },
    {
      id: "FRN003",
      name: "City Diagnostic Center",
      owner: "Dr. Amit Kumar",
      location: "Bangalore, Karnataka",
      phone: "+91 9876543212",
      email: "amit@citydiag.com",
      status: "Pending",
      joinDate: "2023-11-01",
      monthlyRevenue: "₹45,000",
      credits: "₹15,000",
      testsCompleted: 650
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return <Badge className="bg-green-500 text-white">Active</Badge>;
      case "Pending": return <Badge variant="outline" className="text-orange-600">Pending</Badge>;
      case "Inactive": return <Badge variant="outline" className="text-red-600">Inactive</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Franchise Management</h1>
          <p className="text-muted-foreground">Manage franchise partners and sub-franchisees</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Credits
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Franchise
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {franchiseStats.map((stat, index) => (
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              Add Franchise
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Sub Franchisee
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <CreditCard className="h-6 w-6 mb-2" />
              Manage Credits
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Franchise List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Franchise Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {franchises.map((franchise) => (
              <div key={franchise.id} className="flex items-start justify-between p-6 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-foreground text-lg">{franchise.name}</h3>
                    {getStatusBadge(franchise.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Owner Details</p>
                      <p className="text-sm text-foreground">{franchise.owner}</p>
                      <p className="text-sm text-muted-foreground">{franchise.email}</p>
                      <p className="text-sm text-muted-foreground">{franchise.phone}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Location & Performance</p>
                      <p className="text-sm text-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {franchise.location}
                      </p>
                      <p className="text-sm text-muted-foreground">Tests: {franchise.testsCompleted}</p>
                      <p className="text-sm text-muted-foreground">Joined: {franchise.joinDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Revenue: {franchise.monthlyRevenue}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Credits: {franchise.credits}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Manage Credits
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit Pricing
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