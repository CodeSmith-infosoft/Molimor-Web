import React, { useEffect, useRef } from "react";

const Banner = ({ data, filter }) => {
  const currentBanners = useRef([]);
  useEffect(() => {
    if (data?.length) {
      let currentItems = [];
      if (filter.category.length > 2 || filter.subcategoryId.length > 2) {
        data.forEach((item) => {
          if (
            filter.category === item.categoryName ||
            data?.subCategories.some(
              (item) => item._id === filter.subcategoryId
            )
          ) {
            currentItems = item.banners;
          }
        });
      } else {
        data?.forEach((item) => {
          if (item?.banners?.length) {
            currentItems = [...currentItems, ...item.banners];
          }
        });
      }
      if (currentItems.length) {
        currentBanners.current = currentItems;
      }
    }
  }, [filter, data]);

  console.log(currentBanners.current)
  return (
    <div>
      <img src="/images/dummy/subBanner.svg" className="w-full max-h-[280px]" />
    </div>
  );
};

export default Banner;
