import React, { useEffect } from "react";
import SubHeader from "./SubHeader";
import useAxios from "@/customHook/fetch-hook";
import FillCard from "../ProductCard/FillCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const Popular = () => {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/product/getPopularProductList",
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {" "}
      {data?.length ? (
        <div className="max-w-[1576px] px-10 max-lg:px-5 mx-auto section-top-spacing">
          <SubHeader heading={"Popular Product"} link={"/products"} />
          <div className={`flex gap-5`}>
            <Carousel className="w-full relative">
              <CarouselContent className={"gap-[10px]"}>
                {data?.map((product, i) => (
                  <CarouselItem
                    key={i}
                    className="max-lg:max-w-[220px] max-w-[244px] w-full shrink-0"
                  >
                    <FillCard data={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="section-top-spacing">
        <img src="/images/dummy/Frame1.svg" className="mx-auto" />
      </div>
    </>
  );
};

export default Popular;
