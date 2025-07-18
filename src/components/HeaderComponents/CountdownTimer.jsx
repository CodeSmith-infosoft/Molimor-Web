import { useState, useEffect } from "react";

export default function CountdownTimer({
  initialDays = 47,
  initialHours = 6,
  initialMinutes = 55,
  initialSeconds = 51,
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: initialDays,
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          // Timer finished
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-white flex justify-center items-center gap-1">
      <span className="text-xs opacity-70 font-medium">
        Until the end of the sale:
      </span>{" "}
      <span className="text-lg font-bold">{timeLeft.days}</span>{" "}
      <span className="text-[10px] opacity-70">days</span>{" "}
      <span className="text-lg max-mobile:text-base font-bold">
        {String(timeLeft.hours).padStart(2, "0")}
      </span>{" "}
      <span className="text-[10px] opacity-70">hours</span>{" "}
      <span className="text-lg max-mobile:text-base font-bold">
        {String(timeLeft.minutes).padStart(2, "0")}
      </span>{" "}
      <span className="text-[10px] opacity-70">minutes</span>{" "}
      <span className="text-lg max-mobile:text-base font-bold">
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>{" "}
      <span className="text-[10px] opacity-70">sec.</span>
    </div>
  );
}
