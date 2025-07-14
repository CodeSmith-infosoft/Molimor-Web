import StarRating from "../Common/StarRating";

const BorderCard = ({ isDeal = false }) => {
  return (
    <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[10px] py-[27px] group cursor-pointer">
      <div className="max-w-[200px] mx-auto relative">
        <img
          src="/images/dummy/khichadi.png"
          className="w-auto h-[220px] mb-4 group-hover:scale-[1.05] transition-transform duration-300 ease-in-out"
        />
        <div className="space-y-[12px]">
          <label className="capitalize opacity-50 text-sm block ">food</label>
          <label className="capitalize font-medium block">masala khichdi</label>
          <StarRating rating={3.5} />
          <label className="text-lg font-bold">₹50.00 <span className="text-sm font-medium line-through opacity-30 ml-[10px]">₹56.23</span></label>
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
