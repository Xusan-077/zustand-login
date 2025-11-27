import ProductItem from "../components/productItem";
import { useQuery } from "@tanstack/react-query";
import { API } from "../API";

export default function Products() {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async function getAPI() {
      const res = await API.get("/faqs");
      return res.data.data;
    },
  });

  console.log(data);

  return (
    <section className={`${data?.length ? "mb-auto h-full" : "h-[80.1vh]"}`}>
      <div className="container">
        <div className="">
          <ul
            className={`${
              data?.length ? "mt-[65px] grid grid-cols-3 gap-5" : ""
            }`}
          >
            {data?.length ? (
              data.map((product, index) => (
                <ProductItem
                  productId={index + 1}
                  product={product}
                  key={product.id}
                  {...product}
                />
              ))
            ) : (
              <p className="border-gray-500 border p-5 rounded-lg text-red-500 text-center text-2xl font-semibold ">
                Product bo`sh
              </p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
