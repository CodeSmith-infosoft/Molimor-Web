import BuyMore from "@/components/ProductDetail/BuyMore";
import Detail from "@/components/ProductDetail/Detail";
import ProductImageSlider from "@/components/ProductDetail/ProductImageSlider";
import RelatedProducts from "@/components/ProductDetail/RelatedProducts";
import Testimonial from "@/components/ProductDetail/Testimonial";
import React from "react";

const ProductDetail = () => {
  return (
    <>
      <div className="max-w-[1576px] px-10 mx-auto py-[70px]">
        <div className="grid grid-cols-2 gap-[100px]">
          <ProductImageSlider />
          <Detail />
        </div>
        <div className="py-[70px]">
          <BuyMore />
        </div>
        <div>
          <div className="space-y-[30px]">
            <h1 className="text-[20px] font-bold py-4 inline-block shadow-[0px_-2px_0px_0px_#333333_inset]">
              Descriptions
            </h1>

            <div className="space-y-[22px]">
              <h2 className="text-lg font-bold">
                Detox Green Tea – Refresh Your Body and Mind
              </h2>

              <p className="text-lg text-justify">
                Elevate your wellness journey with Molimor's Detox Green Tea, a
                perfect blend of nature's finest ingredients designed to cleanse
                and rejuvenate. Each cup is infused with antioxidants and
                detoxifying properties that help flush out toxins, boost
                metabolism, and enhance overall health. Enjoy a refreshing,
                earthy flavor that soothes the senses and promotes calmness,
                making it the ideal choice for your daily ritual. Embrace the
                natural way to refresh and revitalize with every sip.
              </p>
            </div>

            <div className="space-y-[22px]">
              <h3 className="text-lg font-bold">Key Benefits:-</h3>

              <div className="space-y-[20px]">
                <div className="flex items-center space-x-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="20" rx="10" fill="#333333" />
                    <path
                      d="M14.5 7L8.3125 13L5.5 10.2727"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <p className="text-lg">100 g of fresh leaves provides.</p>
                </div>
              </div>
            </div>

            <p className="text-gray-800 text-lg">
              Use Black Forest Dark Honey to sweeten your drinks, top your
              breakfast, or add a rich depth of flavor to marinades and
              dressings.
            </p>
          </div>
        </div>
        <div className="py-[70px]">
          <RelatedProducts />
        </div>
        <Testimonial />
      </div>
    </>
  );
};

export default ProductDetail;
