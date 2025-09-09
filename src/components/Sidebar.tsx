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
  IndianRupee
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

type ActiveModule = "dashboard" | "patients" | "tests" | "billing" | "reports" | "settings";

interface SidebarProps {
  activeModule: ActiveModule;
  onModuleChange: (module: ActiveModule) => void;
  userRole: "admin" | "franchise";
}

export function Sidebar({ activeModule, onModuleChange, userRole }: SidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    booking: false,
    manageReports: false,
    oldReports: false,
    cancellations: false,
    generateBill: false,
    paymentHistory: false,
    trackLedger: false,
    manageDoctors: false,
    manageLab: false,
    testPortfolio: false,
    myStaff: false,
    subFranchisee: false
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
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-primary">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-base font-semibold text-foreground">PATHO LAB</h2>
            <p className="text-xs text-warning uppercase font-medium">
              FAMILY DIAGNOSTIC CENTRE ({userRole.toUpperCase()})
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
            <SidebarMenuButton className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <TrendingUp className="mr-3 h-4 w-4" />
              <span>Analytics</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* BOOKING Section */}
          <div className="mt-4">
            <div className="px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wide">
              BOOKING
            </div>
            
            {/* Manage Booking */}
            <Collapsible open={openSections.booking} onOpenChange={() => toggleSection('booking')}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm bg-medical-blue text-white hover:bg-medical-blue/90">
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-4 w-4" />
                    <span>Manage Booking</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.booking ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Plus className="mr-3 h-3 w-3" />
                  <span>New Booking</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <List className="mr-3 h-3 w-3" />
                  <span>List Booking</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <List className="mr-3 h-3 w-3" />
                  <span>List Booking Old</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Clock className="mr-3 h-3 w-3" />
                  <span>Pending Booking</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Activity className="mr-3 h-3 w-3" />
                  <span>Test in Progress</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <CheckCircle className="mr-3 h-3 w-3" />
                  <span>Report Complete</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Plus className="mr-3 h-3 w-3" />
                  <span>Test Addition</span>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>

            {/* Manage Reports */}
            <Collapsible open={openSections.manageReports} onOpenChange={() => toggleSection('manageReports')}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  <div className="flex items-center">
                    <FileText className="mr-3 h-4 w-4" />
                    <span>Manage Reports</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.manageReports ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Download className="mr-3 h-3 w-3" />
                  <span>Download Reports</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <FileText className="mr-3 h-3 w-3" />
                  <span>All Reports</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Search className="mr-3 h-3 w-3" />
                  <span>Search booking</span>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>

            {/* Old Reports */}
            <Collapsible open={openSections.oldReports} onOpenChange={() => toggleSection('oldReports')}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  <div className="flex items-center">
                    <FileText className="mr-3 h-4 w-4" />
                    <span>Old Reports</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.oldReports ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </Collapsible>
          </div>

          {/* NOTIFICATIONS Section */}
          <div className="mt-4">
            <div className="px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wide">
              NOTIFICATIONS
            </div>
            
            <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <div className="flex items-center">
                <Scan className="mr-3 h-4 w-4" />
                <span>Barcode Mismatch</span>
              </div>
              <Badge variant="destructive" className="text-xs">
                {notifications.barcodeMismatch}
              </Badge>
            </SidebarMenuButton>

            <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <div className="flex items-center">
                <Pause className="mr-3 h-4 w-4" />
                <span>Hold</span>
              </div>
              <Badge className="bg-success text-success-foreground text-xs">
                {notifications.hold}
              </Badge>
            </SidebarMenuButton>

            <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <div className="flex items-center">
                <Stethoscope className="mr-3 h-4 w-4" />
                <span>Clinical</span>
              </div>
              <Badge variant="destructive" className="text-xs">
                {notifications.clinical}
              </Badge>
            </SidebarMenuButton>

            {/* Cancellations */}
            <Collapsible open={openSections.cancellations} onOpenChange={() => toggleSection('cancellations')}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  <div className="flex items-center">
                    <X className="mr-3 h-4 w-4" />
                    <span>Cancellations</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.cancellations ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <X className="mr-3 h-3 w-3" />
                  <span>Test Cancelled</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <X className="mr-3 h-3 w-3" />
                  <span>Test Cancelled Old</span>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* BILLING Section */}
          <div className="mt-4">
            <div className="px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wide">
              BILLING
            </div>

            {/* Generate Bill */}
            <Collapsible open={openSections.generateBill} onOpenChange={() => toggleSection('generateBill')}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  <div className="flex items-center">
                    <Receipt className="mr-3 h-4 w-4" />
                    <span>Generate Bill</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.generateBill ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Plus className="mr-3 h-3 w-3" />
                  <span>New Bill</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Receipt className="mr-3 h-3 w-3" />
                  <span>MRP Bill</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <List className="mr-3 h-3 w-3" />
                  <span>Billing List</span>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>

            <SidebarMenuButton className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <Receipt className="mr-3 h-4 w-4" />
              <span>Generate Bill Old</span>
            </SidebarMenuButton>

            <SidebarMenuButton className="w-full justify-start px-3 py-2 text-sm text-warning hover:text-warning">
              <IndianRupee className="mr-3 h-4 w-4" />
              <span>Online Payment</span>
            </SidebarMenuButton>

            {/* Payment History */}
            <Collapsible open={openSections.paymentHistory} onOpenChange={() => toggleSection('paymentHistory')}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  <div className="flex items-center">
                    <History className="mr-3 h-4 w-4" />
                    <span>Payment History</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.paymentHistory ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <CreditCard className="mr-3 h-3 w-3" />
                  <span>Razor Pay</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <CreditCard className="mr-3 h-3 w-3" />
                  <span>Razor Pay Old</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <CreditCard className="mr-3 h-3 w-3" />
                  <span>Paytm Payments</span>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>

            {/* Track Ledger */}
            <Collapsible open={openSections.trackLedger} onOpenChange={() => toggleSection('trackLedger')}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  <div className="flex items-center">
                    <Calculator className="mr-3 h-4 w-4" />
                    <span>Track Ledger</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.trackLedger ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <FileText className="mr-3 h-3 w-3" />
                  <span>Account Summary</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <FileText className="mr-3 h-3 w-3" />
                  <span>Account Summary Old</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <List className="mr-3 h-3 w-3" />
                  <span>Ledger List</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <List className="mr-3 h-3 w-3" />
                  <span>Ledger List Old</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Receipt className="mr-3 h-3 w-3" />
                  <span>Billing List</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <TrendingUp className="mr-3 h-3 w-3" />
                  <span>Report Usage</span>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>

            {/* Manage Doctors */}
            <Collapsible open={openSections.manageDoctors} onOpenChange={() => toggleSection('manageDoctors')}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  <div className="flex items-center">
                    <UserCheck className="mr-3 h-4 w-4" />
                    <span>Manage Doctors</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.manageDoctors ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <UserPlus className="mr-3 h-3 w-3" />
                  <span>Add Doctor</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Users className="mr-3 h-3 w-3" />
                  <span>List Doctor</span>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>

            {/* Manage Lab */}
            <Collapsible open={openSections.manageLab} onOpenChange={() => toggleSection('manageLab')}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  <div className="flex items-center">
                    <Building className="mr-3 h-4 w-4" />
                    <span>Manage Lab</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.manageLab ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Plus className="mr-3 h-3 w-3" />
                  <span>Add Lab</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Building className="mr-3 h-3 w-3" />
                  <span>List Lab</span>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>

            {/* Test Portfolio */}
            <Collapsible open={openSections.testPortfolio} onOpenChange={() => toggleSection('testPortfolio')}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  <div className="flex items-center">
                    <Briefcase className="mr-3 h-4 w-4" />
                    <span>Test Portfolio</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.testPortfolio ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <List className="mr-3 h-3 w-3" />
                  <span>Test List</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Users className="mr-3 h-3 w-3" />
                  <span>Test Profile</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <FileText className="mr-3 h-3 w-3" />
                  <span>Sample Report</span>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>

            <SidebarMenuButton className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <Award className="mr-3 h-4 w-4" />
              <span>Commission</span>
            </SidebarMenuButton>
          </div>

          {/* INVENTORY Section */}
          <div className="mt-4">
            <div className="px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wide">
              INVENTORY
            </div>
            
            <SidebarMenuButton className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <Package className="mr-3 h-4 w-4" />
              <span>Inventory</span>
            </SidebarMenuButton>

            <SidebarMenuButton className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <Clipboard className="mr-3 h-4 w-4" />
              <span>Slide/Request</span>
            </SidebarMenuButton>
          </div>

          {/* STAFF Section */}
          <div className="mt-4">
            <div className="px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wide">
              STAFF
            </div>
            
            {/* My Staff */}
            <Collapsible open={openSections.myStaff} onOpenChange={() => toggleSection('myStaff')}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  <div className="flex items-center">
                    <Users className="mr-3 h-4 w-4" />
                    <span>My Staff</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.myStaff ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <UserPlus className="mr-3 h-3 w-3" />
                  <span>Add Staff</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="w-full justify-start px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                  <Users className="mr-3 h-3 w-3" />
                  <span>List Staff</span>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* SUB FRANCHISEE Section */}
          <div className="mt-4">
            <div className="px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wide">
              SUB FRANCHISEE
            </div>
            
            <SidebarMenuButton className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <Building className="mr-3 h-4 w-4" />
              <span>Sub Franchisee</span>
            </SidebarMenuButton>

            <SidebarMenuButton className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <IndianRupee className="mr-3 h-4 w-4" />
              <span>SubFranchisee Pricing</span>
            </SidebarMenuButton>

            <SidebarMenuButton className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <CreditCard className="mr-3 h-4 w-4" />
              <span>SubFranchisee Credits</span>
            </SidebarMenuButton>
          </div>

          {/* SETTINGS Section */}
          <div className="mt-4">
            <div className="px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wide">
              SETTINGS
            </div>
            
            <SidebarMenuButton className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <Award className="mr-3 h-4 w-4" />
              <span>Generate Certificate</span>
            </SidebarMenuButton>
          </div>
        </SidebarMenu>
      </SidebarContent>
    </SidebarUI>
  );
}