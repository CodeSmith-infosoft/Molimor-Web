import React, { useContext, useEffect } from "react";
import useAxios from "../../customHook/fetch-hook";
import { useState } from "react";
import { FilterCollapse } from "../ProductListComponent/FilterCollapse";
import StarRating from "../Common/StarRating";
import MainContext from "@/context/MainContext";
import { formatCurrency } from "@/utils";

const Filter = ({ filter, setFilter }) => {
  const [openFilter, setOpenFilter] = useState({
    category: true,
    price: true,
    rating: true,
  });
  const { language, currency } = useContext(MainContext);
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/subCategory/getActiveSubCategoryList",
  });
  const priceRanges = [
    {
      id: "under-50",
      label: `Under ${formatCurrency(50, currency, language)}`,
      maxPrice: "50",
    },
    {
      id: "50-100",
      label: `${formatCurrency(50, currency, language)} To ${formatCurrency(
        100,
        currency,
        language
      )}`,
      minPrice: "50",
      maxPrice: "100",
    },
    {
      id: "100-200",
      label: `${formatCurrency(100, currency, language)} To ${formatCurrency(
        200,
        currency,
        language
      )}`,
      minPrice: "100",
      maxPrice: "200",
    },
    {
      id: "above-200",
      label: `Above ${formatCurrency(200, currency, language)}`,
      minPrice: "200",
    },
  ];

  const starRanges = [
    {
      id: "under-50",
      label: (
        <div className="flex gap-[8px] items-center">
          <StarRating rating={5} /> <span className="text-sm">5.0</span>
        </div>
      ),
      count: 5,
    },
    {
      id: "50-100",
      label: (
        <div className="flex gap-[8px] items-center">
          <StarRating rating={4} /> <span className="text-sm">4.0 & up</span>
        </div>
      ),
      count: 4,
    },
    {
      id: "100-200",
      label: (
        <div className="flex gap-[8px] items-center">
          <StarRating rating={3} /> <span className="text-sm">3.0 & up</span>
        </div>
      ),
      count: 3,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-auto max-lg:max-w-[300px] max-w-[376px] w-full space-y-6 ">
      <div className="border border-[#E5E7EB] rounded-[5px] py-5 px-4 ">
        <div
          className="flex justify-between cursor-pointer items-center pb-[26px] border-b border-[#E5E7EB] mb-[26px] "
          onClick={() =>
            setOpenFilter((prev) => ({ ...prev, category: !prev.category }))
          }
        >
          <h3 className="text-[18px] font-medium ">Category</h3>
          <img
            src="/images/common/MdArrowDown.svg"
            className={`transition-transform duration-700 ${
              openFilter.category ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div
          className={`space-y-4 transition-all duration-700 overflow-hidden ${
            openFilter.category
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          {data?.length ? (
            data
              .filter((d) => d.categoryName !== "Combo")
              .map((category) => (
                <div>
                  <FilterCollapse
                    data={category}
                    setFilter={setFilter}
                    filter={filter}
                  />
                </div>
              ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="border border-[#E5E7EB] rounded-[5px] py-5 px-4 ">
        <div
          className="flex justify-between cursor-pointer items-center pb-[26px] border-b border-[#E5E7EB] mb-[26px] "
          onClick={() =>
            setOpenFilter((prev) => ({ ...prev, price: !prev.price }))
          }
        >
          <h3 className="text-[18px] font-medium ">Price</h3>
          <img
            src="/images/common/MdArrowDown.svg"
            className={`transition-transform duration-700 ${
              openFilter.price ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div
          className={`space-y-4 transition-all duration-700 overflow-hidden ${
            openFilter.price
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          {priceRanges?.length ? (
            priceRanges.map((range) => (
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      range?.minPrice === filter.minPrice ||
                      range?.maxPrice === filter.maxPrice
                    }
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        maxPrice: e.target.checked ? range?.maxPrice : "",
                        minPrice: e.target.checked ? range?.minPrice : "",
                      }))
                    }
                    className="peer hidden"
                  />
                  <div className="w-[16px] h-[16px] rounded-[4px] border border-[#E5E7EB] flex items-center justify-center peer-checked:bg-[#076536] peer-checked:border-[#076536] transition-colors duration-200">
                    <img
                      src={"/images/login/checked.svg"}
                      className="w-[12px] h-[8px]"
                    />
                  </div>
                  <span className="text-[#333333] text-sm">{range?.label}</span>
                </label>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="border border-[#E5E7EB] rounded-[5px] py-5 px-4 ">
        <div
          className="flex justify-between cursor-pointer items-center pb-[26px] border-b border-[#E5E7EB] mb-[26px] "
          onClick={() =>
            setOpenFilter((prev) => ({ ...prev, rating: !prev.rating }))
          }
        >
          <h3 className="text-[18px] font-medium ">Rating</h3>
          <img
            src="/images/common/MdArrowDown.svg"
            className={`transition-transform duration-700 ${
              openFilter.rating ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div
          className={`space-y-4 transition-all duration-700 overflow-hidden ${
            openFilter.rating
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          {starRanges?.length ? (
            starRanges.map((range) => (
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={range?.count === filter.review}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        review: e.target.checked ? range?.count : "",
                      }))
                    }
                    className="peer hidden"
                  />
                  <div className="w-[16px] h-[16px] rounded-[4px] border border-[#E5E7EB] flex items-center justify-center peer-checked:bg-[#076536] peer-checked:border-[#076536] transition-colors duration-200">
                    <img
                      src={"/images/login/checked.svg"}
                      className="w-[12px] h-[8px]"
                    />
                  </div>
                  <span className="text-[#333333] text-sm">{range?.label}</span>
                </label>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="h-[350px] w-full rounded-[5px] bg-[#FAE7C8] p-[30px]">
        <div className="">
          <p className="text-[22px] font-semibold mb-[34px]">
            Our Top Most Products Check It Now
          </p>
          <button className="bg-white px-4 py-2 text-sm font-medium rounded-[5px]">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
