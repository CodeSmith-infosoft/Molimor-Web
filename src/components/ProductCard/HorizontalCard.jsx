import { formatCurrency, isDateNotPast } from "@/utils";
import OfferCountdown from "../Common/OfferCountdown";
import StarRating from "../Common/StarRating";
import MainContext from "@/context/MainContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const HorizontalCard = ({
  data,
  isOffer = false,
  imgClass = "",
  className = "",
}) => {
  const { language, currency } = useContext(MainContext);
  const navigate = useNavigate();

  return (
    <div
      className={`bg-[#ffff] overflow-hidden h-[120px] rounded-[6px] flex items-center group cursor-pointer ${className}`}
      onClick={() => {
        navigate(`/products/${data._id}`);
      }}
    >
      <img
        src={data.mainImage}
        className={`w-[102px] max-h-[120px] rounded-l-[6px] object-contain group-hover:scale-[1.05] transition-transform duration-300 ease-in-out ${imgClass}`}
      />
      <div className="space-y-[10px] max-mobile:space-y-[6px] px-3">
        <label className="capitalize text-sm max-mobile:line-clamp-1 line-clamp-1">{data.title}</label>
        {isOffer ? (
          <OfferCountdown />
        ) : (
          <span className="font-medium max-mobile:text-sm block">
            {formatCurrency(isDateNotPast(data.variants), currency, language)}
          </span>
        )}
        <StarRating rating={Number(data.ratingCount)} />
      </div>
    </div>
  );
};

export default HorizontalCard;
