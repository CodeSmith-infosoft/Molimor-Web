import { formatCurrency, isDateNotPast } from "@/utils";
import StarRating from "../Common/StarRating";
import MainContext from "@/context/MainContext";
import { useContext } from "react";

const BorderCard = ({ isDeal = false, product }) => {
  const { langauge, currency } = useContext(MainContext);
  return (
    <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[10px] px-5 py-[27px] group cursor-pointer w-full h-full">
      <div className="max-w-[200px] mx-auto relative">
        <img
          src={product?.mainImage}
          className="w-auto h-[220px] mb-4 group-hover:scale-[1.05] transition-transform duration-300 object-contain ease-in-out"
        />
        <div className="space-y-[12px]">
          <label className="capitalize opacity-50 text-sm block ">
            {product?.category1?.name}
          </label>
          <label className="capitalize font-medium line-clamp-2">
            {product?.title}
          </label>
          <StarRating rating={Number(product?.ratingCount || 5)} />
          <label className="text-lg font-bold">
            {formatCurrency(
              isDateNotPast(
                product.variants[0].endSaleOn,
                product.variants[0].discountPrice,
                product.variants[0].price,
                product.variants[0].saleStatus
              ),
              currency,
              langauge
            )}{" "}
            <span className="text-sm font-medium line-through opacity-30 ml-[10px]">
              {formatCurrency(product.variants[0].mrp, currency, langauge)}
            </span>
          </label>
        </div>
        {isDeal && (
          <span className="absolute bg-[#DC2626] rounded-full py-[2.5px] px-2 text-white text-xs font-medium top-0 ">
            51%
          </span>
        )}
      </div>
    </div>
  );
};

export default BorderCard;
