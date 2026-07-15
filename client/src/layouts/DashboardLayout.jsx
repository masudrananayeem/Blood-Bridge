import { Outlet } from "react-router-dom";

// Sidebar + role-switch header wraps donor/seeker panels — built out in Step 7
export default function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
