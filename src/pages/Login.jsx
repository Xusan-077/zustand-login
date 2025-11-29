import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { DUMMY_API } from "../API";
import useAuthStore from "../store";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Login() {
  const navigate = useNavigate();

  const schema = yup
    .object({
      username: yup.string().required(),
      password: yup.string().min(8).required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function onSubmit() {
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

  const { isAuth, login } = useAuthStore();

  const [form, setForm] = useState({
    username: "emilys", //
    password: "emilyspass", //
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const { mutate: LoginMutate } = useMutation({
    mutationFn: async (body) => {
      const res = await DUMMY_API.post(`/auth/login`, body);

      return res.data;
    },
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/profile/products", { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <section className="flex justify-between max-[900px]:block gap-5 max-[900px]:p-[0_20px] p-[0_20px_0_0]">
      <div className="max-[F900px]:hidden bg-gradient-to-br from-[#0a0f2c] to-[#101c48] text-white/70 text-[30px] max-w-[500px] w-full h-screen flex flex-col justify-between p-[50px_0_70px_50px]">
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
          onSubmit={handleSubmit(onSubmit)}
          className="max-[900px]:w-full w-[500px] mb-[30px] transition-all"
        >
          <label className="relative mb-5 block">
            <input
              name="username"
              type="text"
              onChange={handleChange}
              {...register("username")}
              placeholder=" "
              defaultValue={form.username}
              className="
        peer/username transition-all max-[900px]:max-w-[800px]
        focus:outline-1 focus:outline-blue-400
        border p-[0_0_0_24px] h-[50px] rounded-lg w-full border-gray-300
        placeholder-transparent
      "
            />
            <span
              className="
        absolute left-6 text-gray-500 transition-all duration-300 pointer-events-none
        top-[14px] text-[18px]
        peer-placeholder-shown/username:top-[11px]
        peer-placeholder-shown/username:text-[18px]
        peer-focus/username:top-[-12px]
        peer-focus/username:text-[16px]
        peer-focus/username:bg-white
        peer-focus/username:px-1
        peer-[:not(:placeholder-shown)]/username:top-[-12px]
        peer-[:not(:placeholder-shown)]/username:text-[16px]
        peer-[:not(:placeholder-shown)]/username:bg-white
        peer-[:not(:placeholder-shown)]/username:px-1
      "
            >
              Username
            </span>
            <p className="text-[14px] text-red-500 pl-2 mt-1">
              {errors?.username?.message}
            </p>
          </label>

          <label className="relative mb-5 block">
            <input
              name="password"
              type="password"
              onChange={handleChange}
              {...register("password")}
              defaultValue={form.password}
              placeholder=" "
              className="
        peer/password transition-all max-[900px]:max-w-[800px]
        focus:outline-1 focus:outline-blue-400
        border p-[0_0_0_24px] h-[50px] rounded-lg w-full border-gray-300
        placeholder-transparent
      "
            />
            <span
              className="
        absolute left-6 text-gray-500 transition-all duration-300 pointer-events-none
        top-[14px] text-[18px]
        peer-placeholder-shown/password:top-[11px]
        peer-placeholder-shown/password:text-[18px]
        peer-focus/password:top-[-12px]
        peer-focus/password:text-[16px]
        peer-focus/password:bg-white
        peer-focus/password:px-1
        peer-[:not(:placeholder-shown)]/password:top-[-12px]
        peer-[:not(:placeholder-shown)]/password:text-[16px]
        peer-[:not(:placeholder-shown)]/password:bg-white
        peer-[:not(:placeholder-shown)]/password:px-1
      "
            >
              Password
            </span>
            <p className="text-[14px] text-red-500 pl-2 mt-1">
              {errors?.password?.message}
            </p>
          </label>

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
