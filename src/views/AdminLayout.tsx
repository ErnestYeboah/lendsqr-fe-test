import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import HeaderNavBar from "../components/header_navbar/HeaderNavBar";

const AdminLayout = () => {
  return (
    <div className="grid lg:grid-cols-[20%_1fr]">
      <SideBar />
      <div className="bg-gray-100 min-h-screen">
        <HeaderNavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
