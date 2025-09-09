import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  TestTube,
  IndianRupee,
  Clock
} from "lucide-react";

interface TestCatalogueProps {
  userRole: "admin" | "franchise";
}

export function TestCatalogue({ userRole }: TestCatalogueProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const tests = [
    {
      id: "T001",
      name: "Complete Blood Count (CBC)",
      category: "Hematology",
      b2bPrice: 250,
      mrp: 350,
      duration: "4-6 hours",
      description: "Complete blood count with differential",
      status: "active"
    },
    {
      id: "T002",
      name: "Lipid Profile",
      category: "Biochemistry",
      b2bPrice: 400,
      mrp: 550,
      duration: "8-12 hours",
      description: "Cholesterol, triglycerides, HDL, LDL analysis",
      status: "active"
    },
    {
      id: "T003",
      name: "Thyroid Function Test",
      category: "Endocrinology",
      b2bPrice: 500,
      mrp: 700,
      duration: "12-24 hours",
      description: "TSH, T3, T4 hormone levels",
      status: "active"
    },
    {
      id: "T004",
      name: "Blood Sugar (Fasting)",
      category: "Biochemistry",
      b2bPrice: 100,
      mrp: 150,
      duration: "2-4 hours",
      description: "Fasting glucose level measurement",
      status: "active"
    },
    {
      id: "T005",
      name: "Liver Function Test",
      category: "Biochemistry",
      b2bPrice: 350,
      mrp: 500,
      duration: "6-8 hours",
      description: "SGPT, SGOT, Bilirubin, Protein levels",
      status: "inactive"
    }
  ];

  const filteredTests = tests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-success text-success-foreground">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  const getCategoryBadge = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      "Hematology": "bg-medical-blue text-white",
      "Biochemistry": "bg-medical-green text-white",
      "Endocrinology": "bg-medical-orange text-white",
      "Microbiology": "bg-primary text-white"
    };
    
    return (
      <Badge className={categoryColors[category] || "bg-muted text-muted-foreground"}>
        {category}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Test Catalogue</h1>
          <p className="text-muted-foreground">
            Manage diagnostic tests and pricing
          </p>
        </div>
      </div>

      {/* Search and Actions */}
      <Card className="shadow-card border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tests by name, category, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {userRole === "admin" && (
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary text-white shadow-soft">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Test
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Test</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="testName">Test Name</Label>
                        <Input id="testName" placeholder="Enter test name" />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" placeholder="e.g., Biochemistry" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="b2bPrice">B2B Price (₹)</Label>
                        <Input id="b2bPrice" type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label htmlFor="mrp">MRP (₹)</Label>
                        <Input id="mrp" type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input id="duration" placeholder="e.g., 4-6 hours" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Test description and methodology" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-gradient-primary text-white">
                      Add Test
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Test Table */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-primary" />
            Available Tests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test ID</TableHead>
                <TableHead>Test Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                {userRole === "admin" && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{test.name}</p>
                      <p className="text-sm text-muted-foreground">{test.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getCategoryBadge(test.category)}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <IndianRupee className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">B2B: ₹{test.b2bPrice}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <IndianRupee className="h-3 w-3 text-muted-foreground" />
                        <span>MRP: ₹{test.mrp}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {test.duration}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(test.status)}</TableCell>
                  {userRole === "admin" && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive">
                          <Trash2 className="h-3 w-3" />
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