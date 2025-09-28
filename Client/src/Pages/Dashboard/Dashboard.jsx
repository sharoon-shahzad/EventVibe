import TopNavBar from "@/components/Molecules/Navbar/TopNavBar";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = ({ navLinks }) => {
  return (
    <main className="min-h-screen w-full">
      <TopNavBar navLinks={navLinks} variant="bottombar" />

      {/* Main Content Area */}
      <div className="lg:ml-28 pb-16 lg:pb-0 mt-[5rem]">
        <div className="lg:p-4 p-1">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
