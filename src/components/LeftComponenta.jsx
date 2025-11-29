import { NavLink } from "react-router-dom";

export default function LeftComponenta() {
  return (
    <div className="bg-gray-800 block p-[25px] h-screen -z-10">
      <div className="mb-[30px]">
        <h4 className="text-white text-[30px]">NavBar</h4>
      </div>
      <div className="">
        <ul className="">
          <li className="">
            <NavLink
              className={({ isActive }) =>
                `text-[20px] hover:bg-gray-400 mb-[5px] rounded-lg transition-all text-left text-white p-[15px_0_15px_40px] w-full block ${
                  isActive ? "bg-gray-400" : ""
                }`
              }
              to="products"
            >
              Products
            </NavLink>
          </li>
          <li className="">
            <NavLink
              className={({ isActive }) =>
                `text-[20px] flex gap-5 hover:bg-gray-400 mb-[5px] rounded-lg transition-all text-left text-white p-[15px_0_15px_40px] w-full ${
                  isActive ? "bg-gray-400" : ""
                }`
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
