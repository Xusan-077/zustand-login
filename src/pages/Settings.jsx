import { toast } from "react-toastify";
import { useState } from "react";
import useAuthStore from "../store";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [Logout, setLogout] = useState(false);

  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  function handlelogout() {
    toast.success("tizimdan muaffaqiyatli chiqildi", {
      className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
      bodyClassName: "text-sm sm:text-base md:text-lg",
    });

    setLogout(false);
    logout();

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  return (
    <section className="">
      <div className="container">
        {Logout && (
          <div className="fixed inset-0 p-[0_20px] z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-[400px] rounded-lg p-6 relative">
              <div className="flex justify-end">
                <button
                  onClick={() => setLogout(false)}
                  className="text-gray-500 text-[25px] cursor-pointer hover:text-gray-700 text-lg font-bold"
                >
                  &times;
                </button>
              </div>

              <h2 className="text-[22px] font-semibold mb-4 text-gray-700 text-center">
                Are you sure you want to log out?
              </h2>

              <div className="flex justify-end">
                <div className="flex justify-end w-[200px] gap-4">
                  <button
                    onClick={() => setLogout(false)}
                    className="flex-1 bg-gray-300 text-gray-700 p-2 cursor-pointer rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlelogout}
                    className="flex-1 bg-red-500 text-white cursor-pointer p-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="">
          <div className="shadow-lg p-[25px] rounded-lg">
            <div className="flex items-center justify-between border-b border-b-gray-300 mb-5 pb-5 max-[480px]:block">
              <h2 className="text-[26px] font-semibold max-[480px]:text-center max-[480px]:mb-5 max-[480px]:text-[22px]">
                Shaxsiy malumotlar
              </h2>
              <button
                className={`text-[20px] cursor-pointer max-[480px]:w-full max-[480px]:text-center rounded-lg transition-all text-left text-white bg-red-500 p-[8px_20px] block `}
                onClick={() => setLogout(true)}
              >
                Log Out
              </button>
            </div>
            <div className="grid items-center grid-cols-3 max-[980px]:block">
              <div className="ml-[120px] max-[1300px]:ml-10 max-[980px]:m-0 max-[980px]:justify-center max-[980px]:mb-5 max-[980px]:flex">
                <img className="w-[180px] h-[180px]" src={user?.image} alt="" />
              </div>
              <div className="flex flex-col gap-[15px] max-[980px]:block">
                <div className="">
                  <h6 className="text-[14px] text-[#333] mb-[5px]">Ism</h6>
                  <h3 className="text-[20px] text-[#333] mb-[7px] font-semibold">
                    {user?.firstName}
                  </h3>
                </div>
                <div className="">
                  <h6 className="text-[14px] text-[#333] mb-[5px]">username</h6>
                  <h3 className="text-[20px] text-[#333] mb-[7px] font-semibold">
                    {user?.username}
                  </h3>
                </div>
                <div className="">
                  <h6 className="text-[14px] text-[#333] mb-[5px]">Jinsi</h6>
                  <h3 className="text-[20px] text-[#333] mb-[7px] font-semibold">
                    {user?.gender}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-[15px] max-[980px]:block">
                <div className="">
                  <h6 className="text-[14px] text-[#333] mb-[5px]">
                    Familyasi
                  </h6>
                  <h3 className="text-[20px] text-[#333] mb-[7px] font-semibold">
                    {user?.lastName}
                  </h3>
                </div>
                <div className="">
                  <h6 className="text-[14px] text-[#333] mb-[5px]">email</h6>
                  <h3 className="max-w-xs text-lg text-gray-800 mb-1.5 font-semibold">
                    {user?.email}
                  </h3>
                </div>
                <div className="">
                  <h6 className="text-[14px] text-[#333] mb-[5px] ">Id</h6>
                  <h3 className="text-[20px] text-[#333] mb-[7px] font-semibold">
                    {user?.id}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
