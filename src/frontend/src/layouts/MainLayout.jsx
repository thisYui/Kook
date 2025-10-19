import { Outlet } from "react-router-dom";
//import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex">
      {/*<Sidebar />*/}
      <main className="flex-1 ml-64 p-6"> {/* ml-64 để chừa chỗ cho sidebar */}
        <Outlet /> {/* nơi render page con */}
      </main>
    </div>
  );
}
