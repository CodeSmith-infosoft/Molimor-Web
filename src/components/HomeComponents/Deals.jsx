import React, { useEffect } from "react";
import SubHeader from "./SubHeader";
import useAxios from "@/customHook/fetch-hook";
import HorizontalCard from "../ProductCard/HorizontalCard";
import { useIsMobile } from "@/customHook/screen-hooks";

const Deals = () => {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/product/getBigSalesProducts",
  });
  const laptop = useIsMobile(1025);
  const mobile = useIsMobile(441);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-[1576px] px-10 max-lg:px-5 mx-auto section-top-spacing">
      <div className="grid max-mobile:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 gap-5 ">
        <div className="">
          <SubHeader heading={"crazy deal"} />
          <div className="space-y-5">
            {data?.crazyDeal?.length ? (
              [...data.crazyDeal,...data.crazyDeal,...data.crazyDeal,]
                ?.slice(0, 3)
                ?.map((deal) => <HorizontalCard data={deal} />)
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="max-lg:col-span-1 col-span-2">
          <SubHeader heading={"Combo"} />
          <div className="gap-5 grid max-lg:grid-cols-1 grid-cols-2">
            {data?.combo?.length ? (
              [...data.combo,...data.combo]
                ?.slice(0, laptop ? 3 : 6)
                ?.map((deal) => <HorizontalCard data={deal} />)
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="max-md:col-span-2">
          <SubHeader heading={"deal of the day"} />
          <div className="space-y-5">
            {data?.dealOfTheWeek?.length ? (
              [...data.dealOfTheWeek, ...data.dealOfTheWeek]
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
