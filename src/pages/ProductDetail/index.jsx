import BuyMore from "@/components/ProductDetail/BuyMore";
import Detail from "@/components/ProductDetail/Detail";
import ProductImageSlider from "@/components/ProductDetail/ProductImageSlider";
import useAxios from "@/customHook/fetch-hook";
import { addRecentItems, getParamString } from "@/utils";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const userid = localStorage.getItem("_id");
  const { data, fetchData } = useAxios({
    method: "GET",
    url: `/product/getProduct?${getParamString({
      userId: userid,
      productId: id,
    })}`,
  });

  useEffect(() => {
    if (data) {
      addRecentItems([data]);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="max-w-[1576px] px-10 mx-auto py-[70px]">
        <div className="grid grid-cols-2 gap-[100px]">
          <ProductImageSlider data={data} />
          <Detail data={data} />
        </div>
        <div className="py-[70px]">
          <BuyMore />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
