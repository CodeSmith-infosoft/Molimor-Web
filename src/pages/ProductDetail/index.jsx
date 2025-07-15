import BuyMore from "@/components/ProductDetail/BuyMore";
import Detail from "@/components/ProductDetail/Detail";
import ProductImageSlider from "@/components/ProductDetail/ProductImageSlider";
import React from "react";

const ProductDetail = () => {
  return (
    <>
      <div className="max-w-[1576px] px-10 mx-auto py-[70px]">
        <div className="grid grid-cols-2 gap-[100px]">
          <ProductImageSlider />
          <Detail />
        </div>
        <div className="py-[70px]">
          <BuyMore />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
