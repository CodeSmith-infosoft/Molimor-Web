import useAxios from "@/customHook/fetch-hook";
import React, { useEffect, useState } from "react";
import BorderCard from "../ProductCard/BorderCard";
import { getParamString } from "@/utils";

const ProductList = ({ filter, category }) => {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: `/product/getBigSalesProducts?${getParamString(filter)}`,
  });
  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    if (data) {
      let result = [];
      Object.keys(data).forEach((key) => {
        if (category.length) {
          if (category.includes(key)) {
            result = [...result, ...data[key]];
          }
        } else {
          result = [...result, ...data[key]];
        }
      });
      setMainData(result);
    }
  }, [data, category]);

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <div className="grid max-lg:gap-[22px] gap-10 max-lg:grid-cols-3 grid-cols-4 w-full h-fit">
      {mainData?.length ? (
        mainData.map((product) => <BorderCard product={product} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductList;
