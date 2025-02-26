import { Outlet } from "react-router";
import { Sidebar } from "../components/Navigation/Sidebar";

export function LayoutDashboard() {
    return (
        <>
            <Sidebar />
            <div className="sm:ml-0 md:ml-0 lg:ml-64  pt-1 w-auto bg-gray-100 h-auto min-h-screen">
                <Outlet />
            </div>
        </>
    )
}