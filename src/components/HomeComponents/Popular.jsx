import React, { useEffect } from "react";
import SubHeader from "./SubHeader";
import useAxios from "@/customHook/fetch-hook";
import FillCard from "../ProductCard/FillCard";

const Popular = () => {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/product/getPopularProductList",
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {" "}
      {data?.length ? (
        <div className="max-w-[1576px] px-10 max-lg:px-5 mx-auto section-top-spacing">
          <SubHeader heading={"Popular Product"} link={"/products"} />
          <div
            className={`flex flex-wrap gap-5 ${
              data.length > 4 && "justify-center"
            }`}
          >
            {data.map((product) => (
              <div className="max-w-[232px] w-full">
                <FillCard data={product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="section-top-spacing">
        <img src="/images/dummy/Frame1.svg" className="mx-auto" />
      </div>
    </>
  );
};

export default Popular;
