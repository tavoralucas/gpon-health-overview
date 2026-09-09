import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <main className="flex-1 overflow-hidden bg-white">
        <Outlet />
      </main>
    </div>
  );
}
