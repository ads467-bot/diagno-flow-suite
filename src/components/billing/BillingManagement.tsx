import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, Plus, CreditCard, Calculator, History, IndianRupee, Clock, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BillingManagementProps {
  userRole: "admin" | "franchise";
  view?: "new" | "history" | "online" | "ledger";
}

export function BillingManagement({ userRole, view = "history" }: BillingManagementProps) {
  const billingStats = [
    { title: "Today's Revenue", value: "₹45,230", icon: IndianRupee, color: "bg-green-500" },
    { title: "Pending Bills", value: "23", icon: Clock, color: "bg-orange-500" },
    { title: "Paid Bills", value: "156", icon: CheckCircle, color: "bg-blue-500" },
    { title: "Online Payments", value: "₹32,150", icon: CreditCard, color: "bg-purple-500" },
  ];

  const recentBills = [
    { id: "INV001", patient: "John Doe", amount: "₹2,450", status: "Paid", method: "Online", date: "2024-01-15" },
    { id: "INV002", patient: "Jane Smith", amount: "₹1,850", status: "Pending", method: "Cash", date: "2024-01-15" },
    { id: "INV003", patient: "Mike Johnson", amount: "₹3,200", status: "Paid", method: "Card", date: "2024-01-14" },
    { id: "INV004", patient: "Sarah Wilson", amount: "₹1,650", status: "Overdue", method: "Cash", date: "2024-01-13" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid": return <Badge className="bg-green-500 text-white">Paid</Badge>;
      case "Pending": return <Badge variant="outline" className="text-orange-600">Pending</Badge>;
      case "Overdue": return <Badge variant="destructive">Overdue</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMethodBadge = (method: string) => {
    switch (method) {
      case "Online": return <Badge variant="outline" className="text-purple-600">Online</Badge>;
      case "Card": return <Badge variant="outline" className="text-blue-600">Card</Badge>;
      case "Cash": return <Badge variant="outline" className="text-green-600">Cash</Badge>;
      default: return <Badge variant="outline">{method}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing Management</h1>
          <p className="text-muted-foreground">Manage invoices, payments and financial records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Ledger
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Bill
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {billingStats.map((stat, index) => (
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
            <Receipt className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              Generate Bill
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <CreditCard className="h-6 w-6 mb-2" />
              Online Payment
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <History className="h-6 w-6 mb-2" />
              Payment History
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calculator className="h-6 w-6 mb-2" />
              Track Ledger
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Recent Bills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBills.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-foreground">{bill.patient}</div>
                  <div className="text-sm text-muted-foreground">Invoice: {bill.id} • {bill.date}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-foreground">{bill.amount}</span>
                  {getMethodBadge(bill.method)}
                  {getStatusBadge(bill.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}