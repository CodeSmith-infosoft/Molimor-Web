import { getPercent, isDateNotPastBoolean } from "@/utils";
import StarRating from "../Common/StarRating";
import { useNavigate } from "react-router-dom";

const FillCard = ({ data }) => {

  const navigate = useNavigate()

  return (
    <div className="bg-[#FFFFFF] rounded-[10px] py-[27px] group cursor-pointer w-full" onClick={() => {
      navigate(`/products/${data._id}`)
    }}>
      <div className="max-w-[200px] mx-auto relative">
        <img
          src="/images/dummy/khichadi.png"
          className="w-auto max-h-[220px] mb-4 group-hover:scale-[1.05] transition-transform duration-300 ease-in-out"
        />
        <div className="space-y-[10px] px-2">
          <label className="capitalize font-medium line-clamp-1">{data.title}</label>
          <StarRating rating={3.5} />
          {isDateNotPastBoolean(data.variants) ? (
            <span className="text-[#2C26DC] text-lg font-semibold">
              Limited time deal
            </span>
          ) : (
            <span className="text-lg font-semibold">{getPercent(data.variants)}% Off</span>
          )}
        </div>
        {isDateNotPastBoolean(data.variants) && (
          <span className="absolute bg-[#DC2626] rounded-full py-[2.5px] px-2 text-white text-xs font-medium top-0 ">
            {getPercent(data.variants)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default FillCard;
