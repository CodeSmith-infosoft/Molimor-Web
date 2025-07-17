import React from "react";
import BorderCard from "../ProductCard/BorderCard";

const ProductList = ({ data }) => {
  
  // console.log(data)

  return (
    <div className="grid gap-10 grid-cols-4 w-full h-fit">
      {data?.products?.length ? (
        data.products.map((product) => <BorderCard product={product} />)
      ) : (
        <h3 className="text-2xl col-span-4">No Product Found Try With Different Filter.</h3>
      )}
    </div>
  );
};

export default ProductList;
