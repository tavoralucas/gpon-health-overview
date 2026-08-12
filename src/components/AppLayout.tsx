import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-card px-4 shadow-sm" />

      <main className="flex-1 overflow-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
}
