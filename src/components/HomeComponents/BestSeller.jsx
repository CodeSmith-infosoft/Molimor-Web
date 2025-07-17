import useAxios from "@/customHook/fetch-hook";
import React, { useEffect } from "react";
import FillCard from "../ProductCard/FillCard";
import SubHeader from "./SubHeader";

const BestSeller = () => {
  const { data: molimor, fetchData: fetchMolimor } = useAxios({
    method: "GET",
    url: `/product/getAllProductsList?brand=Molimor`,
  });

  const { data: homeCare, fetchData: fetchHomeCare } = useAxios({
    method: "GET",
    url: `/product/getAllProductsList?category=Home%20%26%20Care`,
  });

  const { data: homeKitchen, fetchData: fetchHomeKitchen } = useAxios({
    method: "GET",
    url: `/product/getAllProductsList?category=Home%20%26%20Kitchen`,
  });

  useEffect(() => {
    fetchMolimor();
    fetchHomeCare();
    fetchHomeKitchen();
  }, []);

  return molimor?.products?.length ||
    homeCare?.products?.length ||
    homeKitchen?.products?.length ? (
    <div className="max-w-[1576px] px-10 max-lg:px-5 mx-auto section-top-spacing">
      <SubHeader heading={"best seller product"} link={"/products"} />
      <div className={`flex gap-5 mb-5`}>
        {molimor?.products.slice(0, 2).map((product) => (
          <div className="max-w-[267px] w-full">
            <FillCard data={product} />
          </div>
        ))}
        <img src="/images/dummy/Frame19.svg" />
        {molimor?.products.slice(2, 4).map((product) => (
          <div className="max-w-[267px] w-full">
            <FillCard data={product} />
          </div>
        ))}
      </div>
      <div className={`flex gap-5`}>
        {homeKitchen?.products.slice(0, 2).map((product) => (
          <div className="max-w-[267px] w-full">
            <FillCard data={product} />
          </div>
        ))}
        <img src="/images/dummy/Frame19.svg" />
        {homeCare?.products.slice(0, 2).map((product) => (
          <div className="max-w-[267px] w-full">
            <FillCard data={product} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BestSeller;
