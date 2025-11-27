import { toast } from "react-toastify";
import { useState } from "react";
import useAuthStore from "../store";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [Logout, setLogout] = useState(false);

  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  function handlelogout() {
    toast.success("tizimdan muaffaqiyatli chiqildi");

    setLogout(false);
    logout();

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  return (
    <section className="">
      {Logout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
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
          <div className="flex items-center justify-between border-b border-b-gray-300 mb-5 pb-5">
            <h2 className="text-[26px] font-semibold">Shaxsiy malumotlar</h2>
            <button
              className={`text-[20px] cursor-pointer rounded-lg transition-all text-left text-white bg-red-500 p-[8px_20px] block `}
              onClick={() => setLogout(true)}
            >
              Log Out
            </button>
          </div>
          <div className="grid items-center grid-cols-3">
            <div className="ml-[120px]">
              <img className="w-[180px] h-[180px]" src={user?.image} alt="" />
            </div>
            <div className="flex flex-col gap-[15px]">
              <div className="">
                <h6 className="text-[14px] text-[#333] mb-[5px]">Ism</h6>
                <h3 className="text-[20px] text-[#333] mb-[6.3px] font-semibold">
                  {user?.firstName}
                </h3>
              </div>
              <div className="">
                <h6 className="text-[14px] text-[#333] mb-[5px]">username</h6>
                <h3 className="text-[20px] text-[#333] mb-[6.3px] font-semibold">
                  {user?.username}
                </h3>
              </div>
              <div className="">
                <h6 className="text-[14px] text-[#333] mb-[5px]">Jinsi</h6>
                <h3 className="text-[20px] text-[#333] mb-[6.3px] font-semibold">
                  {user?.gender}
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-[15px]">
              <div className="">
                <h6 className="text-[14px] text-[#333] mb-[5px]">Familyasi</h6>
                <h3 className="text-[20px] text-[#333] mb-[6.3px] font-semibold">
                  {user?.lastName}
                </h3>
              </div>
              <div className="">
                <h6 className="text-[14px] text-[#333] mb-[5px]">email</h6>
                <h3 className="text-[20px] text-[#333] mb-[6.3px] font-semibold">
                  {user?.email}
                </h3>
              </div>
              <div className="">
                <h6 className="text-[14px] text-[#333] mb-[5px] ">Id</h6>
                <h3 className="text-[20px] text-[#333] mb-[6.3px] font-semibold">
                  {user?.id}
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex gap-[30px] items-center mt-[30px]">
          <div className="p-[30px_30px_50px_30px] flex flex-col justify-between h-[150px] shadow-lg rounded-lg w-[450px]">
            <h3 className="text-[18px] font-semibold mb-[30px]">Kirish</h3>

            <div className="text-[20px] font-bold">{user.id}</div>
          </div>
          <div className="relative p-[30px_30px_50px_30px] flex flex-col justify-between h-[150px] shadow-lg rounded-lg w-[450px]">
            <div className="">
              <h3 className="text-[18px] font-semibold mb-[30px]">Parol</h3>
              <button
                className="absolute top-[30px] right-[30px]"
                onClick={() => setShowModal(true)}
              >
                <i className="text-[22px] text-gray-600 cursor-pointer bi bi-pencil"></i>
              </button>
            </div>

            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((el, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-[50%] bg-black"
                ></div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
