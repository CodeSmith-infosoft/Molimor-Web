"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { getPercent } from "@/utils";
import toast from "react-hot-toast";

export default function ProductImageSlider({ data, selectedWeight }) {
  const [mainApi, setMainApi] = useState();
  const [thumbnailApi, setThumbnailApi] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // trigger when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const onSelect = useCallback((api) => {
    if (!api) {
      return;
    }
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!mainApi) return;
    onSelect(mainApi);
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  useEffect(() => {
    if (!mainApi || !thumbnailApi) return;

    // Sync main carousel to thumbnail clicks
    thumbnailApi.on("click", (api, event) => {
      const target = event.target.closest(".embla__slide");
      if (target) {
        const index = Array.from(api.slideNodes()).indexOf(target);
        if (index > -1) {
          mainApi.scrollTo(index);
        }
      }
    });

    // Sync thumbnail carousel to main carousel changes
    mainApi.on("select", () => {
      thumbnailApi.scrollTo(mainApi.selectedScrollSnap());
    });
  }, [mainApi, thumbnailApi]);

  return (
    <div className="flex gap-[10px]">
      <div className="flex flex-col gap-4 w-full">
        <Carousel
          setApi={setMainApi}
          className="w-full h-full max-lg:!max-h-[438px] !max-h-[660px]  relative"
        >
          <CarouselContent>
            {data?.image?.map((image, index) => (
              <CarouselItem key={index} className={"w-full"}>
                <div className="relative w-full flex justify-center aspect-square overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={image}
                    className="object-cover w-full !h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-4 left-4 bg-[#DC2626] text-white text-xs font-bold px-2 py-1 rounded-md">
            {getPercent([selectedWeight])}%
          </div>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>

        {/* Thumbnail Carousel */}
        <Carousel setApi={setThumbnailApi} className="w-full">
          <CarouselContent className="-ml-2">
            {data?.image?.map((image, index) => (
              <CarouselItem key={index} className="pl-2">
                <div
                  className={cn(
                    "relative overflow-hidden cursor-pointer border-1 transition-all",
                    selectedIndex === index
                      ? "border-green"
                      : "border-transparent hover:border-gray-300"
                  )}
                  onClick={() => mainApi && mainApi.scrollTo(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-contain w-20 h-[80px] "
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div>
        <div
          className="flex items-center text-sm  cursor-pointer relative"
          ref={dropdownRef}
        >
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-[10px]"
          >
            <div className="border border-[#E5E7EB] rounded-[6px] py-[7px] px-2">
              <svg
                width="15"
                height="18"
                viewBox="0 0 15 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1791 12.1076C11.3534 12.1076 10.6094 12.48 10.0931 13.0725L5.44889 10.0683C5.5764 9.72787 5.64177 9.36554 5.64163 9C5.64179 8.63446 5.57642 8.27212 5.44889 7.93171L10.0931 4.92736C10.6095 5.51981 11.3534 5.8924 12.1791 5.8924C13.7346 5.8924 15 4.57073 15 2.94613C15 1.32152 13.7346 0 12.1791 0C10.6237 0 9.35823 1.32166 9.35823 2.94627C9.35817 3.31179 9.42354 3.6741 9.55097 4.01453L4.9069 7.01877C4.39055 6.42632 3.64662 6.05373 2.8209 6.05373C1.26542 6.05373 0 7.37554 0 9C0 10.6246 1.26542 11.9463 2.8209 11.9463C3.64659 11.9463 4.39058 11.5738 4.9069 10.9812L9.55101 13.9855C9.42355 14.3259 9.35816 14.6883 9.35823 15.0539C9.35823 16.6783 10.6236 18 12.1791 18C13.7346 18 15 16.6783 15 15.0539C15 13.4293 13.7346 12.1076 12.1791 12.1076ZM10.3868 2.94627C10.3868 1.91408 11.1909 1.07434 12.1791 1.07434C13.1673 1.07434 13.9714 1.91408 13.9714 2.94627C13.9714 3.97846 13.1674 4.8182 12.1791 4.8182C11.1908 4.8182 10.3868 3.97842 10.3868 2.94627ZM2.8209 10.8719C1.8325 10.8719 1.02849 10.0322 1.02849 9C1.02849 7.96785 1.8325 7.12807 2.8209 7.12807C3.80917 7.12807 4.61304 7.96785 4.61304 9C4.61304 10.0322 3.80913 10.8719 2.8209 10.8719ZM10.3868 15.0538C10.3868 14.0216 11.1909 13.1818 12.1791 13.1818C13.1673 13.1818 13.9714 14.0216 13.9714 15.0537C13.9714 16.0859 13.1674 16.9257 12.1791 16.9257C11.1908 16.9257 10.3868 16.0859 10.3868 15.0537V15.0538Z"
                  fill="#333333"
                />
              </svg>
            </div>
          </div>
          {isOpen && (
            <div className="absolute top-full py-1 left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[182px]">
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(
                      window.location.href
                    )}`,
                    "_blank"
                  )
                }
                className="flex gap-2 w-full text-left px-3 py-2 text-sm  hover:bg-gray-100 first:rounded-t-md"
              >
                <img
                  src={"/images/footer/watsapp.svg"}
                  className="h-4"
                  alt=""
                />{" "}
                Share on WhatsApp
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`,
                    "_blank"
                  )
                }
                className="flex gap-2 w-full text-left px-3 py-2 text-sm  hover:bg-gray-100"
              >
                <img
                  src={"/images/footer/facebook.png"}
                  className="h-4"
                  alt=""
                />{" "}
                Share on Facebook
              </button>

              <button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}`,
                    "_blank"
                  )
                }
                className="flex gap-2 w-full text-left px-3 py-2 text-sm  hover:bg-gray-100"
              >
                <img src={"/images/footer/x.png"} className="h-4" alt="" />{" "}
                Share on Twitter
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard!");
                }}
                className="flex gap-2 w-full text-left px-3 py-2 text-sm  hover:bg-gray-100 last:rounded-b-md"
              >
                <img src={"/images/footer/link.svg"} className="h-4" alt="" />{" "}
                Copy Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
