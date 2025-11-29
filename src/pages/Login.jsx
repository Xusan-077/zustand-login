import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { DUMMY_API } from "../API";
import useAuthStore from "../store";

export default function Login() {
  const { isAuth, login } = useAuthStore();

  const [form, setForm] = useState({
    username: "emilys",
    password: "emilyspass",
  });

  function handleLogin(e) {
    e.preventDefault();

    LoginMutate(form, {
      onSuccess: (res) => {
        toast.success("tizimga success kirildi!", {
          className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
          bodyClassName: "text-sm sm:text-base md:text-lg",
        });

        login(res);
      },
      onError: (err) => {
        toast.error(err.message || "tizimga kirishda xatolik", {
          className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
          bodyClassName: "text-sm sm:text-base md:text-lg",
        });
      },
    });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const { mutate: LoginMutate } = useMutation({
    mutationFn: async (body) => {
      const res = await DUMMY_API.post(`/auth/login`, body);

      return res.data;
    },
  });

  if (isAuth) return <Navigate to="/profile/products" />;

  return (
    <section className="flex justify-between max-[900px]:block gap-5 max-[900px]:p-[0_20px] p-[0_20px_0_0]">
      <div className="max-[900px]:hidden bg-gradient-to-br from-[#0a0f2c] to-[#101c48] text-white/70 text-[30px] max-w-[500px] w-full h-screen flex flex-col justify-between p-[50px_0_70px_50px]">
        <div className="flex justify-between px-[50px] pl-5">
          <a href="/" className="text-white">
            Logo
          </a>
          <Link to="/" className="text-white">
            ← back
          </Link>
        </div>

        <p className="text-white/70 text-[40px] leading-[1.4] max-w-[500px] p-5">
          Welcome. <br />
          start your calculation <br />
          now with our <br />
          management <br />
          system!
        </p>
      </div>

      <div className="w-[80%] max-[900px]:w-full max-[900px]:block flex flex-col items-center justify-center max-[900px]:mt-10">
        <div className="max-[900px]:flex max-[900px]:mb-5 justify-between items-center">
          <h3 className="text-[25px] max-[425px]:text-5 max-[900px]:mb-0 mb-2.5 font-bold text-black">
            Create an account
          </h3>

          <div className="hidden max-[900px]:block">
            <Link
              to="/"
              className="text-gray-500 text-[22px] max-[425px]:text-[18px]"
            >
              ← back
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="max-[900px]:w-full w-[500px] mb-[30px]"
        >
          <label className="block text-[20px] mb-[5px] pl-2.5 text-gray-500">
            firstname
          </label>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            className="max-[900px]:max-w-[800px] border p-3 rounded-lg mb-3 w-full border-gray-300"
          />

          <label className="block text-[20px] mb-[5px] pl-2.5 text-gray-500">
            password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="max-[900px]:max-w-[800px] border p-3 rounded-lg mb-3 w-full border-gray-300"
          />

          <button
            type="submit"
            className="p-4 mt-4 w-full rounded-lg text-white bg-[#101c48] text-[15px] font-medium hover:opacity-80 transition"
          >
            Create account
          </button>
        </form>
      </div>
    </section>
  );
}
