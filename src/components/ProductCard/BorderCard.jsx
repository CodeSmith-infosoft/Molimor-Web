import {
  formatCurrency,
  getPercent,
  isDateNotPast,
  isDateNotPastBoolean,
} from "@/utils";
import StarRating from "../Common/StarRating";
import MainContext from "@/context/MainContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const BorderCard = ({ product }) => {
  const navigate = useNavigate();
  const { language, currency } = useContext(MainContext);
  let isDeal = isDateNotPastBoolean(product.variants);
  return (
    <div
      className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[10px] max-lg:p-[23px] px-5 py-[27px] group cursor-pointer w-full h-full"
      onClick={() => {
        navigate(`/products/${product?._id}`);
      }}
    >
      <div className="max-w-[200px] mx-auto relative">
        <img
          src={product?.mainImage}
          className="w-auto max-lg:max-h-[200px] max-h-[220px] mb-4 group-hover:scale-[1.05] transition-transform duration-300 object-contain ease-in-out"
        />
        <div className="space-y-[12px]">
          <label className="capitalize opacity-50 max-lg:text-xs text-sm block ">
            {product?.category1?.name}
          </label>
          <label className="capitalize font-medium max-lg:text-sm line-clamp-2">
            {product?.title}
          </label>
          <StarRating rating={Number(product?.ratingCount || 5)} />
          <label className="text-lg font-bold">
            {formatCurrency(
              isDateNotPast(product.variants),
              currency,
              language
            )}{" "}
            <span className="max-lg:text-xs text-sm font-medium line-through opacity-30 ml-[10px]">
              {formatCurrency(product.variants[0].mrp, currency, language)}
            </span>
          </label>
        </div>
        {isDeal && (
          <span className="absolute bg-[#DC2626] max-mobile:font-normal rounded-full py-[2.5px] px-2 text-white text-xs font-medium top-0 ">
            {getPercent(product.variants)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default BorderCard;
