import useAxios from "@/customHook/fetch-hook";
import React, { useEffect } from "react";
import FillCard from "../ProductCard/FillCard";
import SubHeader from "./SubHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useNavigate } from "react-router-dom";

const BestSeller = ({ bannerData }) => {
  const navigate = useNavigate();
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
    <div className="max-w-[1616px] px-10 max-lg:px-5 mx-auto section-top-spacing">
      <SubHeader heading={"best seller product"} link={"/products"} />
      <div className={`flex gap-5 mb-5`}>
        <Carousel className="w-full relative">
          <CarouselContent className={"gap-[10px]"}>
            {molimor?.products?.slice(0, 2)?.map((deal, i) => (
              <CarouselItem
                key={i}
                className="max-mobile:max-w-[195px] max-md:max-w-[220px] max-lg:max-w-[243px] max-main:max-w-[250px] max-w-[276px] w-full shrink-0"
              >
                <FillCard data={deal} />
              </CarouselItem>
            ))}
            <CarouselItem
              className={
                "flex items-center max-md:hidden max-lg:min-w-[273px] max-main:min-w-[336px] w-full max-lg:w-[257px]"
              }
            >
              <img
                src={bannerData?.sellerBanner?.[0]?.image}
                className="max-lg:min-w-[257px] max-main:min-w-[320px] w-full shrink-0 cursor-pointer"
                onClick={() =>
                  navigate(
                    `/products/${bannerData?.sellerBanner?.[0]?.productId}`
                  )
                }
              />
            </CarouselItem>
            {molimor?.products?.slice(2, 4)?.map((deal, i) => (
              <CarouselItem
                key={i}
                className="max-mobile:max-w-[195px] max-md:max-w-[220px] max-lg:max-w-[243px] max-main:max-w-[250px] max-w-[276px] w-full shrink-0"
              >
                <FillCard data={deal} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
      <div className={`flex gap-5`}>
        <Carousel className="w-full relative">
          <CarouselContent className={"gap-[10px]"}>
            {homeKitchen?.products.slice(0, 2)?.map((deal, i) => (
              <CarouselItem
                key={i}
                className="max-mobile:max-w-[195px] max-md:max-w-[220px] max-lg:max-w-[243px] max-main:max-w-[250px] max-w-[276px] w-auto shrink-0"
              >
                <FillCard data={deal} />
              </CarouselItem>
            ))}
            <CarouselItem
              className={
                "flex items-center max-md:hidden max-lg:min-w-[273px] max-main:min-w-[336px] w-full max-lg:w-[257px]"
              }
            >
              <img
                src={bannerData?.sellerBanner?.[1]?.image}
                className="max-lg:min-w-[257px] max-main:min-w-[320px] w-auto shrink-0 cursor-pointer"
                onClick={() =>
                  navigate(
                    `/products/${bannerData?.sellerBanner?.[1]?.productId}`
                  )
                }
              />
            </CarouselItem>
            {homeCare?.products.slice(0, 2)?.map((deal, i) => (
              <CarouselItem
                key={i}
                className="max-mobile:max-w-[195px] max-md:max-w-[220px] max-lg:max-w-[243px] max-main:max-w-[250px] max-w-[276px] w-full shrink-0"
              >
                <FillCard data={deal} />
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
  );
};

export default BestSeller;
