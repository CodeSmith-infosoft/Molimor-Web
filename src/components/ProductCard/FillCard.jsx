import StarRating from "../Common/StarRating";

const FillCard = ({ isDeal = false }) => {
  return (
    <div className="bg-[#FFFFFF] rounded-[10px] py-[27px] group cursor-pointer">
      <div className="max-w-[200px] mx-auto relative">
        <img
          src="/images/dummy/khichadi.png"
          className="w-auto h-[220px] mb-4 group-hover:scale-[1.05] transition-transform duration-300 ease-in-out"
        />
        <div className="space-y-[10px]">
          <label className="capitalize font-medium block">masala khichdi</label>
          <StarRating rating={3.5} />
          {isDeal ? (
            <span className="text-[#2C26DC] text-lg font-semibold">
              Limited time deal
            </span>
          ) : (
            <span className="text-lg font-semibold">20% Off</span>
          )}
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

export default FillCard;
