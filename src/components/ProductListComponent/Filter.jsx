import React, { useEffect } from "react";
import useAxios from "../../customHook/fetch-hook";
import { useState } from "react";
import { FilterCollapse } from "./FilterCollapse";

const Filter = () => {
  const [openFilter, setOpenFilter] = useState({
    category: true,
    price: true,
    rating: true,
  });
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/subCategory/getActiveSubCategoryList",
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-auto max-w-[376px] w-full ">
      <div className="border border-[#E5E7EB] rounded-[5px] py-5 px-4 ">
        <div className="flex justify-between items-center pb-[26px] border-b border-[#E5E7EB] mb-[26px] ">
          <h3 className="text-[18px] font-medium ">Category</h3>
          <img src="/images/common/MdArrowDown.svg" />
        </div>
        <div className="space-y-4">
          {data?.length ? (
            data.map((category) => (
              <div>
                
                <FilterCollapse data={category} />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
