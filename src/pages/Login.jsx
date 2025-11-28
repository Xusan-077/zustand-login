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
        toast.success("tizimga success kirildi");

        // setInterval(() => {
        login(res);
        // }, 1000);
      },
      onError: (err) => {
        toast.error(err.message || "tizimga kirishda xatolik");
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
    <section className="flex justify-between">
      <div className="bg-gradient-to-br from-[#0a0f2c] to-[#101c48] text-white/70 text-[30px] max-w-[500px] w-full h-screen flex flex-col justify-between p-[50px_0_70px_50px]">
        <div className="flex justify-between px-[50px] pl-[20px]">
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

      <div className="w-[80%] flex flex-col justify-center items-center">
        <h3 className="text-[25px] mb-2.5 font-bold text-black">
          Create an account
        </h3>

        <form onSubmit={handleLogin} className="w-[500px] mb-[30px]">
          <label className="block text-[20px] mb-[5px] pl-2.5 text-gray-500">
            firstname
          </label>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            className="border p-3 rounded-lg mb-3 w-full border-gray-300"
          />

          <label className="block text-[20px] mb-[5px] pl-2.5 text-gray-500">
            password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="border p-3 rounded-lg mb-3 w-full border-gray-300"
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
