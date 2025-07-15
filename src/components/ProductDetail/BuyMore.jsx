import useAxios from "@/customHook/fetch-hook";
import React, { useEffect } from "react";
import BorderCard from "../ProductCard/BorderCard";

const BuyMore = () => {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/product/getAllProductsList",
  });

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h4 className="text-[20px] font-semibold mb-[26px]">Buy it with</h4>
      <div className="grid grid-cols-5">
        <div className="col-span-4">
          <div className="grid grid-cols-4 gap-5">
            {data?.products?.length ? (
              data.products.map((product) => <BorderCard product={product} />)
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex justify-end">Total Price</div>
      </div>
    </>
  );
};

export default BuyMore;
