import OfferCountdown from "../Common/OfferCountdown";
import StarRating from "../Common/StarRating";

const HorizontalCard = ({ isOffer = true }) => {
  return (
    <div className="bg-[#ffff] max-h-[120px] rounded-[6px] h-full flex items-center group cursor-pointer">
      <img
        src="/images/dummy/khichadi.png"
        className="w-[102px] h-[120px] object-contain group-hover:scale-[1.05] transition-transform duration-300 ease-in-out"
      />
      <div className="space-y-[10px] pl-3">
        <label className="capitalize text-sm block">classic tea</label>
        {isOffer ? (
          <OfferCountdown />
        ) : (
          <span className="font-medium block">$14.99</span>
        )}
        <StarRating rating={3.5} />
      </div>
    </div>
  );
};

export default HorizontalCard;
