import React, { useEffect } from "react";
import SubHeader from "../HomeComponents/SubHeader";
import useAxios from "@/customHook/fetch-hook";
import FillCard from "../ProductCard/FillCard";
import { getParamString } from "@/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const RelatedProducts = ({ singleData }) => {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: `/product/getAllProductsList?${getParamString({
      category: singleData?.category?.name,
      limit: 12,
    })}`,
  });

  useEffect(() => {
    fetchData();
  }, [singleData]);
  return (
    <>
      <div className="sub-bottom-spacing">
        <label className="capitalize text-2xl font-medium ">
          Related Products
        </label>
      </div>
      <div
        className={`flex flex-wrap gap-5 ${
          data?.products?.length > 4 && "justify-center"
        }`}
      >
        <Carousel className="w-full relative">
          <CarouselContent className={"gap-5"}>
            {data?.products?.slice(0, 6)?.map((data, index) => (
              <CarouselItem key={index} className="max-w-[232px] shrink-0">
                <FillCard data={data} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
        <Carousel className="w-full relative">
          <CarouselContent className={"gap-5"}>
            {data?.products?.slice(6, 12)?.map((data, index) => (
              <CarouselItem key={index} className="max-w-[232px] shrink-0">
                <FillCard data={data} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </>
  );
};

export default RelatedProducts;
