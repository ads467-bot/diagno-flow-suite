import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  TestTube, 
  FileText, 
  Receipt, 
  Settings as SettingsIcon,
  ChevronDown,
  Activity,
  Menu,
  TrendingUp,
  Calendar,
  List,
  Clock,
  CheckCircle,
  Plus,
  Download,
  Search,
  Scan,
  Pause,
  Stethoscope,
  X,
  CreditCard,
  History,
  Calculator,
  UserCheck,
  Building,
  Briefcase,
  Package,
  Clipboard,
  UserPlus,
  Award,
  IndianRupee,
  LogOut,
  UserCog,
  KeyRound,
  Bell,
  ShieldCheck,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type ActiveModule = 
  | "dashboard" 
  | "patients" 
  | "tests" 
  | "billing" 
  | "reports" 
  | "settings"
  | "analytics"
  | "inventory"
  | "staff"
  | "franchise";

interface SidebarProps {
  activeModule: ActiveModule;
  onModuleChange: (module: ActiveModule) => void;
  userRole: "admin" | "franchise";
}

export function Sidebar({ activeModule, onModuleChange, userRole }: SidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    booking: false,
    reports: false,
    billing: false,
    inventory: false,
    staff: false,
    franchise: false,
    settings: false
  });
  
  const { toggleSidebar } = useSidebar();

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const notifications = {
    barcodeMismatch: 2071,
    hold: 0,
    clinical: 8
  };

  return (
    <SidebarUI className="border-r border-border bg-card w-80">
      {/* Header */}
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-primary">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-base font-semibold text-foreground">PATHO LAB</h2>
            <p className="text-xs text-warning uppercase font-medium">
              FAMILY DIAGNOSTIC ({userRole.toUpperCase()})
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="p-2">
        <SidebarMenu className="space-y-1">

          {/* Dashboard */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => onModuleChange("dashboard")}
              className={`w-full justify-start px-3 py-2 text-sm ${
                activeModule === "dashboard" 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <LayoutDashboard className="mr-3 h-4 w-4" />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Analytics */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => onModuleChange("analytics")}
              className={`w-full justify-start px-3 py-2 text-sm ${
                activeModule === "analytics" 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <TrendingUp className="mr-3 h-4 w-4" />
              <span>Analytics</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Booking Section */}
          <Collapsible open={openSections.booking} onOpenChange={() => toggleSection("booking")}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="mr-3 h-4 w-4" />
                  <span>Booking</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSections.booking ? "rotate-180" : ""}`} />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1">
              <SidebarMenuButton><Plus className="mr-3 h-3 w-3" /> New Booking</SidebarMenuButton>
              <SidebarMenuButton><List className="mr-3 h-3 w-3" /> All Bookings</SidebarMenuButton>
              <SidebarMenuButton><Clock className="mr-3 h-3 w-3" /> Pending Bookings</SidebarMenuButton>
              <SidebarMenuButton><Activity className="mr-3 h-3 w-3" /> In Progress</SidebarMenuButton>
              <SidebarMenuButton><CheckCircle className="mr-3 h-3 w-3" /> Completed</SidebarMenuButton>
            </CollapsibleContent>
          </Collapsible>

          {/* Reports Section */}
          <Collapsible open={openSections.reports} onOpenChange={() => toggleSection("reports")}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm">
                <div className="flex items-center">
                  <FileText className="mr-3 h-4 w-4" />
                  <span>Reports</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSections.reports ? "rotate-180" : ""}`} />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1">
              <SidebarMenuButton><Download className="mr-3 h-3 w-3" /> Download Reports</SidebarMenuButton>
              <SidebarMenuButton><Search className="mr-3 h-3 w-3" /> Search Reports</SidebarMenuButton>
              <SidebarMenuButton><List className="mr-3 h-3 w-3" /> All Reports</SidebarMenuButton>
            </CollapsibleContent>
          </Collapsible>

          {/* Notifications */}
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Bell className="mr-3 h-4 w-4" />
              Notifications
              <Badge variant="destructive" className="ml-auto">{notifications.barcodeMismatch + notifications.clinical}</Badge>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Billing Section */}
          <Collapsible open={openSections.billing} onOpenChange={() => toggleSection("billing")}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm">
                <div className="flex items-center">
                  <Receipt className="mr-3 h-4 w-4" />
                  <span>Billing</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSections.billing ? "rotate-180" : ""}`} />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1">
              <SidebarMenuButton><Plus className="mr-3 h-3 w-3" /> New Bill</SidebarMenuButton>
              <SidebarMenuButton><List className="mr-3 h-3 w-3" /> Billing History</SidebarMenuButton>
              <SidebarMenuButton><CreditCard className="mr-3 h-3 w-3" /> Online Payments</SidebarMenuButton>
              <SidebarMenuButton><Calculator className="mr-3 h-3 w-3" /> Ledger</SidebarMenuButton>
            </CollapsibleContent>
          </Collapsible>

          {/* Inventory */}
          <Collapsible open={openSections.inventory} onOpenChange={() => toggleSection("inventory")}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm">
                <div className="flex items-center">
                  <Package className="mr-3 h-4 w-4" />
                  <span>Inventory</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSections.inventory ? "rotate-180" : ""}`} />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1">
              <SidebarMenuButton><Clipboard className="mr-3 h-3 w-3" /> Stock</SidebarMenuButton>
              <SidebarMenuButton><Clipboard className="mr-3 h-3 w-3" /> Requests</SidebarMenuButton>
            </CollapsibleContent>
          </Collapsible>

          {/* Staff */}
          <Collapsible open={openSections.staff} onOpenChange={() => toggleSection("staff")}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm">
                <div className="flex items-center">
                  <Users className="mr-3 h-4 w-4" />
                  <span>Staff</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSections.staff ? "rotate-180" : ""}`} />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1">
              <SidebarMenuButton><UserPlus className="mr-3 h-3 w-3" /> Add Staff</SidebarMenuButton>
              <SidebarMenuButton><List className="mr-3 h-3 w-3" /> List Staff</SidebarMenuButton>
            </CollapsibleContent>
          </Collapsible>

          {/* Franchise */}
          {userRole === "admin" && (
            <Collapsible open={openSections.franchise} onOpenChange={() => toggleSection("franchise")}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm">
                  <div className="flex items-center">
                    <Building className="mr-3 h-4 w-4" />
                    <span>Franchise</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.franchise ? "rotate-180" : ""}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuButton><Plus className="mr-3 h-3 w-3" /> Add Franchise</SidebarMenuButton>
                <SidebarMenuButton><List className="mr-3 h-3 w-3" /> List Franchises</SidebarMenuButton>
                <SidebarMenuButton><CreditCard className="mr-3 h-3 w-3" /> Franchise Credits</SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Settings */}
          <Collapsible open={openSections.settings} onOpenChange={() => toggleSection("settings")}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm">
                <div className="flex items-center">
                  <SettingsIcon className="mr-3 h-4 w-4" />
                  <span>Settings</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSections.settings ? "rotate-180" : ""}`} />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1">
              <SidebarMenuButton><UserCog className="mr-3 h-3 w-3" /> Update Profile</SidebarMenuButton>
              <SidebarMenuButton><KeyRound className="mr-3 h-3 w-3" /> Change Password</SidebarMenuButton>
              <SidebarMenuButton><ShieldCheck className="mr-3 h-3 w-3" /> Security Settings</SidebarMenuButton>
              <SidebarMenuButton><Info className="mr-3 h-3 w-3" /> About</SidebarMenuButton>
              <SidebarMenuButton className="text-red-500"><LogOut className="mr-3 h-3 w-3" /> Logout</SidebarMenuButton>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
    </SidebarUI>
  );
}
