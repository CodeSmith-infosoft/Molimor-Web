import { getPercent, isDateNotPastBoolean } from "@/utils";
import StarRating from "../Common/StarRating";
import { useNavigate } from "react-router-dom";

const FillCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#FFFFFF] h-full rounded-[10px] max-lg:py-5 py-[27px] group cursor-pointer w-full"
      onClick={() => {
        navigate(`/products/${data._id}`);
      }}
    >
      <div className="max-w-[200px] max-lg:max-w-[172px] mx-auto relative">
        <img
          src={data.mainImage}
          className="w-auto max-mobile:h-[150px] mx-auto max-lg:h-[170px] h-[220px] mb-4 group-hover:scale-[1.05] object-contain transition-transform duration-300 ease-in-out"
        />
        <div className="space-y-[10px] max-mobile:px-4 px-2">
          <label className="capitalize font-medium line-clamp-2">
            {data.title}
          </label>
          <StarRating rating={3.5} />
          {isDateNotPastBoolean(data.variants) ? (
            <span className="text-[#2C26DC] max-mobile:text-base text-lg font-semibold">
              Limited time deal
            </span>
          ) : (
            <span className="text-lg font-semibold max-mobile:text-base">
              {getPercent(data.variants)}% Off
            </span>
          )}
        </div>
        {isDateNotPastBoolean(data.variants) && (
          <span className="absolute bg-[#DC2626] max-mobile:left-3 rounded-full py-[2.5px] px-2 text-white text-xs font-medium top-0 ">
            {getPercent(data.variants)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default FillCard;
