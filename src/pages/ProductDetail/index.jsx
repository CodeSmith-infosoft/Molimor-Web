import BuyMore from "@/components/ProductDetail/BuyMore";
import Detail from "@/components/ProductDetail/Detail";
import ProductImageSlider from "@/components/ProductDetail/ProductImageSlider";
import useAxios from "@/customHook/fetch-hook";
import { addRecentItems, getParamString } from "@/utils";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "@/components/ProductDetail/RelatedProducts";
import Testimonial from "@/components/ProductDetail/Testimonial";
import Loader from "@/components/MainLoader/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const userid = localStorage.getItem("_id");
  const { data, fetchData, loading } = useAxios({
    method: "GET",
    url: `/product/getProduct?${getParamString({
      userId: userid,
      productId: id,
    })}`,
  });

  useEffect(() => {
    if (data) {
      addRecentItems([data]);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-[1616px] px-10 max-lg:px-5 mx-auto max-mobile:py-[30px] max-md:py-[40px] max-lg:py-[50px] py-[70px]">
          <Detail data={data} getProduct={fetchData} />
          <div className="">
            <BuyMore data={data?.buyItWith} />
          </div>
          <div className="section-top-spacing">
            <div className="max-mobile:space-y-[21px] space-y-[30px]">
              <h1 className="max-mobile:text-lg text-[20px] font-bold max-mobile:py-2 py-4 inline-block border-b-2 border-[#333333]">
                Descriptions
              </h1>

              {data?.description?.map((desc) => (
                <div className="space-y-[22px]">
                  <h2 className="max-mobile:text-base text-lg font-bold">
                    {desc?.h}
                  </h2>

                  <p className="max-mobile:text-sm text-lg text-justify">
                    {desc?.p}
                  </p>
                </div>
              ))}

              <div className="max-mobile:space-y-4 space-y-[22px]">
                <h3 className="max-mobile:text-base text-lg font-bold">
                  Key Benefits:-
                </h3>

                {data?.benefits?.map((benefit) => (
                  <div className="space-y-[20px]">
                    <div className="flex items-center space-x-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="max-mobile:!w-4 max-mobile:!h-4"
                      >
                        <rect width="20" height="20" rx="10" fill="#333333" />
                        <path
                          d="M14.5 7L8.3125 13L5.5 10.2727"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <p className="max-mobile:text-sm text-lg">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="max-mobile:py-[30px] max-md:py-[40px] max-lg:py-[50px] py-[70px]">
            <RelatedProducts singleData={data} />
          </div>
          <Testimonial />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
