import { useTimer } from "react-timer-hook";

const OfferCountdown = () => {
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  const { hours, seconds, minutes } = useTimer({ expiryTimestamp: tomorrow });
  const format = (num) => String(num).padStart(2, "0");

  return (
    <div className="flex items-center px-[11px] gap-4 py-2 border rounded-md border-[#FFEDD5] bg-[#FFF7ED]">
      <label className="text-[#C2410C] text-[10px] font-bold ">
        Special Offer :
      </label>
      <div className="flex gap-[5px] items-center">
        <div className="border border-[#FED7AA] p-1 text-[10px] text-[#C2410C] bg-[#FFEDD5] rounded-md ">
          {format(hours)}
        </div>
        <span className="">:</span>
        <div className="border border-[#FED7AA] p-1 text-[10px] text-[#C2410C] bg-[#FFEDD5] rounded-md ">
          {format(minutes)}
        </div>
        <span className="">:</span>
        <div className="border border-[#FED7AA] p-1 text-[10px] text-[#C2410C] bg-[#FFEDD5] rounded-md ">
          {format(seconds)}
        </div>
      </div>
    </div>
  );
};

export default OfferCountdown;
