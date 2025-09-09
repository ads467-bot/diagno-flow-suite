import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  Eye, 
  Download,
  Receipt,
  IndianRupee,
  Calendar,
  User,
  CreditCard
} from "lucide-react";

interface BillingProps {
  userRole: "admin" | "franchise";
}

export function Billing({ userRole }: BillingProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const invoices = [
    {
      id: "INV-001",
      patientName: "Ramesh Kumar",
      patientId: "P001",
      tests: ["CBC", "Lipid Profile"],
      amount: 900,
      discount: 50,
      finalAmount: 850,
      status: "paid",
      paymentMethod: "UPI",
      date: "2024-01-15",
      dueDate: "2024-01-15"
    },
    {
      id: "INV-002",
      patientName: "Priya Sharma",
      patientId: "P002",
      tests: ["Thyroid Function"],
      amount: 700,
      discount: 0,
      finalAmount: 700,
      status: "pending",
      paymentMethod: "Cash",
      date: "2024-01-14",
      dueDate: "2024-01-21"
    },
    {
      id: "INV-003",
      patientName: "Amit Patel",
      patientId: "P003",
      tests: ["Blood Sugar", "CBC"],
      amount: 500,
      discount: 25,
      finalAmount: 475,
      status: "overdue",
      paymentMethod: "Card",
      date: "2024-01-10",
      dueDate: "2024-01-17"
    }
  ];

  const filteredInvoices = invoices.filter(invoice =>
    invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-success text-success-foreground">Paid</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "upi":
        return <CreditCard className="h-3 w-3 text-primary" />;
      case "card":
        return <CreditCard className="h-3 w-3 text-primary" />;
      case "cash":
        return <IndianRupee className="h-3 w-3 text-success" />;
      default:
        return <CreditCard className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.finalAmount, 0);
  const paidAmount = invoices.filter(inv => inv.status === "paid").reduce((sum, invoice) => sum + invoice.finalAmount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === "pending").reduce((sum, invoice) => sum + invoice.finalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing & Payments</h1>
          <p className="text-muted-foreground">
            Manage invoices and payment tracking
          </p>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-card border-0 bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Collected</p>
                <p className="text-2xl font-bold text-success">₹{paidAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-success">
                <Receipt className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">₹{pendingAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-warning">
                <Calendar className="h-6 w-6 text-white" />
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
                placeholder="Search invoices by patient name, ID, or invoice number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary text-white shadow-soft">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientSelect">Patient</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="P001">Ramesh Kumar (P001)</SelectItem>
                          <SelectItem value="P002">Priya Sharma (P002)</SelectItem>
                          <SelectItem value="P003">Amit Patel (P003)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="paymentMethod">Payment Method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="upi">UPI</SelectItem>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input id="amount" type="number" placeholder="0" />
                    </div>
                    <div>
                      <Label htmlFor="discount">Discount (₹)</Label>
                      <Input id="discount" type="number" placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="tests">Selected Tests</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cbc">Complete Blood Count</SelectItem>
                        <SelectItem value="lipid">Lipid Profile</SelectItem>
                        <SelectItem value="thyroid">Thyroid Function</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-gradient-primary text-white">
                    Create Invoice
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Table */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Recent Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Patient Details</TableHead>
                <TableHead>Tests</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium text-foreground">{invoice.patientName}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{invoice.patientId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {invoice.tests.map((test, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {test}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">₹{invoice.finalAmount}</span>
                      </div>
                      {invoice.discount > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Original: ₹{invoice.amount} (-₹{invoice.discount})
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPaymentMethodIcon(invoice.paymentMethod)}
                      <span className="text-sm">{invoice.paymentMethod}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Due: {invoice.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
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