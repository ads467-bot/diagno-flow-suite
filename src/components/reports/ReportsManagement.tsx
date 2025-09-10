import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search, Filter, Calendar, Eye, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ReportsManagementProps {
  userRole: "admin" | "franchise";
  view?: "download" | "search" | "all" | "old";
}

export function ReportsManagement({ userRole, view = "all" }: ReportsManagementProps) {
  const reportStats = [
    { title: "Total Reports", value: "8,547", icon: FileText, color: "bg-blue-500" },
    { title: "Pending Reports", value: "23", icon: Calendar, color: "bg-orange-500" },
    { title: "Downloaded Today", value: "156", icon: Download, color: "bg-green-500" },
    { title: "Sent via Email", value: "89", icon: Send, color: "bg-purple-500" },
  ];

  const recentReports = [
    { id: "RPT001", patient: "John Doe", test: "Complete Blood Count", status: "Ready", date: "2024-01-15", downloadable: true },
    { id: "RPT002", patient: "Jane Smith", test: "Lipid Profile", status: "Pending", date: "2024-01-15", downloadable: false },
    { id: "RPT003", patient: "Mike Johnson", test: "Thyroid Function", status: "Ready", date: "2024-01-14", downloadable: true },
    { id: "RPT004", patient: "Sarah Wilson", test: "Diabetes Panel", status: "In Review", date: "2024-01-14", downloadable: false },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ready": return <Badge className="bg-green-500 text-white">Ready</Badge>;
      case "Pending": return <Badge variant="outline" className="text-orange-600">Pending</Badge>;
      case "In Review": return <Badge variant="outline" className="text-blue-600">In Review</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports Management</h1>
          <p className="text-muted-foreground">View, download and manage patient test reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Reports
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Bulk Download
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportStats.map((stat, index) => (
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

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input placeholder="Search by patient name, report ID, test type..." className="flex-1" />
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Status Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-foreground">{report.patient}</div>
                  <div className="text-sm text-muted-foreground">ID: {report.id} • {report.test}</div>
                  <div className="text-xs text-muted-foreground">Date: {report.date}</div>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(report.status)}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    {report.downloadable && (
                      <Button size="sm" className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}