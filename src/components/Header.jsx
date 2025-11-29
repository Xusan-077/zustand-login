import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="">
      <div className="container">
        <div className="flex items-center justify-between p-[20px_0]">
          <Link to="/" className="text-[25px] cursor-pointer">
            Logo
          </Link>

          <ul className="flex gap-[30px] max-[425px]:gap-4 items-center">
            <li className="">
              <NavLink
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="">
              <NavLink
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
                to="/products"
              >
                Products
              </NavLink>
            </li>
          </ul>

          <Link
            to="/login"
            className="max-[425px]:text-[16px] text-center cursor-pointer p-[5px_0] max-w-[100px] w-full border text-[18px] font-semibold border-blue-500 rounded-lg text-blue-500"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );
}
