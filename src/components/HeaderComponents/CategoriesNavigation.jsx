import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import useAxios from "@/customHook/fetch-hook";
import { useEffect } from "react";

export default function CategoriesNavigation() {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/subCategory/getActiveSubCategoryList",
  });

  const navigationItems = [
    { label: "Home", link: "/" },
    { label: "Popular Products", link: "/products" },
    { label: "Home & Kitchen", link: "" },
    { label: "Home & Care", link: "" },
    { label: "Food", link: "" },
    { label: "Combo", link: "" },
    { label: "Deals", link: "" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <nav className="bg-white">
      <div className="max-w-[1576px] px-10 mx-auto mt-[30px]">
        <div className="flex items-center gap-[32px]">
          <CategoryDropdown categoriesData={data} />

          <div className="flex items-center gap-[30px]">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="px-2 py-3 text-gray-700 hover:text-green font-semibold text-[15px] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
