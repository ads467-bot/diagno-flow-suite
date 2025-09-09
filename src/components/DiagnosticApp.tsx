import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { PatientManagement } from "@/components/PatientManagement";
import { TestCatalogue } from "@/components/TestCatalogue";
import { Billing } from "@/components/Billing";
import { Reports } from "@/components/Reports";
import { Settings } from "@/components/Settings";

type ActiveModule = "dashboard" | "patients" | "tests" | "billing" | "reports" | "settings";

export function DiagnosticApp() {
  const [activeModule, setActiveModule] = useState<ActiveModule>("dashboard");
  const [userRole] = useState<"admin" | "franchise">("admin"); // For demo, defaulting to admin

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard userRole={userRole} />;
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