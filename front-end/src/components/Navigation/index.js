import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { SidebarExpand } from "./Sidebar/SidebarExpand";
import { SidebarMini } from "./Sidebar/SidebarMini";

// Parent component for nav components
export default function Navigation() {
  return (
    <>
      <Navbar />
      <SidebarExpand />
      <SidebarMini />
      <Outlet />
    </>
  );
}
