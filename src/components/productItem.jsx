import { format } from "date-fns";

export default function PrivateProductItem({
  question,
  answer,
  createdAt,
  updatedAt,
}) {
  return (
    <li className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 w-full">
      <div className="bg-gray-100 w-full h-[200px] rounded-lg mb-5 flex items-center justify-center overflow-hidden">
        <span className="text-gray-400 text-sm italic">No Image</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          Savol:
          <span className="font-normal text-gray-700">{question}</span>
        </h2>
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          Javob: <span className="font-normal text-gray-700">{answer}</span>
        </h2>

        <div className="flex flex-col gap-3 text-sm text-gray-500 mt-3">
          <span>
            Yaratilgan: {format(new Date(createdAt), "dd yyyy, HH:mm:ss")}
          </span>
          <span>
            Yangilangan: {format(new Date(updatedAt), "dd yyyy, HH:mm:ss")}
            {}
          </span>
        </div>
      </div>
    </li>
  );
}
