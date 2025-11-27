import { Outlet } from "react-router-dom";
import LeftComponenta from "../components/LeftComponenta";
import PrivateHeader from "../components/PrivateHeader";

export default function PrivateLayout() {
  return (
    <div className="flex">
      <aside className="fixed top-0 left-0 h-screen w-72 bg-white shadow-md z-20">
        <LeftComponenta />
      </aside>

      <header className="fixed top-0 left-72 w-[calc(100%-18rem)] bg-white shadow-md z-10">
        <PrivateHeader />
      </header>

      <main className="ml-72 mt-24 w-[calc(100%-18rem)] p-5">
        <Outlet />
      </main>
    </div>
  );
}
