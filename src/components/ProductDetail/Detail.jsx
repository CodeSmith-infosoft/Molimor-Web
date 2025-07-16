import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { useTimer } from "react-timer-hook";
import {
  addCartToLocalstorage,
  addWishlistToLocalstorage,
  formatCurrency,
  isDateNotPast,
  isDateNotPastBoolean,
} from "@/utils";
import MainContext from "@/context/MainContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxios from "@/customHook/fetch-hook";
import ProductImageSlider from "./ProductImageSlider";

export default function Detail({ data, getProduct }) {
  const { language, currency, setCartCount, cartCount } =
    useContext(MainContext);
  const productData = {
    title:
      "MOLIMOR Detox Green Tea for Weight Loss, Immunity & Metabolism Boost – 30 Tea Bags per Box (Pack of 3)",
    rating: 4.5,
    originalPrice: 1.99,
    specialPrice: 0.89,
    countdown: { hours: 16, minutes: 6, seconds: 50 }, // Static for now, can be dynamic later
    weights: ["250Gm", "500Gm", "1Kg"],
    keyBenefits: [
      "100% Pure Gound nut",
      "28 GM PROTEIN",
      "rich in vitamin B",
      "Healthy & Tasty",
      "Aids Weight loss",
      "Energy booster",
    ],
    paymentInfo:
      "Payment upon receipt of goods, Payment by card in the department, Google Pay, Online card, -5% discount in case of payment",
    warrantyInfo:
      "The Consumer Protection Act does not provide for the return of this product of proper quality.",
  };
  const navigate = useNavigate();
  const { fetchData: addToCart } = useAxios({
    method: "POST",
    url: `/cart/addToCart`,
  });

  const { fetchData: addWishlist } = useAxios({
    method: "POST",
    url: `/wishlist/addWishlist`,
  });

  const { fetchData: removeFromWishlist } = useAxios({
    method: "DELETE",
    url: `/wishlist/removeFromWishlist/${data?._id}`,
  });

  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  const { hours, seconds, minutes } = useTimer({ expiryTimestamp: tomorrow });
  const format = (num) => String(num).padStart(2, "0");
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(null); // Default to the first weight
  const token = localStorage.getItem("token");
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

  useEffect(() => {
    if (data?.variants.length) {
      setSelectedWeight(data?.variants[0]);
    }
  }, [data]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (data?._id) {
      if (token) {
        const paylaod = {
          productId: data._id,
          quantity: quantity,
          weight: selectedWeight.weight,
          price: isDateNotPast([selectedWeight]),
          mrp: selectedWeight.mrp,
        };
        addToCart({ data: { items: [{ ...paylaod }] } }).then((res) => {
          const toast2 = res.success ? toast.success : toast.error;
          toast2(res.message);
          if (res.success) {
            setCartCount(cartCount + 1);
          }
        });
      } else {
        addCartToLocalstorage({
          quantity: quantity,
          weight: data.weight,
          price: isDateNotPast(
            data?.endSaleOn,
            data?.discountPrice,
            data?.price,
            data?.saleStatus
          ),
          mrp: data.mrp,
          productId: data,
        });
        setCartCount(cartCount + 1);
      }
    }
  };

  const handleAddToWishlist = () => {
    if (data?._id) {
      if (token) {
        const action = data.isWishList ? removeFromWishlist : addWishlist;
        action({ data: { productId: data?._id } }).then((res) => {
          const toast2 = res.success ? toast.success : toast.error;
          toast2(res.status === 401 ? "Please Login!" : res.message);
          if (res.status === 401) {
            navigate("/login");
          }
          if (res.success) {
            setCartCount(cartCount + 1);
          }
          getProduct();
        });
      } else {
        addWishlistToLocalstorage({ productId: data });
        setCartCount(cartCount + 1);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-[100px]">
      <ProductImageSlider data={data} selectedWeight={selectedWeight} />
      <div className="">
        <div className="bg-white">
          <h1 className="text-[22px] font-medium text-gray-800 mb-[14px]">
            {data?.title}
          </h1>
          <div className="flex items-center pb-[14px] border-b mb-[14px]">
            <span className="text-xs font-semibold py-[6px] px-[7px] rounded-sm mr-[10px] border-[0.5px]">
              {data?.ratingCount}
            </span>
            <div className="flex items-center space-x-0.5">
              {/* Render stars based on rating */}
              {[...Array(Number(5))].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(Number(data?.ratingCount || 5))
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mb-[14px]">
            <p className="text-sm font-bold mb-4">Special Price:-</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-semibold mr-[6px]">
                {formatCurrency(
                  isDateNotPast([selectedWeight]),
                  currency,
                  language
                )}
              </span>
              <span className="text-lg line-through">
                {formatCurrency(selectedWeight?.mrp, currency, language)}
              </span>
            </div>
          </div>

          {isDateNotPastBoolean(data?.variants) && (
            <div className="flex items-center px-[16px] py-[14px] gap-4 border mb-[14px] rounded-md border-[#FFEDD5] bg-[#FFF7ED]">
              <label className="text-[#C2410C] text-[13px] font-bold ">
                Special Offer :
              </label>
              <div className="flex gap-[5px] items-center">
                <div className="border border-[#FED7AA] font-semibold p-[9px] rounded-[6px] text-[13px] text-[#C2410C] bg-[#FFEDD5]  ">
                  {format(hours)}
                </div>
                <span className="">:</span>
                <div className="border border-[#FED7AA] font-semibold p-[9px] rounded-[6px] text-[13px] text-[#C2410C] bg-[#FFEDD5]   ">
                  {format(minutes)}
                </div>
                <span className="">:</span>
                <div className="border border-[#FED7AA] font-semibold p-[9px] rounded-[6px] text-[13px] text-[#C2410C] bg-[#FFEDD5]  ">
                  {format(seconds)}
                </div>
              </div>
              <span className="text-[11px]">
                Remains until the end of the offer.
              </span>
            </div>
          )}

          <div className="mb-[14px]">
            <p className="text-sm font-bold mb-4">Weight:-</p>
            <div className="flex space-x-4">
              {data?.variants?.map((weight) => (
                <Button
                  key={weight.weight}
                  variant={
                    selectedWeight?.weight === weight.weight
                      ? "default"
                      : "outline"
                  }
                  className={
                    selectedWeight?.weight === weight.weight
                      ? "bg-green text-white hover:bg-green rounded-[6px]"
                      : "text-gray-700 border-0 rounded-[6px]"
                  }
                  onClick={() => setSelectedWeight(weight)}
                >
                  {weight.weight}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-[14px]">
            <p className="text-sm font-semibold mb-4">Key Benefits:-</p>
            <div className="  text-gray-700">
              <ul className="list-disc list-inside space-y-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                {data?.isFeatured?.map((benefit, index) => (
                  <li key={`benefit1-${index * 2}`}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-[14px]">
            <div className="flex items-center py-[7px] px-[14px] border border-gray-300 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="text-xl "
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </Button>
              <span className="px-4 font-bold">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-xl"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </Button>
            </div>
            <button
              className=" bg-green cursor-pointer py-[14px] px-[30px] flex hover:bg-green text-white rounded-md"
              onClick={handleAddToCart}
            >
              <div className="mt-[2px] mr-2">
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.0305 2.10646C6.61065 2.10646 6.22112 2.21146 5.86192 2.42146C5.50271 2.63146 5.21815 2.91612 5.00822 3.27546C4.7983 3.63479 4.69334 4.02446 4.69334 4.44446H3.50376C3.50376 3.80979 3.66004 3.22412 3.97259 2.68746C4.28515 2.15079 4.70966 1.72612 5.24614 1.41346C5.78261 1.10079 6.36807 0.944458 7.00251 0.944458C7.63695 0.944458 8.2224 1.10079 8.75888 1.41346C9.29535 1.72612 9.71987 2.15079 10.0324 2.68746C10.345 3.22412 10.5013 3.80979 10.5013 4.44446H12.7964C13.1323 4.44446 13.4169 4.56346 13.6501 4.80146C13.8834 5.03946 14 5.33112 14 5.67646C14 5.75112 13.9953 5.82112 13.986 5.88646L12.6845 13.4185C12.6098 13.8571 12.4046 14.2211 12.0687 14.5105C11.7328 14.7998 11.3456 14.9445 10.9071 14.9445H3.09791C2.6594 14.9445 2.2722 14.7998 1.93632 14.5105C1.60045 14.2211 1.39519 13.8571 1.32055 13.4185L0.0190121 5.90046C-0.0369679 5.56446 0.0306745 5.25646 0.221939 4.97646C0.413204 4.69646 0.672111 4.52379 0.998661 4.45846C1.06397 4.44912 1.13395 4.44446 1.20859 4.44446H9.36766C9.36766 4.02446 9.2627 3.63479 9.05277 3.27546C8.84285 2.91612 8.55828 2.63146 8.19908 2.42146C7.83988 2.21146 7.45035 2.10646 7.0305 2.10646ZM12.7964 5.60646H1.20859C1.19926 5.60646 1.18526 5.62512 1.1666 5.66246V5.69046L2.46813 13.2225C2.49612 13.3718 2.56143 13.4978 2.66406 13.6005C2.76669 13.7031 2.88798 13.7591 3.02793 13.7685L3.09791 13.7825H10.9071C11.0471 13.7825 11.1753 13.7381 11.292 13.6495C11.4086 13.5608 11.4856 13.4418 11.5229 13.2925L12.8384 5.67646C12.8384 5.63912 12.8291 5.62046 12.8104 5.62046L12.7964 5.60646Z"
                    fill="white"
                  />
                </svg>
              </div>
              Add to cart
            </button>
            <button
              className=" h-[52px] w-[52px] flex justify-center items-center border-[1.3px] cursor-pointer border-[#E5E7EB] rounded-[6.62px] bg-transparent"
              onClick={handleAddToWishlist}
            >
              {data?.isWishList ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                  className={`!w-[19px] !h-[16px]`}
                >
                  <path
                    d="M13.8524 0.944458C12.9613 0.957742 12.0897 1.19615 11.3255 1.6356C10.5612 2.07505 9.93157 2.69999 9.5 3.4473C9.06843 2.69999 8.43875 2.07505 7.67455 1.6356C6.91035 1.19615 6.03869 0.957742 5.14759 0.944458C3.72707 1.00361 2.38872 1.59918 1.42492 2.60106C0.461119 3.60294 -0.0497832 4.92968 0.00383099 6.29144C0.00383099 9.74005 3.79122 13.5064 6.96769 16.0601C7.67691 16.6313 8.57361 16.9445 9.5 16.9445C10.4264 16.9445 11.3231 16.6313 12.0323 16.0601C15.2088 13.5064 18.9962 9.74005 18.9962 6.29144C19.0498 4.92968 18.5389 3.60294 17.5751 2.60106C16.6113 1.59918 15.2729 1.00361 13.8524 0.944458Z"
                    fill="#fb2c36"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 20 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`!w-[19px] !h-[16px]`}
                >
                  <path
                    d="M14.3675 0.944458C13.4391 0.944458 12.5846 1.16668 11.804 1.61112C11.0233 2.05557 10.422 2.66163 10 3.42931C9.57802 2.66163 8.9767 2.05557 8.19605 1.61112C7.41539 1.16668 6.55033 0.954558 5.60088 0.974761C4.65143 0.994963 3.77583 1.24749 2.97407 1.73234C2.17232 2.21719 1.5499 2.86365 1.10682 3.67173C0.663746 4.47981 0.463306 5.3485 0.505504 6.27779C0.505504 7.85355 1.26506 9.59092 2.78418 11.4899C3.96572 12.9445 5.52704 14.4596 7.46813 16.0354C8.1855 16.6414 9.02945 16.9445 10 16.9445C10.9705 16.9445 11.8145 16.6414 12.5319 16.0354C14.473 14.4596 16.0343 12.9445 17.2158 11.4899C18.7349 9.59092 19.4945 7.85355 19.4945 6.27779C19.5367 5.3485 19.3363 4.47981 18.8932 3.67173C18.4501 2.86365 17.8277 2.21719 17.0259 1.73234C16.2242 1.24749 15.338 0.984861 14.3675 0.944458ZM11.5191 14.8839C11.0971 15.2475 10.5908 15.4293 10 15.4293C9.40923 15.4293 8.90286 15.2475 8.48088 14.8839C6.45539 13.2677 4.88352 11.702 3.76528 10.1869C2.64704 8.67173 2.08792 7.3687 2.08792 6.27779C2.04572 5.63133 2.18286 5.02527 2.49935 4.45961C2.81583 3.89395 3.24836 3.42931 3.79693 3.06567C4.3455 2.70203 4.95737 2.52022 5.63253 2.52022C6.3077 2.52022 6.93011 2.70203 7.49978 3.06567C8.06945 3.42931 8.50198 3.89395 8.79736 4.45961C9.09275 5.02527 9.24044 5.63133 9.24044 6.27779C9.24044 6.47981 9.31429 6.66163 9.46198 6.82325C9.60967 6.98486 9.78901 7.06567 10 7.06567C10.211 7.06567 10.3903 6.98486 10.538 6.82325C10.6857 6.66163 10.7807 6.47981 10.8229 6.27779C10.7807 5.63133 10.9073 5.02527 11.2026 4.45961C11.498 3.89395 11.9305 3.42931 12.5002 3.06567C13.0699 2.70203 13.6923 2.52022 14.3675 2.52022C15.0426 2.52022 15.6545 2.70203 16.2031 3.06567C16.7516 3.42931 17.1842 3.89395 17.5007 4.45961C17.8171 5.02527 17.9543 5.63133 17.9121 6.27779C17.9121 7.3687 17.353 8.67173 16.2347 10.1869C15.1165 11.702 13.5446 13.2677 11.5191 14.8839Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="space-y-4 mb-[14px]">
            <div className="flex items-center gap-[31px] mb-0 p-[15px] border border-[#E5E7EB]">
              <svg
                width="22"
                height="17"
                viewBox="0 0 22 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="!w-[22px] !h-[16px]"
              >
                <path
                  d="M19.14 0.222229H2.86C2.35481 0.222229 1.88222 0.346068 1.44222 0.593746C1.00222 0.841425 0.651852 1.17992 0.391111 1.60923C0.13037 2.03854 0 2.50912 0 3.02099V13.3244C0 13.8363 0.126296 14.3151 0.378889 14.7609C0.631481 15.2067 0.973704 15.5618 1.40556 15.8259C1.83741 16.0901 2.32222 16.2222 2.86 16.2222H19.14C19.6452 16.2222 20.1178 16.0943 20.5578 15.8383C20.9978 15.5824 21.3481 15.2356 21.6089 14.7981C21.8696 14.3605 22 13.8693 22 13.3244V3.02099C22 2.50912 21.8696 2.03854 21.6089 1.60923C21.3481 1.17992 20.9978 0.841425 20.5578 0.593746C20.1178 0.346068 19.6452 0.222229 19.14 0.222229ZM2.86 1.7826H19.14C19.4985 1.7826 19.7919 1.90644 20.02 2.15412C20.2481 2.4018 20.3622 2.69075 20.3622 3.02099V5.27486H1.63778V3.02099C1.63778 2.65773 1.75185 2.36052 1.98 2.12935C2.20815 1.89818 2.50148 1.7826 2.86 1.7826ZM19.14 14.6619H2.86C2.51778 14.6619 2.22852 14.5339 1.99222 14.278C1.75593 14.022 1.63778 13.7372 1.63778 13.4235V7.03337H20.4844V13.3244C20.4193 13.7042 20.2685 14.022 20.0322 14.278C19.7959 14.5339 19.4985 14.6619 19.14 14.6619Z"
                  fill="#333333"
                />
              </svg>

              <div>
                <p className="font-bold text-sm inline text-gray-800">
                  Payment.{" "}
                </p>
                <p className="text-sm inline text-gray-600">
                  {productData.paymentInfo}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[31px] p-[15px] border border-t-0 border-[#E5E7EB]">
              <svg
                width="18"
                height="23"
                viewBox="0 0 18 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6146 3.3546L9.38787 0.295645C9.14082 0.197758 8.96788 0.197758 8.86906 0.295645L0.617623 3.3546C0.419984 3.40354 0.267637 3.49735 0.160582 3.63602C0.0535273 3.77469 0 3.91745 0 4.06428V11.21C0 13.0372 0.642328 14.8318 1.92698 16.5938C2.89871 17.8826 4.17513 19.1143 5.75625 20.289C6.59621 20.9089 7.51029 21.4881 8.49849 22.0265L8.64672 22.1243C8.72907 22.1896 8.83612 22.2222 8.96788 22.2222C9.09964 22.2222 9.19846 22.1896 9.26434 22.1243L9.38787 22.0509C10.3267 21.5452 11.216 20.9823 12.056 20.3624C13.6701 19.1877 14.9629 17.9479 15.9347 16.6427C17.2523 14.8644 17.9111 13.0535 17.9111 11.21V4.06428C18.0099 3.91745 18.0264 3.77469 17.9605 3.63602C17.8946 3.49735 17.7793 3.40354 17.6146 3.3546ZM16.4782 11.21C16.4782 12.6783 15.9429 14.1466 14.8724 15.6149C14.0489 16.7243 12.9536 17.7929 11.5866 18.8207C10.7137 19.4732 9.84079 20.0279 8.96788 20.4847C8.12792 20.0443 7.25501 19.4896 6.34916 18.8207C5.0151 17.7929 3.94455 16.7243 3.13752 15.6149C2.08345 14.1466 1.55641 12.6783 1.55641 11.21V4.57818L9.0667 1.83736L16.4782 4.57818V11.21ZM6.49739 10.6961C6.33269 10.5493 6.14329 10.4758 5.92918 10.4758C5.71507 10.4758 5.52567 10.5493 5.36097 10.6961C5.19627 10.8429 5.11803 11.0265 5.12627 11.2467C5.1345 11.4669 5.21274 11.6586 5.36097 11.8218L7.41147 13.8529C7.59264 13.9998 7.76558 14.0732 7.93028 14.0732C8.0291 14.0732 8.12792 14.0487 8.22674 13.9998C8.32556 13.9508 8.39967 13.9019 8.44908 13.8529L12.5748 9.79064C12.723 9.62749 12.7971 9.4358 12.7971 9.21556C12.7971 8.99531 12.723 8.81177 12.5748 8.66494C12.4266 8.51811 12.2372 8.44062 12.0066 8.43246C11.776 8.42431 11.5866 8.5018 11.4384 8.66494L8.0291 12.1154L6.49739 10.6961Z"
                  fill="#333333"
                />
              </svg>

              <div>
                <p className="font-bold text-sm inline text-gray-800">
                  Warranty.{" "}
                </p>
                <p className="text-sm inline text-gray-600">
                  {productData.warrantyInfo}
                </p>
              </div>
            </div>
          </div>

          <div
            className="flex items-center text-sm text-gray-700 hover:text-gray-900 cursor-pointer relative"
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
              <span className="text-[16px] font-semibold">
                Share this Product
              </span>
            </div>
            {isOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[160px]">
                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                  className="flex gap-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md"
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
                  className="flex gap-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                  className="flex gap-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <img src={"/images/footer/x.png"} className="h-4" alt="" />{" "}
                  Share on Twitter
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied to clipboard!");
                  }}
                  className="flex gap-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 last:rounded-b-md"
                >
                  <img src={"/images/footer/link.svg"} className="h-4" alt="" />{" "}
                  Copy Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
