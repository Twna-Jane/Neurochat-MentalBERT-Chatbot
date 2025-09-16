import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Page content will be rendered here */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
