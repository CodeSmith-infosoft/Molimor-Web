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
      <div className="grid max-mobile:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 max-mobile:gap-[30px] gap-5 ">
        <div className="max-mobile:col-span-full">
          <SubHeader heading={"crazy deal"} />
          <div className="space-y-5 max-mobile:space-y-0 max-mobile:grid max-mobile:grid-cols-2 max-mobile:gap-4">
            {data?.crazyDeal?.length ? (
              [...data.crazyDeal, ...data.crazyDeal, ...data.crazyDeal]
                ?.slice(0, mobile ? 4 : 3)
                ?.map((deal) => (
                  <HorizontalCard
                    data={deal}
                    imgClass={"max-mobile:h-[65px] max-mobile:w-[65px]"}
                    className="max-mobile:h-[80px]"
                  />
                ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="max-mobile:col-span-full max-lg:col-span-1 col-span-2">
          <SubHeader heading={"Combo"} />
          <div className="gap-5 grid max-mobile:grid-cols-2 max-mobile:gap-4 max-lg:grid-cols-1 grid-cols-2">
            {data?.combo?.length ? (
              [...data.combo, ...data.combo]
                ?.slice(0, mobile ? 4 : laptop ? 3 : 6)
                ?.map((deal) => (
                  <HorizontalCard
                    data={deal}
                    imgClass={"max-mobile:h-[65px] max-mobile:w-[65px]"}
                    className="max-mobile:h-[80px]"
                  />
                ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="max-mobile:col-span-full max-md:col-span-2">
          <SubHeader heading={"deal of the day"} />
          <div className="space-y-5">
            {data?.dealOfTheWeek?.length ? (
              [...data.dealOfTheWeek, ...data.dealOfTheWeek]
                ?.slice(0, 3)
                ?.map((deal) => (
                  <HorizontalCard
                    data={deal}
                    isOffer
                    imgClass={"max-mobile:h-[70px] max-mobile:w-[70px]"}
                    className="max-mobile:h-[105px]"
                  />
                ))
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
