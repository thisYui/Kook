import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="relative h-screen flex items-center justify-center">
        <img src="https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg" alt="Background" className="w-full h-full object-cover absolute top-0 left-0 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-8 rounded-lg shadow-xl z-10">
            <Outlet />
        </div>
        </div>
    );
}
