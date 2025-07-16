import useAxios from "@/customHook/fetch-hook";
import React, { useEffect } from "react";
import BorderCard from "../ProductCard/BorderCard";
import { getParamString } from "@/utils";

const ProductList = ({ filter }) => {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: `/product/getAllProductsList?${getParamString(filter)}`,
  });

  useEffect(() => {
    fetchData();
  }, [filter]);

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
