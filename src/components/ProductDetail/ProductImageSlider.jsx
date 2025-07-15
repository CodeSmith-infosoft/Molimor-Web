"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function ProductImageSlider() {
  const images = [
    { src: "/images/dummy/detox.png", alt: "Detox Green Tea Main" },
    { src: "/images/dummy/khichadi.png", alt: "Detox Green Tea Side View" },
    { src: "/images/dummy/khichadi.png", alt: "Detox Green Tea Packaging" },
    { src: "/images/dummy/khichadi.png", alt: "Detox Green Tea Ingredients" },
    { src: "/images/dummy/khichadi.png", alt: "Detox Green Tea Ingredients" },
    { src: "/images/dummy/khichadi.png", alt: "Detox Green Tea Ingredients" },
    { src: "/images/dummy/khichadi.png", alt: "Detox Green Tea Ingredients" },
    { src: "/images/dummy/khichadi.png", alt: "Detox Green Tea Ingredients" },
    { src: "/images/dummy/khichadi.png", alt: "Detox Green Tea Ingredients" },
    { src: "/images/dummy/khichadi.png", alt: "Detox Green Tea Ingredients" },
  ];

  const [mainApi, setMainApi] = useState();
  const [thumbnailApi, setThumbnailApi] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      <div className="grid gap-4">
        {/* Main Product Image Carousel */}
        <Carousel setApi={setMainApi} className="w-full !h-[660px] relative">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full flex justify-center aspect-square overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="object-cover w-full !h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            56%
          </div>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>

        {/* Thumbnail Carousel */}
        <Carousel setApi={setThumbnailApi} className="w-full">
          <CarouselContent className="-ml-2">
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-1/8 pl-2">
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
                    src={image.src || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover h-[80px]"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div>
        <button className="p-2 border border-[#E5E7EB] rounded-[6px] cursor-pointer">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7203 12.1076C11.8579 12.1076 11.0809 12.48 10.5417 13.0725L5.69105 10.0683C5.82422 9.72786 5.89249 9.36552 5.89235 8.99998C5.89252 8.63444 5.82424 8.2721 5.69105 7.93169L10.5417 4.92735C11.0809 5.5198 11.8579 5.89239 12.7203 5.89239C14.345 5.89239 15.6666 4.57073 15.6666 2.94612C15.6666 1.32152 14.345 0 12.7203 0C11.0958 0 9.77412 1.32166 9.77412 2.94626C9.77405 3.31178 9.84233 3.67409 9.97543 4.01452L5.12496 7.01876C4.58567 6.4263 3.80868 6.05372 2.94626 6.05372C1.32166 6.05372 0 7.37552 0 8.99998C0 10.6245 1.32166 11.9462 2.94626 11.9462C3.80864 11.9462 4.5857 11.5738 5.12496 10.9812L9.97546 13.9854C9.84234 14.3259 9.77405 14.6883 9.77412 15.0538C9.77412 16.6783 11.0957 18 12.7203 18C14.345 18 15.6666 16.6783 15.6666 15.0539C15.6666 13.4292 14.345 12.1076 12.7203 12.1076ZM10.8484 2.94626C10.8484 1.91408 11.6882 1.07434 12.7203 1.07434C13.7525 1.07434 14.5923 1.91408 14.5923 2.94626C14.5923 3.97845 13.7525 4.81819 12.7203 4.81819C11.6882 4.81819 10.8484 3.97841 10.8484 2.94626ZM2.94626 10.8719C1.91394 10.8719 1.0742 10.0321 1.0742 8.99998C1.0742 7.96783 1.91394 7.12806 2.94626 7.12806C3.97845 7.12806 4.81805 7.96783 4.81805 8.99998C4.81805 10.0321 3.97841 10.8719 2.94626 10.8719ZM10.8484 15.0537C10.8484 14.0216 11.6882 13.1818 12.7203 13.1818C13.7525 13.1818 14.5923 14.0216 14.5923 15.0537C14.5923 16.0859 13.7525 16.9256 12.7203 16.9256C11.6882 16.9256 10.8484 16.0859 10.8484 15.0537V15.0537Z"
              fill="#333333"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
