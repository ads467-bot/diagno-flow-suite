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
        return <PatientManagement userRole={userRole} />; // Booking management
      case "manage-reports": 
        return <Reports userRole={userRole} />; // Report management
      case "old-reports":
        return <Reports userRole={userRole} />; // Historical reports
      
      // NOTIFICATIONS MODULE  
      case "barcode-mismatch":
      case "hold":
      case "clinical":
      case "cancellations":
        return <Dashboard userRole={userRole} />; // Notification dashboards
      
      // BILLING SUBMODULES
      case "generate-bill":
      case "generate-bill-old":
      case "online-payment":
      case "payment-history":
      case "track-ledger":
      case "commission":
        return <Billing userRole={userRole} />; // Various billing functions
      case "manage-doctors":
      case "manage-lab":  
      case "test-portfolio":
        return <Settings userRole={userRole} />; // Management settings
      
      // INVENTORY SUBMODULES
      case "inventory-main":
      case "slide-request":
        return <Inventory userRole={userRole} />; // Inventory management
      
      // STAFF SUBMODULES
      case "my-staff":
        return <Staff userRole={userRole} />; // Staff management
      
      // FRANCHISE SUBMODULES
      case "sub-franchisee":
      case "subfranchisee-pricing": 
      case "subfranchisee-credits":
        return <Franchise userRole={userRole} />; // Franchise management
      
      // SETTINGS SUBMODULES
      case "generate-certificate":
        return <Settings userRole={userRole} />; // Certificate generation
      
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
        <main className="flex-1 p-6">
          {renderActiveModule()}
        </main>
      </div>
    </SidebarProvider>
  );
}