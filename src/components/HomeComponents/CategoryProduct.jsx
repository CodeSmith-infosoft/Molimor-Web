import useAxios from "@/customHook/fetch-hook";
import React, { useEffect } from "react";
import FillCard from "../ProductCard/FillCard";

const CategoryProduct = () => {
  const { data: molimor, fetchData: fetchMolimor } = useAxios({
    method: "GET",
    url: `/product/getAllProductsList?brand=Molimor`,
  });

  const { data: girnes, fetchData: fetchGirnes } = useAxios({
    method: "GET",
    url: `/product/getAllProductsList?brand=Girnes`,
  });

  useEffect(() => {
    fetchMolimor();
    fetchGirnes();
  }, []);

  return (
    <div className="max-w-[1576px] px-10 max-lg:px-5 mx-auto">
      <h3 className="text-2xl font-medium section-top-spacing sub-bottom-spacing">
        Category Product
      </h3>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <img src="/images/dummy/76.svg" className="mb-5" />
          <div className="flex gap-[10px]">
            {molimor?.products?.length ? (
              molimor?.products
                ?.slice(0, 3)
                ?.map((deal) => <FillCard data={deal} />)
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <img src="/images/dummy/76.svg" className="mb-5" />
          <div className="flex gap-[10px]">
            {girnes?.products?.length ? (
              girnes?.products
                ?.slice(0, 3)
                ?.map((deal) => <FillCard data={deal} />)
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto] justify-center gap-[60px] section-top-spacing">
        <img src="/images/dummy/Bannar.svg" />
        <img src="/images/dummy/Bannar1.svg" />
      </div>
    </div>
  );
};

export default CategoryProduct;
