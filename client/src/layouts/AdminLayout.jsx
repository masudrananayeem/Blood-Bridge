import { Outlet } from "react-router-dom";

// Professional admin sidebar layout — built out in Step 9
export default function AdminLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
