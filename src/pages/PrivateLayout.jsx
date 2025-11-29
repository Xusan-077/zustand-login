import { NavLink, Outlet } from "react-router-dom";
import LeftComponenta from "../components/LeftComponenta";
import PrivateHeader from "../components/PrivateHeader";

export default function PrivateLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <aside className="max-[1200px]:hidden fixed top-0 left-0 h-screen w-72 bg-white shadow-md z-20">
        <LeftComponenta />
      </aside>

      <header className="max-[1200px]:w-full max-[1200px]:top-0 max-[1200px]:left-0 fixed top-0 left-72 w-[calc(100%-18rem)] bg-white shadow-md z-10">
        <PrivateHeader />
      </header>

      <main className="max-[1200px]:ml-0 max-[1200px]:w-full ml-72 mt-24 w-[calc(100%-18rem)]  max-[1200px]:mb-25">
        <Outlet />
      </main>

      <div className="fixed hidden max-[1200px]:block p-2 bottom-0 left-0 bg-white w-screen shadow-2xs">
        <ul className="flex gap-3">
          <li className="max-w-full w-full text-center">
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "text-white rounded-lg bg-gray-800" : ""
                } p-2.5 block`
              }
              to="products"
            >
              Products
            </NavLink>
          </li>
          <li className="max-w-full w-full text-center">
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "text-white rounded-lg bg-gray-800" : ""
                } p-2.5 block`
              }
              to="settings"
            >
              Setting
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
