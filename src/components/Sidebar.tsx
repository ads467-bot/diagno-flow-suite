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
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const { toggleSidebar } = useSidebar();

  const menuItems = [
    {
      id: "dashboard" as ActiveModule,
      label: "Dashboard",
      icon: LayoutDashboard,
      allowedRoles: ["admin", "franchise"]
    },
    {
      id: "patients" as ActiveModule,
      label: "Patient Management",
      icon: Users,
      allowedRoles: ["admin", "franchise"]
    },
    {
      id: "tests" as ActiveModule,
      label: "Test Catalogue",
      icon: TestTube,
      allowedRoles: ["admin", "franchise"]
    },
    {
      id: "billing" as ActiveModule,
      label: "Billing & Payments",
      icon: Receipt,
      allowedRoles: ["admin", "franchise"]
    },
    {
      id: "reports" as ActiveModule,
      label: "Lab Reports",
      icon: FileText,
      allowedRoles: ["admin", "franchise"]
    },
    {
      id: "settings" as ActiveModule,
      label: "Settings",
      icon: SettingsIcon,
      allowedRoles: ["admin", "franchise"]
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.allowedRoles.includes(userRole)
  );

  return (
    <SidebarUI className="border-r border-border bg-card">
      <SidebarHeader className="border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-foreground">MedLab Pro</h2>
            <p className="text-sm text-muted-foreground capitalize">{userRole} Panel</p>
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

      <SidebarContent className="p-4">
        <SidebarMenu>
          <Collapsible open={isManagementOpen} onOpenChange={setIsManagementOpen}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="flex items-center justify-between w-full p-3 text-muted-foreground hover:text-foreground">
                <span className="font-medium">Management</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isManagementOpen ? 'rotate-180' : ''}`} />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onModuleChange(item.id)}
                      className={`w-full justify-start p-3 transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-soft' 
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      <span className="font-medium">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
    </SidebarUI>
  );
}