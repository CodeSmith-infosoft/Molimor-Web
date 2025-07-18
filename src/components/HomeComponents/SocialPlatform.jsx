import useAxios from "@/customHook/fetch-hook";
import { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { FaInstagram } from "react-icons/fa";

const SocialPlatform = () => {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/media/getAllInstaShop",
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="max-w-[1576px] px-10 max-lg:px-5 mx-auto section-top-spacing">
      <h3 className="text-2xl font-medium sub-bottom-spacing text-center">
        Social Platform
      </h3>
      <Marquee
        autoFill={true}
        pauseOnHover={true}
        duration={15000}
        className="max-lg:!h-[140px] !h-[200px]"
      >
        {data?.map((item, index) => (
          <div
            className="relative group overflow-hidden ml-[22px]"
            onClick={() =>
              window.open(item.url, "_blank", "noopener,noreferrer")
            }
          >
            <img
              src={item.image}
              loading="lazy"
              width={286}
              alt={`shop-${index}`}
              style={{ borderRadius: "10px" }}
              className="object-contain w-[200px] max-lg:w-[140px] max-md:w-[120px] max-md:h-[120px] max-lg:h-[140px] h-[200px]"
            />
            <div className=" group-hover:opacity-100 text-white absolute top-0 left-0 w-full h-full bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out flex justify-center items-center rounded-[10px] cursor-pointer">
              <FaInstagram size={70} />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default SocialPlatform;
