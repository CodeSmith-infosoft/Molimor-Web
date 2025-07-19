import React from "react";
import BorderCard from "../ProductCard/BorderCard";

const ProductList = ({ data }) => {
  
  // console.log(data)

  return (
    <div className="grid max-lg:gap-[22px] gap-10 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 w-full h-fit">
      {data?.products?.length ? (
        data.products.map((product) => <BorderCard product={product} />)
      ) : (
        <h3 className="max-md:text-base text-2xl col-span-4">No Product Found Try With Different Filter.</h3>
      )}
    </div>
  );
};

export default ProductList;
