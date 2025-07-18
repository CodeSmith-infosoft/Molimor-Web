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
    { label: "Home & Kitchen", link: "/products?category=Home-Kitchen" },
    { label: "Home & Care", link: "/products?category=Home-Care" },
    { label: "Food", link: "/products?category=Food" },
    { label: "Combo", link: "/deals?category=combo" },
    { label: "Deals", link: "/deals?category=Deals" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <nav className="bg-white max-md:hidden">
      <div className="max-w-[1576px] max-lg:px-5 px-10 mx-auto mt-[30px]">
        <div className="flex items-center gap-[32px]">
          <CategoryDropdown categoriesData={data} />

          <div className="flex items-center gap-[30px]">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="max-lg:p-0 px-2 py-3 whitespace-nowrap hover:text-green font-semibold max-lg:text-sm text-[15px] transition-colors duration-200"
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
