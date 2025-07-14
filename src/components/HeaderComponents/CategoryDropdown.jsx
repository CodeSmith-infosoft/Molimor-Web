import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";

export default function CategoryDropdown({ categoriesData }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isMainOpen, setIsMainOpen] = useState(isHomePage);
  const [expandedCategory, setExpandedCategory] = useState(null); // Will be set in useEffect

  // Keep dropdown open when on home page
  useEffect(() => {
    if (isHomePage) {
      setIsMainOpen(true);
    }
    // Ensure there's always a category open when component mounts
    if (categoriesData && categoriesData.length > 0 && !expandedCategory) {
      setExpandedCategory(categoriesData[0].id);
    }
  }, [isHomePage, categoriesData, expandedCategory]);

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

  const handleMainToggle = () => {
    // Only allow toggling if not on home page
    if (!isHomePage) {
      setIsMainOpen(!isMainOpen);
    }
  };

  const handleMouseEnter = () => {
    setIsMainOpen(true);
  };

  const handleMouseLeave = () => {
    // Only close on mouse leave if not on home page
    if (!isHomePage) {
      setIsMainOpen(false);
    }
  };

  const renderCategoryItem = (item, level = 0) => {
    const hasSubcategories =
      item.subcategories && item.subcategories.length > 0;
    const isExpanded = expandedCategory === item.id;
    const paddingLeft = level * 16 + 16;

    return (
      <div key={item.id}>
        <div
          className={`flex cursor-pointer items-center justify-between px-[18px] py-[13px] transition-colors duration-500`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => (hasSubcategories ? toggleCategory(item.id) : null)}
        >
          <div className="flex items-center gap-3">
            {item.icon && (
              <div className="w-5 h-5 flex-shrink-0">
                <img
                  src={item.icon || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <span className="text-sm font-medium">{item.name}</span>
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
              {item.subcategories.map((subItem) =>
                renderCategoryItem(subItem, level + 1)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={handleMainToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex items-center gap-2 text-[15px] px-[18px] py-[14px] w-[298px] justify-between ${
          isHomePage ? "text-green" : ""
        } hover:text-green transition-all ease-in-out duration-200 ${
          isHomePage ? "cursor-default" : "cursor-pointer"
        }`}
      >
        <div className="flex gap-[15px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-200"
          >
            <path
              d="M7.20221 3H3.37868C2.98652 3 2.6587 3.1224 2.39522 3.3672C2.13174 3.612 2 3.92411 2 4.30355V8.1224C2 8.50184 2.1348 8.82619 2.40441 9.09547C2.67402 9.36475 2.99877 9.49939 3.37868 9.49939H7.20221C7.59436 9.49939 7.92218 9.36475 8.18566 9.09547C8.44914 8.82619 8.58088 8.50184 8.58088 8.1224V4.30355C8.58088 3.92411 8.44914 3.612 8.18566 3.3672C7.92218 3.1224 7.59436 3 7.20221 3ZM7.34927 8.1224C7.34927 8.15912 7.33395 8.19278 7.30331 8.22338C7.27267 8.25398 7.23897 8.26928 7.20221 8.26928H3.37868C3.34191 8.306 3.30515 8.30294 3.26838 8.2601C3.23162 8.21726 3.21324 8.17136 3.21324 8.1224V4.30355C3.21324 4.25459 3.23162 4.21481 3.26838 4.18421C3.30515 4.15361 3.34191 4.13831 3.37868 4.13831H7.20221C7.23897 4.13831 7.27267 4.15361 7.30331 4.18421C7.33395 4.21481 7.34927 4.25459 7.34927 4.30355V8.1224ZM15.6213 3H11.7978C11.4179 3 11.0931 3.13158 10.8235 3.39474C10.5539 3.6579 10.4191 3.98531 10.4191 4.37699V8.19584C10.4191 8.57528 10.5539 8.89963 10.8235 9.16891C11.0931 9.43819 11.4179 9.57283 11.7978 9.57283H15.6213C16.0135 9.57283 16.3413 9.43819 16.6048 9.16891C16.8683 8.89963 17 8.57528 17 8.19584V4.30355C17 3.92411 16.8683 3.612 16.6048 3.3672C16.3413 3.1224 16.0135 3 15.6213 3ZM15.7868 8.1224C15.7868 8.15912 15.7714 8.19278 15.7408 8.22338C15.7102 8.25398 15.6703 8.26928 15.6213 8.26928H11.7978C11.761 8.26928 11.7273 8.25398 11.6967 8.22338C11.6661 8.19278 11.6507 8.15912 11.6507 8.1224V4.30355C11.6507 4.25459 11.6661 4.21481 11.6967 4.18421C11.7273 4.15361 11.761 4.13831 11.7978 4.13831H15.6213C15.6703 4.13831 15.7102 4.15361 15.7408 4.18421C15.7714 4.21481 15.7868 4.25459 15.7868 4.30355V8.1224ZM15.6213 11.4088H11.7978C11.4179 11.4088 11.0931 11.5404 10.8235 11.8035C10.5539 12.0667 10.4191 12.3941 10.4191 12.7858V16.6047C10.4191 16.9963 10.5539 17.3268 10.8235 17.5961C11.0931 17.8654 11.4179 18 11.7978 18H15.6213C16.0012 18 16.326 17.8654 16.5956 17.5961C16.8652 17.3268 17 16.9963 17 16.6047V12.7858C17 12.3696 16.8683 12.0361 16.6048 11.7852C16.3413 11.5343 16.0135 11.4088 15.6213 11.4088ZM15.7868 16.5312C15.7868 16.5679 15.7714 16.6047 15.7408 16.6414C15.7102 16.6781 15.6703 16.6965 15.6213 16.6965H11.7978C11.761 16.6965 11.7273 16.6781 11.6967 16.6414C11.6661 16.6047 11.6507 16.5679 11.6507 16.5312V12.7124C11.6507 12.6756 11.6661 12.642 11.6967 12.6114C11.7273 12.5808 11.761 12.5655 11.7978 12.5655H15.6213C15.6703 12.5655 15.7102 12.5808 15.7408 12.6114C15.7714 12.642 15.7868 12.6756 15.7868 12.7124V16.5312ZM7.20221 11.4088H3.37868C2.99877 11.4088 2.67402 11.5404 2.40441 11.8035C2.1348 12.0667 2 12.3941 2 12.7858V16.6047C2 16.9963 2.1348 17.3268 2.40441 17.5961C2.67402 17.8654 2.99877 18 3.37868 18H7.20221C7.58211 18 7.90686 17.8654 8.17647 17.5961C8.44608 17.3268 8.58088 16.9963 8.58088 16.6047V12.7858C8.58088 12.3696 8.44914 12.0361 8.18566 11.7852C7.92218 11.5343 7.59436 11.4088 7.20221 11.4088ZM7.34927 16.5312C7.34927 16.5679 7.33395 16.6047 7.30331 16.6414C7.27267 16.6781 7.23897 16.6965 7.20221 16.6965H3.37868C3.34191 16.6965 3.30515 16.6781 3.26838 16.6414C3.23162 16.6047 3.21324 16.5679 3.21324 16.5312V12.7124C3.21324 12.6756 3.23162 12.642 3.26838 12.6114C3.30515 12.5808 3.34191 12.5655 3.37868 12.5655H7.20221C7.23897 12.5655 7.27267 12.5808 7.30331 12.6114C7.33395 12.642 7.34927 12.6756 7.34927 12.7124V16.5312Z"
              fill="currentColor"
            />
          </svg>

          <span className="font-semibold">All Categories</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isMainOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute hide-scrollbar max-h-[601px] top-11 left-0 mt-1 bg-white max-w-[298px] z-20 w-80 overflow-y-auto transition-all duration-300 ease-in-out transform ${
          isMainOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="py-2">
          {categoriesData.map((category) => renderCategoryItem(category))}
        </div>
      </div>
    </div>
  );
}
