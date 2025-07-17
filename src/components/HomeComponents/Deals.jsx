import React, { useEffect } from "react";
import SubHeader from "./SubHeader";
import useAxios from "@/customHook/fetch-hook";
import HorizontalCard from "../ProductCard/HorizontalCard";

const Deals = () => {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/product/getBigSalesProducts",
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-[1576px] px-10 max-lg:px-5 mx-auto section-top-spacing">
      <div className="grid grid-cols-4 gap-5 ">
        <div className="">
          <SubHeader heading={"crazy deal"} />
          <div className="space-y-5">
            {data?.crazyDeal?.length ? (
              data?.crazyDeal
                ?.slice(0, 3)
                ?.map((deal) => <HorizontalCard data={deal} />)
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="col-span-2">
          <SubHeader heading={"Combo"} />
          <div className="gap-5 grid grid-cols-2">
            {data?.combo?.length ? (
              data?.combo
                ?.slice(0, 3)
                ?.map((deal) => <HorizontalCard data={deal} />)
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <SubHeader heading={"deal of the day"} />
          <div className="space-y-5">
            {data?.dealOfTheDay?.length ? (
              data?.dealOfTheDay
                ?.slice(0, 3)
                ?.map((deal) => <HorizontalCard data={deal} isOffer />)
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
