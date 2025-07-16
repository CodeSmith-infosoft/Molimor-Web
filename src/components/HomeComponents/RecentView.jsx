import { getRecentItems } from "@/utils";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FillCard from "../ProductCard/FillCard";

const RecentView = () => {
  const recent = getRecentItems();
  return (
    <div className="max-w-[1576px] px-10 mx-auto">
      <h3 className="text-2xl font-medium sub-bottom-spacing">
        Recently Viewed
      </h3>
      <Carousel className="w-full relative">
        <CarouselContent className={"gap-5"}>
          {recent?.map((data, index) => (
            <CarouselItem key={index} className="w-[240px] shrink-0">
                <FillCard data={data} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
};

export default RecentView;
