import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Package, 
  AlertTriangle, 
  Search, 
  Plus, 
  Minus, 
  Edit,
  TrendingDown,
  TrendingUp,
  Box
} from "lucide-react";

interface InventoryProps {
  userRole: "admin" | "franchise";
}

export function Inventory({ userRole }: InventoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const inventoryItems = [
    { 
      id: "INV001", 
      name: "Blood Collection Tubes", 
      category: "Consumables", 
      currentStock: 150, 
      minStock: 50, 
      maxStock: 500, 
      unitPrice: 25,
      supplier: "MedSupply Co.",
      lastUpdated: "2024-01-08"
    },
    { 
      id: "INV002", 
      name: "Reagent Kit - CBC", 
      category: "Reagents", 
      currentStock: 25, 
      minStock: 30, 
      maxStock: 100, 
      unitPrice: 1250,
      supplier: "LabChem Ltd.",
      lastUpdated: "2024-01-07"
    },
    { 
      id: "INV003", 
      name: "Microscope Slides", 
      category: "Consumables", 
      currentStock: 80, 
      minStock: 40, 
      maxStock: 200, 
      unitPrice: 15,
      supplier: "GlassTech Inc.",
      lastUpdated: "2024-01-06"
    },
    { 
      id: "INV004", 
      name: "Centrifuge Machine", 
      category: "Equipment", 
      currentStock: 2, 
      minStock: 1, 
      maxStock: 5, 
      unitPrice: 85000,
      supplier: "MedEquip Solutions",
      lastUpdated: "2024-01-05"
    },
    { 
      id: "INV005", 
      name: "Disposable Syringes", 
      category: "Consumables", 
      currentStock: 10, 
      minStock: 50, 
      maxStock: 300, 
      unitPrice: 8,
      supplier: "SafeMed Supplies",
      lastUpdated: "2024-01-04"
    },
  ];

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (current: number, min: number) => {
    if (current <= min) return { status: "Low", variant: "destructive" as const };
    if (current <= min * 1.5) return { status: "Medium", variant: "secondary" as const };
    return { status: "Good", variant: "default" as const };
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      "Consumables": "bg-blue-100 text-blue-800",
      "Reagents": "bg-green-100 text-green-800", 
      "Equipment": "bg-purple-100 text-purple-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const lowStockItems = filteredItems.filter(item => item.currentStock <= item.minStock);
  const totalValue = filteredItems.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track and manage medical supplies, reagents, and equipment
          </p>
        </div>
        {userRole === "admin" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Inventory Item</DialogTitle>
                <DialogDescription>
                  Add new item to inventory system
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input id="item-name" placeholder="Enter item name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="e.g., Consumables, Reagents" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Current Stock</Label>
                  <Input id="stock" type="number" placeholder="Enter quantity" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="min-stock">Minimum Stock Level</Label>
                  <Input id="min-stock" type="number" placeholder="Enter minimum quantity" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Unit Price (₹)</Label>
                  <Input id="price" type="number" placeholder="Enter price per unit" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input id="supplier" placeholder="Enter supplier name" />
                </div>
              </div>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Item
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold text-primary">{filteredItems.length}</p>
              </div>
              <Package className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-destructive">{lowStockItems.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-primary">₹{(totalValue / 1000).toFixed(0)}k</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-primary">3</p>
              </div>
              <Box className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>Items requiring immediate restocking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-destructive/5">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Current: {item.currentStock} | Minimum: {item.minStock}
                    </p>
                  </div>
                  <Badge variant="destructive">Low Stock</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Inventory Items</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Last Updated</TableHead>
                {userRole === "admin" && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => {
                const stockStatus = getStockStatus(item.currentStock, item.minStock);
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Badge className={getCategoryBadge(item.category)}>
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{item.currentStock} units</div>
                        <div className="text-muted-foreground">Min: {item.minStock}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={stockStatus.variant}>
                        {stockStatus.status}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{item.unitPrice}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    {userRole === "admin" && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}