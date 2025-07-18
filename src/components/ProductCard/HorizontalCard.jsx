import { formatCurrency, isDateNotPast } from "@/utils";
import OfferCountdown from "../Common/OfferCountdown";
import StarRating from "../Common/StarRating";
import MainContext from "@/context/MainContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const HorizontalCard = ({ data, isOffer = false }) => {
  const { language, currency } = useContext(MainContext);
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#ffff] h-[120px] rounded-[6px] flex items-center group cursor-pointer"
      onClick={() => {
        navigate(`/products/${data._id}`);
      }}
    >
      <img
        src={data.mainImage?.[0] || data.mainImage}
        className="w-[102px] max-h-[120px] rounded-l-[6px] object-contain group-hover:scale-[1.05] transition-transform duration-300 ease-in-out"
      />
      <div className="space-y-[10px] px-3">
        <label className="capitalize text-sm line-clamp-1">{data.title}</label>
        {isOffer ? (
          <OfferCountdown />
        ) : (
          <span className="font-medium block">
            {formatCurrency(isDateNotPast(data.variants), currency, language)}
          </span>
        )}
        <StarRating rating={Number(data.ratingCount)} />
      </div>
    </div>
  );
};

export default HorizontalCard;
