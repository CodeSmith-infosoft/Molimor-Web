import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const Banner = ({ data, filter }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const [currentBanners, setCurrentBanners] = useState([]);

  useEffect(() => {
    if (data?.length) {
      let currentItems = [];
      if (filter.category.length > 2 || filter.subcategoryId.length > 2) {
        data.forEach((item) => {
          if (
            filter.category === item.categoryName ||
            data?.subCategories?.some(
              (item) => item._id === filter.subcategoryId
            )
          ) {
            currentItems = item.banners;
          }
        });
      } else {
        data?.forEach((item) => {
          if (item?.banners?.length && item.categoryName !== "Combo") {
            currentItems = [...currentItems, ...item.banners];
          }
        });
      }
      if (currentItems.length) {
        setCurrentBanners(currentItems);
      }
    }
  }, [filter, data]);

  return currentBanners?.length ? (
    <div>
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent>
          {currentBanners.map((img, index) => {
            return (
              <CarouselItem
                key={index}
                className={
                  "max-w-[1536px] shrink-0 w-full h-full max-h-[280px]"
                }
              >
                <img src={img} className="w-full h-full max-h-[280px]" />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  ) : (
    <></>
  );
};


export default Banner;
