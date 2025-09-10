import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, List, Clock, Activity, CheckCircle, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BookingManagementProps {
  userRole: "admin" | "franchise";
  view?: "new" | "all" | "pending" | "progress" | "completed";
}

export function BookingManagement({ userRole, view = "all" }: BookingManagementProps) {
  const bookingStats = [
    { title: "Total Bookings", value: "2,847", icon: List, color: "bg-blue-500" },
    { title: "Pending", value: "45", icon: Clock, color: "bg-yellow-500" },
    { title: "In Progress", value: "23", icon: Activity, color: "bg-orange-500" },
    { title: "Completed Today", value: "156", icon: CheckCircle, color: "bg-green-500" },
  ];

  const recentBookings = [
    { id: "BK001", patient: "John Doe", test: "Complete Blood Count", status: "Pending", time: "09:30 AM" },
    { id: "BK002", patient: "Jane Smith", test: "Lipid Profile", status: "In Progress", time: "10:15 AM" },
    { id: "BK003", patient: "Mike Johnson", test: "Thyroid Function", status: "Completed", time: "08:45 AM" },
    { id: "BK004", patient: "Sarah Wilson", test: "Diabetes Panel", status: "Pending", time: "11:00 AM" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending": return <Badge variant="outline" className="text-yellow-600">Pending</Badge>;
      case "In Progress": return <Badge variant="outline" className="text-blue-600">In Progress</Badge>;
      case "Completed": return <Badge variant="outline" className="text-green-600">Completed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Booking Management</h1>
          <p className="text-muted-foreground">Manage patient appointments and test bookings</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Booking
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bookingStats.map((stat, index) => (
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
            Search & Filter Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input placeholder="Search by patient name, booking ID..." className="flex-1" />
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-foreground">{booking.patient}</div>
                  <div className="text-sm text-muted-foreground">ID: {booking.id} • {booking.test}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{booking.time}</span>
                  {getStatusBadge(booking.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}