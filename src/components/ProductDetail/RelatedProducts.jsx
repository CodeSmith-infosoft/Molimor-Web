import React, { useEffect } from "react";
import SubHeader from "../HomeComponents/SubHeader";
import useAxios from "@/customHook/fetch-hook";
import FillCard from "../ProductCard/FillCard";

const RelatedProducts = () => {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/product/getPopularProductList",
  });

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="sub-bottom-spacing">
        <label className="capitalize text-2xl font-medium ">
          Related Products
        </label>
      </div>
      <div
        className={`flex flex-wrap gap-5 ${
          data?.length > 4 && "justify-center"
        }`}
      >
        {data?.map((product) => (
          <div className="max-w-[232px] w-full">
            <FillCard data={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default RelatedProducts;
