import React, { useEffect, useState } from "react";
import BorderCard from "../ProductCard/BorderCard";

const ProductList = ({ category, data }) => {
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

  return (
    <div className="grid max-lg:gap-[22px] gap-10 max-mobile:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 w-full h-fit">
      {mainData?.length ? (
        mainData.map((product) => <BorderCard product={product} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductList;
