import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { API } from "../API";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { queryClient } from "../main";

export default function PrivateProductItem({ product, productId }) {
  const [editValue, setEditValue] = useState({
    question: "",
    answer: "",
  });

  const [deleteModal, setDeleteModal] = useState(false);

  const [editModal, setEditModal] = useState(false);

  function saveData(e) {
    setEditValue({
      ...editValue,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (editValue.question.trim() != "" && editValue.answer.trim() != "") {
      EditFAQ({ id: product.id, newFaq: editValue });
    }
  }

  const { mutate: EditFAQ } = useMutation({
    mutationFn: async ({ id, newFaq }) => {
      const res = await API.put(`/faqs/${id}`, newFaq);
    },

    onSuccess: () => {
      setEditModal(false);
      toast.success("Edit FAQ success", {
        className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        bodyClassName: "text-sm sm:text-base md:text-lg",
      });
      queryClient.invalidateQueries();
    },
  });

  const { mutate: DeleteFAQ } = useMutation({
    mutationFn: async (id) => {
      const res = await API.delete(`/faqs/${id}`);
    },

    onSuccess: () => {
      toast.success("delete FAQ success", {
        className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        bodyClassName: "text-sm sm:text-base md:text-lg",
      });
      queryClient.invalidateQueries();
    },
  });

  return (
    <>
      {editModal && (
        <div className="fixed inset-0 p-[0_20px] z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-[400px] rounded-lg p-6 relative">
            <button
              onClick={() => setEditModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>

            <h2 className="text-[30px] text-gray-600 text-left mb-5 font-semibold">
              Edit FAQ
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              <input
                onChange={saveData}
                className="border-b p-[10px_0_10px_20px] outline-none border-b-gray-400 mb-2.5"
                type="text"
                placeholder="Savolni kiriting"
                name="question"
                defaultValue={product.question}
              />

              <input
                onChange={saveData}
                className="border-b p-[10px_0_10px_20px] outline-none border-b-gray-400 mb-2.5"
                type="text"
                placeholder="Javobni kiriting"
                name="answer"
                defaultValue={product.answer}
              />

              <div className="flex gap-2 justify-end mt-3">
                <button
                  onClick={() => setEditModal(false)}
                  className="bg-gray-500 cursor-pointer  w-[100px] p-[10px_0] text-[16px]  text-white rounded-lg"
                >
                  cancle
                </button>
                <button className="bg-blue-500  cursor-pointer w-[100px] p-[10px_0] text-[16px]  text-white rounded-lg">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center p-[0_20px] justify-center bg-black/50">
          <div className="bg-white w-[400px] rounded-lg p-6 relative">
            <button
              onClick={() => setDeleteModal(false)}
              className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>

            <h2 className="text-[30px] text-gray-600 text-left mb-5 font-semibold">
              Delete FAQ
            </h2>

            <div className="">
              <p className="text-[18px] text-center mb-5">
                "{product.question}" savolini o'chirishni xohlaysizmi?
              </p>

              <div className="flex gap-2 justify-end mt-3">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="bg-gray-500 cursor-pointer  w-[100px] p-[10px_0] text-[16px]  text-white rounded-lg"
                >
                  cancle
                </button>
                <button
                  onClick={() => {
                    DeleteFAQ(product.id);
                    setDeleteModal(false);
                  }}
                  className="bg-red-500  cursor-pointer w-[100px] p-[10px_0] text-[16px]  text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <li className="mb-2.5 border-b max-[425px]:pb-5 pb-2.5 border-b-[#ccc]">
        <div className="grid gap-5 max-[500px]:gap-1 items-center grid-cols-[50px_1fr_100px] max-[500px]:grid-cols-[20px_1fr] max-[800px]:grid-cols-[50px_1fr] max-[425px]:grid-cols-[1fr]">
          <span>{productId}</span>

          <div className="grid grid-cols-4 items-center max-[500px]:grid-cols-[1fr_1fr] max-[500px]:gap-3">
            <h2 className="text-gray-500 text-center max-w-[300px]">{product.question}</h2>
            <h2 className="text-gray-500 text-center max-w-[300px]">{product.answer}</h2>
            <h2 className="text-gray-500 text-center max-w-[300px]">
              {format(new Date(product.createdAt), "dd yyyy, HH:mm:ss")}
            </h2>
            <h2 className="text-gray-500 text-center">
              {format(new Date(product.updatedAt), "dd yyyy, HH:mm:ss")}
            </h2>
          </div>

          <div className="flex max-[800px]:hidden gap-2.5">
            <button
              onClick={() => setEditModal(true)}
              className="w-full cursor-pointer bg-yellow-500 text-[14px] text-white p-[5px_0] rounded-lg"
            >
              <i className="bi bi-pencil"></i>
            </button>

            <button
              onClick={() => setDeleteModal(true)}
              className="w-full bg-red-500 cursor-pointer text-[14px] text-white p-[5px_0] rounded-lg"
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        </div>
        <div className="hidden max-[800px]:flex mt-10 max-[425px]:mt-5 gap-2.5">
          <button
            onClick={() => setEditModal(true)}
            className="w-full cursor-pointer bg-yellow-500 text-[14px] text-white p-[5px_0] rounded-lg"
          >
            <i className="bi bi-pencil"></i>
          </button>

          <button
            onClick={() => setDeleteModal(true)}
            className="w-full bg-red-500 cursor-pointer text-[14px] text-white p-[5px_0] rounded-lg"
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </li>
    </>
  );
}
