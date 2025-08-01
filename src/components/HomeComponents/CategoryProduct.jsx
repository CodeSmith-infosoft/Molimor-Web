import useAxios from "@/customHook/fetch-hook";
import React, { useEffect } from "react";
import FillCard from "../ProductCard/FillCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useNavigate } from "react-router-dom";

const CategoryProduct = ({ bannerData }) => {
  const navigate = useNavigate();
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
    <div className="max-w-[1616px] px-10 max-lg:px-5 mx-auto">
      <h3 className="max-mobile:text-lg max-lg:text-[20px] text-2xl font-medium section-top-spacing sub-bottom-spacing">
        Category Product
      </h3>
      <div className="grid max-mobile:grid-cols-1 grid-cols-2 gap-5">
        <div>
          <img src={bannerData?.homeCategory?.[0]?.image} className="mb-5" />
          <div className="flex gap-[10px]">
            {molimor?.products?.length ? (
              <Carousel className="w-full relative">
                <CarouselContent className={"gap-[10px]"}>
                  {molimor?.products?.slice(0, 3)?.map((deal, i) => (
                    <CarouselItem
                      key={i}
                      className="max-mobile:max-w-[195px] max-md:max-w-[220px] max-lg:max-w-[243px] max-w-[239px] w-full shrink-0"
                    >
                      <FillCard data={deal} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute max-main:right-0 right-4 top-1/2 -translate-y-1/2 z-10" />
              </Carousel>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <img src={bannerData?.homeCategory?.[1]?.image} className="mb-5" />
          <div className="flex gap-[10px]">
            {girnes?.products?.length ? (
              <Carousel className="w-full relative">
                <CarouselContent className={"gap-[10px]"}>
                  {girnes?.products?.slice(0, 3)?.map((deal, i) => (
                    <CarouselItem
                      key={i}
                      className="max-mobile:max-w-[195px] max-md:max-w-[220px] max-lg:max-w-[243px] max-w-[239px] w-full shrink-0"
                    >
                      <FillCard data={deal} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute max-main:right-0 right-4 top-1/2 -translate-y-1/2 z-10" />
              </Carousel>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="grid max-mobile:hidden grid-cols-[auto_auto] justify-center max-lg:gap-10 max-lg:px-[50px] gap-[60px] section-top-spacing">
        <img
          src={bannerData?.combo?.[0]?.image}
          onClick={() => navigate(`/deals?category=combo`)}
          className="cursor-pointer"
        />
        <img
          src={bannerData?.combo?.[1]?.image}
          onClick={() => navigate(`/deals?category=Deals`)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CategoryProduct;
