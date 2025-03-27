
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Home,
  Calendar,
  Users,
  Bell,
  Shield,
  FileText,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Calendar", icon: Calendar, path: "/calendar" },
  { name: "Team Management", icon: Users, path: "/team" },
  { name: "Alerts", icon: Bell, path: "/alerts" },
  { name: "Security", icon: Shield, path: "/security" },
  { name: "Reports", icon: FileText, path: "/reports" },
  { name: "Billing", icon: CreditCard, path: "/billing" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-5">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">WhatsScheduler</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild className={
                    location.pathname === item.path ? "text-sidebar-primary-foreground bg-sidebar-primary" : ""
                  }>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="space-y-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md w-full hover:bg-sidebar-accent transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md w-full hover:bg-sidebar-accent transition-colors">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
