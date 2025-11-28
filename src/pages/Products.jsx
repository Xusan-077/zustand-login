import ProductItem from "../components/productItem";
import { useQuery } from "@tanstack/react-query";
import { API } from "../API";

export default function Products() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async function getAPI() {
      const res = await API.get("/faqs");
      return res.data.data;
    },
  });

  return (
    <section className="mb-auto h-full">
      <div className="container">
        <div className="">
          <ul className={`${"mt-[65px] grid grid-cols-3 gap-5"}`}>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 w-full"
                >
                  <div className="bg-gray-300 w-full h-[200px] rounded-lg mb-8 flex items-center justify-center overflow-hidden"></div>
                  <div className="mb-3">
                    <div className="bg-gray-300 rounded-lg w-35 h-6 mb-1"></div>
                    <div className="bg-gray-300 rounded-lg w-35 h-6"></div>
                  </div>
                  <div className="">
                    <div className="bg-gray-300 rounded-lg w-60 h-6 mb-1"></div>
                    <div className="bg-gray-300 rounded-lg w-60 h-6"></div>
                  </div>
                </div>
              ))
            ) : data?.length ? (
              data.map((product, index) => (
                <ProductItem
                  productId={index + 1}
                  product={product}
                  key={product.id}
                  {...product}
                />
              ))
            ) : (
              <p className="border-gray-500 border p-5 rounded-lg text-red-500 text-center text-2xl font-semibold">
                Product bo`sh
              </p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
