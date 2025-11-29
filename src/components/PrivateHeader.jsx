import { useNavigate } from "react-router-dom";
import useAuthStore from "../store";

export default function PrivateHeader() {
  const { user } = useAuthStore();

  const navigate = useNavigate();

  return (
    <header className="p-4 md:p-6 bg-white shadow-md">
      <div className="flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-gray-800 cursor-pointer"
          onClick={() => navigate("/profile/products")}
        >
          Logo
        </h1>

        <div
          onClick={() => navigate("/profile/settings")}
          className="flex items-center gap-5 max-[425px]:gap-2 cursor-pointer"
        >
          <div className="">
            <i className="bi bi-person-circle max-[425px]:text-[30px] text-gray-500 text-4xl"></i>
          </div>
          <span className="text-gray-700 text-[20px] max-[425px]:text-[16px] mt-1">
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      </div>
    </header>
  );
}
