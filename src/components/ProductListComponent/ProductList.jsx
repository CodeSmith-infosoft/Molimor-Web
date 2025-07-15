import useAxios from "@/customHook/fetch-hook";
import React, { useEffect } from "react";
import BorderCard from "../ProductCard/BorderCard";

const ProductList = () => {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/product/getAllProductsList",
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid gap-10 grid-cols-4 w-full h-fit">
      {data?.products?.length ? (
        data.products.map((product) => <BorderCard product={product} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductList;
