import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">

      <main className="flex-1 overflow-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
}
