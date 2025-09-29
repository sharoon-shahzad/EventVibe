import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TopNavBar from "@/components/Molecules/Navbar/TopNavBar";
import SideBar from "@/components/Molecules/Navbar/SideBar";
import { urls } from "@/utils/routes/route-paths";
import Loader from "@/components/Atoms/Loader/Loader";

const Dashboard = ({ navLinks }) => {
  const location = useLocation();

  // Check if current path includes profile
  const showSidebar = !location.pathname.includes(urls.Profile);

  return (
    <main className="min-h-screen w-full">
      <TopNavBar navLinks={navLinks} variant="bottombar" />

      <div className="flex">
        {/* Sidebar - Only show if not on profile page */}
        {showSidebar && (
          <div className="hidden lg:block my-16 w-72 fixed h-screen bg-white border-r border-gray-200 z-10 shadow-sm overflow-hidden">
            <SideBar />
          </div>
        )}

        {/* Main Content Area */}
        <div
          className={`flex-1 ${
            showSidebar ? "lg:ml-72" : ""
          } pb-16 lg:pb-0 mt-[5rem]`}
        >
          <div className="lg:p-4 p-1">
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
