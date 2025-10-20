import { Outlet } from "react-router-dom";
import NavbarLogin from "../components/NavbarLogin";
import NavbarLogout from "../components/NavbarLogout"
export default function MainLayout() {
  return (
    <div className="flex">
      {/* <NavbarLogin /> */}
      <NavbarLogout />
      <main className="flex-1 ml-64 p-6"> {/* ml-64 để chừa chỗ cho Navbar */}
        <Outlet /> {/* nơi render page con */}
      </main>
    </div>
  );
}
