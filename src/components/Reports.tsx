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
  Eye, 
  Download,
  Upload,
  FileText,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

interface ReportsProps {
  userRole: "admin" | "franchise";
}

export function Reports({ userRole }: ReportsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const reports = [
    {
      id: "RPT-001",
      patientName: "Ramesh Kumar",
      patientId: "P001",
      testName: "Complete Blood Count",
      requestDate: "2024-01-15",
      completionDate: "2024-01-15",
      status: "completed",
      reportUrl: "#",
      findings: "Normal values within reference range",
      technician: "Dr. Sharma"
    },
    {
      id: "RPT-002",
      patientName: "Priya Sharma",
      patientId: "P002",
      testName: "Lipid Profile",
      requestDate: "2024-01-14",
      completionDate: null,
      status: "processing",
      reportUrl: null,
      findings: "Analysis in progress",
      technician: "Dr. Patel"
    },
    {
      id: "RPT-003",
      patientName: "Amit Patel",
      patientId: "P003",
      testName: "Thyroid Function",
      requestDate: "2024-01-10",
      completionDate: "2024-01-12",
      status: "completed",
      reportUrl: "#",
      findings: "Slightly elevated TSH levels",
      technician: "Dr. Kumar"
    },
    {
      id: "RPT-004",
      patientName: "Sunita Devi",
      patientId: "P004",
      testName: "Blood Sugar Test",
      requestDate: "2024-01-13",
      completionDate: null,
      status: "pending",
      reportUrl: null,
      findings: "Awaiting sample processing",
      technician: "Dr. Singh"
    }
  ];

  const filteredReports = reports.filter(report =>
    report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "processing":
        return <Badge className="bg-primary text-primary-foreground">Processing</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "processing":
        return <Clock className="h-4 w-4 text-primary" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const completedReports = reports.filter(r => r.status === "completed").length;
  const processingReports = reports.filter(r => r.status === "processing").length;
  const pendingReports = reports.filter(r => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lab Reports</h1>
          <p className="text-muted-foreground">
            {userRole === "admin" ? "Upload and manage lab reports" : "View patient reports"}
          </p>
        </div>
      </div>

      {/* Reports Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-card border-0 bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{completedReports}</p>
              </div>
              <div className="p-3 rounded-lg bg-success">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold text-primary">{processingReports}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{pendingReports}</p>
              </div>
              <div className="p-3 rounded-lg bg-warning">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="shadow-card border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports by patient name, test, or report ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {userRole === "admin" && (
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary text-white shadow-soft">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Upload Lab Report</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="reportId">Report ID</Label>
                      <Input id="reportId" placeholder="Enter report ID" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="patientName">Patient Name</Label>
                        <Input id="patientName" placeholder="Enter patient name" />
                      </div>
                      <div>
                        <Label htmlFor="testName">Test Name</Label>
                        <Input id="testName" placeholder="Enter test name" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="findings">Findings & Results</Label>
                      <Textarea 
                        id="findings" 
                        placeholder="Enter test findings and results..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="technician">Reporting Technician</Label>
                      <Input id="technician" placeholder="Enter technician name" />
                    </div>
                    <div>
                      <Label htmlFor="reportFile">Upload Report File</Label>
                      <Input id="reportFile" type="file" accept=".pdf,.jpg,.png" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-gradient-primary text-white">
                      Upload Report
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Lab Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Patient Details</TableHead>
                <TableHead>Test Information</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium text-foreground">{report.patientName}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{report.patientId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{report.testName}</p>
                      <p className="text-sm text-muted-foreground">{report.findings}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>Requested: {report.requestDate}</span>
                      </div>
                      {report.completionDate && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-success" />
                          <span>Completed: {report.completionDate}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(report.status)}
                      {getStatusBadge(report.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium text-foreground">{report.technician}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      {report.reportUrl && (
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}