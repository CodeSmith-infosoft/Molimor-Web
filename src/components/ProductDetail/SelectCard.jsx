import {
  formatCurrency,
  getPercent,
  isDateNotPastBoolean,
} from "@/utils";
import StarRating from "../Common/StarRating";
import MainContext from "@/context/MainContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const SelectCard = ({ product, isSelected, onSelect }) => {
  const navigate = useNavigate();
  const { language, currency } = useContext(MainContext);
  let isDeal = isDateNotPastBoolean(product.variants);

  const handleClick = (e) => {
    if (onSelect) {
      e.stopPropagation();
      onSelect();
    } else {
      navigate(`/products/${product?._id}`);
    }
  };

  return (
    <div className="relative">
      <div
        className={`
          bg-white border relative rounded-[10px] group cursor-pointer w-full h-full transition-all duration-300
          ${
            isSelected
              ? "border-green"
              : "border-[#E5E7EB] hover:border-gray-300"
          } flex flex-col px-5 py-[27px] gap-0
          max-md:flex-row max-md:items-center max-md:gap-4 max-md:px-4 max-md:py-3
        `}
        onClick={handleClick}
      >
        <div
          className={`
            w-5 h-5 border rounded-sm max-md:flex items-center justify-center shrink-0
            ${isSelected ? "bg-green border-green" : "border-gray-300"}
            hidden
          `}
        >
          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
        </div>

        <div
          className={`
            w-auto max-lg:h-[150px] h-[220px] mb-4 max-w-[200px] mx-auto relative
            max-md:w-20 max-md:h-20 max-md:shrink-0
          `}
        >
          <img
            src={
              product?.mainImage
            }
            alt={product?.title}
            className={`
              w-full h-full object-contain transition-transform duration-300 ease-in-out
              group-hover:scale-[1.05]
            `}
          />
        </div>

        <div
          className={`
            space-y-[12px]
            max-md:flex-1 max-md:space-y-1
          `}
        >
          <label className="capitalize opacity-50 max-mobile:text-xs text-sm block">
            {product?.category1?.name}
          </label>
          <Link
            to={`/products/${product?._id}`}
            className="capitalize font-medium line-clamp-2 text-base"
          >
            {product?.title}
          </Link>
          <StarRating rating={Number(product?.ratingCount || 5)} />
          <label className="max-md:text-base text-lg font-bold">
            {formatCurrency(
              product?.buyItWithPrice,
              currency,
              language
            )}{" "}
            <span className="text-sm font-medium line-through opacity-30 max-lg:ml-1 ml-[10px]">
              {formatCurrency(product.variants[0].mrp, currency, language)}
            </span>
          </label>
        </div>

        {/* Deal Badge */}
        {isDeal && (
          <span
            className={`
              absolute bg-[#DC2626] rounded-full py-[2.5px] px-2 text-white max-mobile:text-[10px] text-xs font-medium
              top-2 left-7 -translate-x-1/2 w-fit
            `}
          >
            {getPercent(product.variants)}%
          </span>
        )}
      </div>

      {isSelected && (
        <div
          className={`
            absolute top-3 right-3 bg-green rounded-full p-1
            max-md:hidden
            block
          `}
        >
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SelectCard;
