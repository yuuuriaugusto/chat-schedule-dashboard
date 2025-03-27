
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
