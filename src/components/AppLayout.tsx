import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <main className="flex-1 bg-background">
        <Outlet />
      </main>
    </div>
  );
}
