import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";

export function Layout() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />
      <main className="flex-grow-1 pt-navbar">
        <Outlet />
      </main>
    </div>
  );
}
