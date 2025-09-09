import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TestTube, 
  Calendar, 
  TrendingUp,
  Activity,
  AlertCircle,
  Clock,
  CheckCircle
} from "lucide-react";

interface DashboardProps {
  userRole: "admin" | "franchise";
}

export function Dashboard({ userRole }: DashboardProps) {
  const stats = [
    {
      title: "Total Patients",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "bg-medical-blue",
      trend: "up"
    },
    {
      title: "Tests Completed",
      value: "1,234",
      change: "+8.2%",
      icon: TestTube,
      color: "bg-medical-green",
      trend: "up"
    },
    {
      title: "Appointments Today",
      value: "45",
      change: "+3.1%",
      icon: Calendar,
      color: "bg-medical-orange",
      trend: "up"
    },
    {
      title: "Revenue (Month)",
      value: "₹5,67,890",
      change: "+15.3%",
      icon: TrendingUp,
      color: "bg-primary",
      trend: "up"
    }
  ];

  const recentTests = [
    {
      patient: "Ramesh Kumar",
      test: "Blood Sugar Test",
      status: "completed",
      time: "2 hours ago"
    },
    {
      patient: "Priya Sharma",
      test: "Lipid Profile",
      status: "pending",
      time: "3 hours ago"
    },
    {
      patient: "Amit Patel",
      test: "Complete Blood Count",
      status: "completed",
      time: "5 hours ago"
    },
    {
      patient: "Sunita Devi",
      test: "Thyroid Function",
      status: "in-progress",
      time: "1 hour ago"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "in-progress":
        return <Activity className="h-4 w-4 text-primary" />;
      default:
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "in-progress":
        return <Badge className="bg-primary text-primary-foreground">In Progress</Badge>;
      default:
        return <Badge variant="destructive">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to your {userRole} panel
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-primary text-white">Live</Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card border-0 bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-success/10 text-success border-success/20"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Tests */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-primary" />
              Recent Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTests.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <p className="font-medium text-foreground">{test.patient}</p>
                      <p className="text-sm text-muted-foreground">{test.test}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(test.status)}
                    <p className="text-xs text-muted-foreground mt-1">{test.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Daily Tests</span>
                <span className="text-sm text-muted-foreground">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Patient Satisfaction</span>
                <span className="text-sm text-muted-foreground">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Report Turnaround</span>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Revenue Target</span>
                <span className="text-sm text-muted-foreground">67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}