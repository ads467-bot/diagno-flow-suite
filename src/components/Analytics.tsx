import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  TestTube, 
  DollarSign, 
  Calendar,
  BarChart3,
  PieChart,
  Download
} from "lucide-react";

interface AnalyticsProps {
  userRole: "admin" | "franchise";
}

export function Analytics({ userRole }: AnalyticsProps) {
  const monthlyStats = [
    { month: "Jan", tests: 450, revenue: 125000 },
    { month: "Feb", tests: 520, revenue: 145000 },
    { month: "Mar", tests: 680, revenue: 189000 },
    { month: "Apr", tests: 720, revenue: 205000 },
    { month: "May", tests: 850, revenue: 235000 },
    { month: "Jun", tests: 920, revenue: 268000 },
  ];

  const topTests = [
    { name: "Complete Blood Count", count: 1250, percentage: 85 },
    { name: "Lipid Profile", count: 980, percentage: 70 },
    { name: "Thyroid Function", count: 750, percentage: 55 },
    { name: "Blood Sugar", count: 650, percentage: 45 },
    { name: "Liver Function", count: 520, percentage: 35 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            {userRole === "admin" 
              ? "Comprehensive analytics across all franchise locations" 
              : "Analytics for your diagnostic centre"}
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tests</p>
                <p className="text-2xl font-bold text-primary">5,890</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% from last month
                </p>
              </div>
              <TestTube className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-primary">₹2,68,000</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8.5% from last month
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Patients</p>
                <p className="text-2xl font-bold text-primary">3,420</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% from last month
                </p>
              </div>
              <Users className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Processing Time</p>
                <p className="text-2xl font-bold text-primary">2.4hrs</p>
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 rotate-180" />
                  -5min from last month
                </p>
              </div>
              <Calendar className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Performance
            </CardTitle>
            <CardDescription>Test volume and revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.map((stat) => (
                <div key={stat.month} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-sm font-medium">{stat.month}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span>{stat.tests} tests</span>
                        <span className="font-medium">₹{(stat.revenue / 1000).toFixed(0)}k</span>
                      </div>
                      <Progress value={(stat.tests / 1000) * 100} className="h-2 mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Tests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Most Requested Tests
            </CardTitle>
            <CardDescription>Popular diagnostic tests this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTests.map((test, index) => (
                <div key={test.name} className="flex items-center gap-4">
                  <Badge variant="outline" className="w-8 h-8 p-0 flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{test.name}</span>
                      <span className="text-muted-foreground">{test.count}</span>
                    </div>
                    <Progress value={test.percentage} className="h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Franchise Performance (Admin Only) */}
      {userRole === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle>Franchise Performance</CardTitle>
            <CardDescription>Performance metrics across all franchise locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Downtown Centre", tests: 1250, revenue: 89000, growth: "+12%" },
                { name: "Uptown Branch", tests: 980, revenue: 67000, growth: "+8%" },
                { name: "City Mall Lab", tests: 750, revenue: 52000, growth: "+15%" },
              ].map((franchise) => (
                <div key={franchise.name} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{franchise.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Tests:</span>
                      <span className="font-medium">{franchise.tests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue:</span>
                      <span className="font-medium">₹{(franchise.revenue / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth:</span>
                      <span className="text-green-600 font-medium">{franchise.growth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}