import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { PatientManagement } from "@/components/PatientManagement";
import { TestCatalogue } from "@/components/TestCatalogue";
import { Billing } from "@/components/Billing";
import { Reports } from "@/components/Reports";
import { Settings } from "@/components/Settings";
import { Analytics } from "@/components/Analytics";
import { Inventory } from "@/components/Inventory";
import { Staff } from "@/components/Staff";
import { Franchise } from "@/components/Franchise";
import { BookingManagement } from "@/components/booking/BookingManagement";
import { ReportsManagement } from "@/components/reports/ReportsManagement";
import { BillingManagement } from "@/components/billing/BillingManagement";
import { InventoryManagement } from "@/components/inventory/InventoryManagement";
import { StaffManagement } from "@/components/staff/StaffManagement";
import { FranchiseManagement } from "@/components/franchise/FranchiseManagement";
import { SettingsManagement } from "@/components/settings/SettingsManagement";

type ActiveModule = 
  | "dashboard" 
  | "analytics"
  | "patients" 
  | "tests" 
  | "billing" 
  | "reports" 
  | "settings"
  | "inventory"
  | "staff"
  | "franchise"
  | "manage-booking"
  | "manage-reports" 
  | "old-reports"
  | "barcode-mismatch"
  | "hold"
  | "clinical"
  | "cancellations"
  | "generate-bill"
  | "generate-bill-old"
  | "online-payment"
  | "payment-history"
  | "track-ledger"
  | "manage-doctors"
  | "manage-lab"
  | "test-portfolio"
  | "commission"
  | "inventory-main"
  | "slide-request"
  | "my-staff"
  | "sub-franchisee"
  | "subfranchisee-pricing"
  | "subfranchisee-credits"
  | "generate-certificate";

export function DiagnosticApp() {
  const [activeModule, setActiveModule] = useState<ActiveModule>("dashboard");
  const [userRole] = useState<"admin" | "franchise">("admin"); // For demo, defaulting to admin

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard userRole={userRole} />;
      case "analytics":
        return <Analytics userRole={userRole} />;
      case "patients":
        return <PatientManagement userRole={userRole} />;
      case "tests":
        return <TestCatalogue userRole={userRole} />;
      case "billing":
        return <Billing userRole={userRole} />;
      case "reports":
        return <Reports userRole={userRole} />;
      case "settings":
        return <Settings userRole={userRole} />;
      case "inventory":
        return <Inventory userRole={userRole} />;
      case "staff":
        return <Staff userRole={userRole} />;
      case "franchise":
        return <Franchise userRole={userRole} />;
      
      // BOOKING MODULE
      case "manage-booking":
        return <BookingManagement userRole={userRole} view="all" />;
      case "manage-reports": 
        return <ReportsManagement userRole={userRole} view="all" />;
      case "old-reports":
        return <ReportsManagement userRole={userRole} view="old" />;
      
      // NOTIFICATIONS MODULE  
      case "barcode-mismatch":
      case "hold":
      case "clinical":
      case "cancellations":
        return <Dashboard userRole={userRole} />; // Notification dashboards
      
      // BILLING SUBMODULES
      case "generate-bill":
        return <BillingManagement userRole={userRole} view="new" />;
      case "generate-bill-old":
        return <BillingManagement userRole={userRole} view="history" />;
      case "online-payment":
        return <BillingManagement userRole={userRole} view="online" />;
      case "payment-history":
        return <BillingManagement userRole={userRole} view="history" />;
      case "track-ledger":
        return <BillingManagement userRole={userRole} view="ledger" />;
      case "commission":
        return <BillingManagement userRole={userRole} view="ledger" />;
      case "manage-doctors":
      case "manage-lab":  
      case "test-portfolio":
        return <SettingsManagement userRole={userRole} view="profile" />;
      
      // INVENTORY SUBMODULES
      case "inventory-main":
        return <InventoryManagement userRole={userRole} view="stock" />;
      case "slide-request":
        return <InventoryManagement userRole={userRole} view="requests" />;
      
      // STAFF SUBMODULES
      case "my-staff":
        return <StaffManagement userRole={userRole} view="list" />;
      
      // FRANCHISE SUBMODULES
      case "sub-franchisee":
        return <FranchiseManagement userRole={userRole} view="list" />;
      case "subfranchisee-pricing": 
        return <FranchiseManagement userRole={userRole} view="pricing" />;
      case "subfranchisee-credits":
        return <FranchiseManagement userRole={userRole} view="credits" />;
      
      // SETTINGS SUBMODULES
      case "generate-certificate":
        return <SettingsManagement userRole={userRole} view="certificate" />;
      
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <Sidebar 
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          userRole={userRole}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 p-6">
            {renderActiveModule()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}