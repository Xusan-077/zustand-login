import { useState } from "react";
import PrivateProductItem from "./PrivateProductItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../API";
import { toast } from "react-toastify";
import { queryClient } from "../main";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function PrivateProducts() {
  const [modal, setModal] = useState(false);

  const schema = yup
    .object({
      question: yup.string().required("Savol majburiy"),
      answer: yup.string().required("Javob majburiy"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => createFAQ(data);

  const [data, setData] = useState({
    question: "",
    answer: "",
  });

  function openModal() {
    setModal(true);
    setData({ question: "", answer: "" });
    reset();
  }

  function closeModal() {
    setModal(false);
    setData({ question: "", answer: "" });
    reset();
  }

  function saveData(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const { mutate: createFAQ } = useMutation({
    onSuccess: () => {
      setModal(false);
      toast.success("Add FAQ success", {
        className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        bodyClassName: "text-sm sm:text-base md:text-lg",
      });
      queryClient.invalidateQueries();
      setData({ question: "", answer: "" });
      reset();
    },
    mutationFn: async (faq) => {
      const res = await API.post("/faqs", faq);
      return res;
    },
  });

  const {
    data: getFaqs,
    error: getFAQsError,
    isLoading: isLoadingFAQs,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async function getAPI() {
      const res = await API.get("/faqs");
      return res.data.data;
    },
  });

  return (
    <section>
      <div className="container">
        <div className="">
          {modal && (
            <div className="fixed inset-0 p-[0_20px] z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white w-[400px] rounded-lg p-6 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
                >
                  &times;
                </button>

                <h2 className="text-[30px] text-gray-600 text-left mb-5 font-semibold">
                  Add Product
                </h2>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col w-full gap-4"
                >
                  <label className="w-full relative">
                    <input
                      {...register("question")}
                      onChange={saveData}
                      className={`peer/question transition-all max-[900px]:max-w-[800px]
      focus:outline-1 focus:outline-blue-400
      border-b h-[50px] w-full border-b-gray-300
      placeholder-transparent p-[10px_0_10px_20px] ${
        errors?.question?.message ? "border-red-400" : "border-gray-400"
      } outline-none`}
                      type="text"
                      placeholder="Savolni kiriting"
                      name="question"
                      value={data.question}
                    />
                    <span
                      className="
      absolute left-6 text-gray-500 transition-all duration-300 pointer-events-none
      top-[14px] text-[18px]
      peer-placeholder-shown/question:top-[14px]
      peer-placeholder-shown/question:text-[18px]
      peer-focus/question:top-[-12px]
      peer-focus/question:text-[14px]
      peer-focus/question:bg-white
      peer-focus/question:px-1
      peer-[:not(:placeholder-shown)]/question:top-[-12px]
      peer-[:not(:placeholder-shown)]/question:text-[14px]
      peer-[:not(:placeholder-shown)]/question:bg-white
      peer-[:not(:placeholder-shown)]/question:px-1
    "
                    >
                      Savol
                    </span>
                    <p className="text-[14px] text-red-500 pl-2 mt-1">
                      {errors?.question?.message}
                    </p>
                  </label>

                  <label className="w-full relative">
                    <input
                      {...register("answer")}
                      onChange={saveData}
                      className={`peer/answer transition-all max-[900px]:max-w-[800px]
      focus:outline-1 focus:outline-blue-400
      border-b h-[50px] w-full border-b-gray-300
      placeholder-transparent p-[10px_0_10px_20px] ${
        errors?.answer?.message ? "border-red-400" : "border-gray-400"
      } outline-none`}
                      type="text"
                      placeholder="Javobni kiriting"
                      name="answer"
                      value={data.answer}
                    />
                    <span
                      className="
      absolute left-6 text-gray-500 transition-all duration-300 pointer-events-none
      top-[14px] text-[18px]
      peer-placeholder-shown/answer:top-[14px]
      peer-placeholder-shown/answer:text-[18px]
      peer-focus/answer:top-[-12px]
      peer-focus/answer:text-[14px]
      peer-focus/answer:bg-white
      peer-focus/answer:px-1
      peer-[:not(:placeholder-shown)]/answer:top-[-12px]
      peer-[:not(:placeholder-shown)]/answer:text-[14px]
      peer-[:not(:placeholder-shown)]/answer:bg-white
      peer-[:not(:placeholder-shown)]/answer:px-1
    "
                    >
                      Javob
                    </span>
                    <p className="text-[14px] text-red-500 pl-2 mt-1">
                      {errors?.answer?.message}
                    </p>
                  </label>

                  <button className="bg-blue-500 p-[10px_0] text-[14px] w-full text-white rounded-lg mt-4">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-[15px]">
            <h3 className="text-[26px] font-semibold">Products</h3>

            <button
              onClick={openModal}
              className="p-[10px_20px] bg-green-500 cursor-pointer text-white rounded-lg"
            >
              + Add Product
            </button>
          </div>

          <ul className="border border-gray-500 p-[30px_20px_10px_30px] rounded-lg">
            {isLoadingFAQs ? (
              Array.from({ length: 3 }).map((el, index) => (
                <div
                  className="grid gap-25 items-center grid-cols-[50px_1fr_100px] mb-2.5 border-b pb-2.5 border-b-[#ccc]"
                  key={index}
                >
                  <div className="bg-gray-200 rounded-lg h-[22.5px]"></div>
                  <div className="grid grid-cols-4 gap-30 items-center">
                    <div className="bg-gray-200 rounded-lg h-[22.5px]"></div>
                    <div className="bg-gray-200 rounded-lg h-[22.5px]"></div>
                    <div className="bg-gray-200 rounded-lg h-[22.5px]"></div>
                    <div className="bg-gray-200 rounded-lg h-[22.5px]"></div>
                  </div>

                  <div className="flex gap-2.5">
                    <button className="w-full bg-gray-300 cursor-pointer h-[30px] text-white p-[5px_0] rounded-lg"></button>
                    <button className="w-full bg-gray-300 cursor-pointer h-[30px] text-white p-[5px_0] rounded-lg"></button>
                  </div>
                </div>
              ))
            ) : getFAQsError ? (
              <p className="text-red-500 text-center text-2xl font-semibold mb-5">
                {getFAQsError.message || "FAQs ni get qilishda xatolik"}
              </p>
            ) : getFaqs?.length ? (
              getFaqs?.map((product, index) => (
                <PrivateProductItem
                  productId={index + 1}
                  product={product}
                  key={product.id}
                />
              ))
            ) : (
              <p className="text-red-500 text-center text-2xl font-semibold mb-5">
                Product bo`sh
              </p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
