import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Clipboard, AlertTriangle, TrendingUp, TrendingDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InventoryManagementProps {
  userRole: "admin" | "franchise";
  view?: "stock" | "requests" | "main";
}

export function InventoryManagement({ userRole, view = "stock" }: InventoryManagementProps) {
  const inventoryStats = [
    { title: "Total Items", value: "1,247", icon: Package, color: "bg-blue-500" },
    { title: "Low Stock", value: "23", icon: AlertTriangle, color: "bg-red-500" },
    { title: "Out of Stock", value: "5", icon: TrendingDown, color: "bg-orange-500" },
    { title: "Recent Requests", value: "12", icon: Clipboard, color: "bg-green-500" },
  ];

  const inventoryItems = [
    { 
      id: "ITM001", 
      name: "Blood Collection Tubes", 
      category: "Consumables", 
      stock: 150, 
      minStock: 50, 
      status: "In Stock",
      lastUpdated: "2024-01-15"
    },
    { 
      id: "ITM002", 
      name: "Reagent Kit - CBC", 
      category: "Reagents", 
      stock: 25, 
      minStock: 30, 
      status: "Low Stock",
      lastUpdated: "2024-01-14"
    },
    { 
      id: "ITM003", 
      name: "Microscope Slides", 
      category: "Equipment", 
      stock: 0, 
      minStock: 100, 
      status: "Out of Stock",
      lastUpdated: "2024-01-13"
    },
    { 
      id: "ITM004", 
      name: "Latex Gloves", 
      category: "Safety", 
      stock: 500, 
      minStock: 200, 
      status: "In Stock",
      lastUpdated: "2024-01-15"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock": return <Badge className="bg-green-500 text-white">In Stock</Badge>;
      case "Low Stock": return <Badge variant="destructive">Low Stock</Badge>;
      case "Out of Stock": return <Badge variant="outline" className="text-red-600">Out of Stock</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStockIcon = (status: string) => {
    switch (status) {
      case "In Stock": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "Low Stock": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "Out of Stock": return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Track supplies, reagents and equipment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Clipboard className="h-4 w-4" />
            Slide Request
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventoryStats.map((stat, index) => (
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

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input placeholder="Search by item name, category, ID..." className="flex-1" />
            <Button variant="outline">Filter by Category</Button>
            <Button variant="outline">Filter by Status</Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Current Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStockIcon(item.status)}
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      ID: {item.id} • Category: {item.category}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Stock: {item.stock} | Min: {item.minStock} | Updated: {item.lastUpdated}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(item.status)}
                  <Button size="sm" variant="outline">
                    Update Stock
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