import { formatCurrency, getPercent, isDateNotPast, isDateNotPastBoolean } from "@/utils";
import StarRating from "../Common/StarRating";
import MainContext from "@/context/MainContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SelectCard = ({ product, isSelected, onSelect }) => {
  const navigate = useNavigate();
  const { language, currency } = useContext(MainContext);
  let isDeal = isDateNotPastBoolean(product.variants);

  const handleClick = (e) => {
    // Check if we're in selection mode
    if (onSelect) {
      e.stopPropagation();
      onSelect();
    } else {
      // Normal navigation
      navigate(`/products/${product?._id}`);
    }
  };

  return (
    <div className="relative">
      <div
        className={`bg-[#FFFFFF] border rounded-[10px] px-5 py-[27px] group cursor-pointer w-full h-full transition-all duration-300 ${
          isSelected 
            ? 'border-green' 
            : 'border-[#E5E7EB] hover:border-gray-300'
        }`}
        onClick={handleClick}
      >
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
                isDateNotPast(product.variants),
                currency,
                language
              )}{" "}
              <span className="text-sm font-medium line-through opacity-30 max-lg:ml-[4px] ml-[10px]">
                {formatCurrency(product.variants[0].mrp, currency, language)}
              </span>
            </label>
          </div>
          {isDeal && (
            <span className="absolute bg-[#DC2626] rounded-full py-[2.5px] px-2 text-white text-xs font-medium top-0 ">
              {getPercent(product.variants)}%
            </span>
          )}
        </div>
      </div>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 bg-green rounded-full p-1">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SelectCard;