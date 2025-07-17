import useAxios from "@/customHook/fetch-hook";
import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/subCategory/getActiveSubCategoryList",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Ensure there's always a category open when component mounts
    if (data && data.length > 0 && !expandedCategory) {
      setExpandedCategory(data[0].categoryId);
    }
  }, [data]);

  const renderCategoryItem = (item, level = 0) => {
    const hasSubcategories =
      item?.subCategories && item?.subCategories?.length > 0;
    const isExpanded = expandedCategory === item?.categoryId;
    const paddingLeft = level * 16 + 16;

    return (
      <div key={item?.categoryId}>
        <div
          className={`flex cursor-pointer items-center justify-between px-[18px] py-[13px] transition-colors duration-500`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => {
            hasSubcategories ? toggleCategory(item?.categoryId) : null;
            level === 1
              ? navigate(`/products?subcategoryId=${item._id}`)
              : null;
          }}
        >
          <div className="flex items-center gap-3">
            {item?.image && (
              <div className="w-5 h-5 flex-shrink-0">
                <img
                  src={item?.image || "/placeholder.svg"}
                  alt={item?.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <span className="text-sm font-medium">
              {item?.categoryName || item?.name}
            </span>
          </div>

          {hasSubcategories && (
            <div className="flex-shrink-0">
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? "rotate-90" : ""
                }`}
              />
            </div>
          )}
        </div>

        {hasSubcategories && (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="transform transition-transform duration-300 ease-in-out">
              {item.subCategories?.map((subItem) =>
                renderCategoryItem(subItem, level + 1)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategory((prev) => {
      // If trying to close the currently open category, don't allow it
      if (prev === categoryId) {
        return prev; // Keep the current category open
      }
      // Otherwise, open the new category
      return categoryId;
    });
  };

  return (
    <div className="max-w-[1576px] px-10 max-lg:px-5 mx-auto">
      <div className="grid grid-cols-[auto_auto] gap-[32px] ">
        <div>
          <div
            className={`hide-scrollbar h-[580px] mt-[1px] bg-white max-lg:max-w-[250px] max-w-[298px] z-20 w-80 overflow-y-auto transition-all duration-300 ease-in-out transform opacity-100 scale-100 translate-y-0`}
          >
            <div className="py-2">
              {data
                ?.filter((d) => d.categoryName !== "Combo")
                ?.map((category) => renderCategoryItem(category))}
            </div>
          </div>
        </div>
        <img src="/images/dummy/homeMainBanner.svg" className="h-[580px] object-cover" />
      </div>
      <div className="section-top-spacing grid grid-cols-3 max-lg:gap-[20px] gap-[70px] overflow-hidden">
        <img
          src="/images/dummy/Rectangle1442.svg"
          className="max-h-[200px] w-auto"
        />
        <img
          src="/images/dummy/Rectangle1443.svg"
          className="max-h-[200px] w-auto"
        />
        <img
          src="/images/dummy/Rectangle1444.svg"
          className="max-h-[200px] w-auto"
        />
      </div>
    </div>
  );
};

export default Banner;
