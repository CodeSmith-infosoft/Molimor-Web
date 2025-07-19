import { useIsMobile } from "@/customHook/screen-hooks";
import { useTimer } from "react-timer-hook";

const OfferCountdown = () => {
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  const { hours, seconds, minutes } = useTimer({ expiryTimestamp: tomorrow });
  const format = (num) => String(num).padStart(2, "0");
  const laptop = useIsMobile(1024);
  const tablet = useIsMobile(769);

  return (
    <div className="flex items-center px-[11px] max-md:w-[220px] gap-4 max-lg:py-1 max-md:py-2 py-2 border rounded-md border-[#FFEDD5] bg-[#FFF7ED] small-screen-offerBox">
      <label className="text-[#C2410C] text-[10px] font-bold ">
        {laptop && !tablet ? "" : "Special"} Offer :
      </label>
      <div className="flex gap-[5px] items-center">
        <div className="border border-[#FED7AA] max-mobile:p-[3px] leading-[normal] p-1 text-[10px] text-[#C2410C] bg-[#FFEDD5] max-mobile:rounded-[3px] rounded-md ">
          {format(hours)}
        </div>
        <span className="">:</span>
        <div className="border border-[#FED7AA] max-mobile:p-[3px] p-1 leading-[normal] text-[10px] text-[#C2410C] bg-[#FFEDD5] max-mobile:rounded-[3px] rounded-md ">
          {format(minutes)}
        </div>
        <span className="">:</span>
        <div className="border border-[#FED7AA] max-mobile:p-[3px] p-1 leading-[normal] text-[10px] text-[#C2410C] bg-[#FFEDD5] max-mobile:rounded-[3px] rounded-md ">
          {format(seconds)}
        </div>
      </div>
    </div>
  );
};

export default OfferCountdown;
