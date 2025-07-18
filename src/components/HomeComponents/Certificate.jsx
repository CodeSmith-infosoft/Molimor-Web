import React from "react";
import Marquee from "react-fast-marquee";

const Certificate = () => {
  const certificates = Array.from(
    { length: 9 },
    (_, i) => `/images/certificate/certificate${i + 1}.svg`
  );

  return (
    <div className="max-w-[1576px] px-10 max-lg:px-5 mx-auto section-top-spacing">
      <h3 className="text-2xl font-medium sub-bottom-spacing text-center">
        Certificate
      </h3>
      <div className="flex max-lg:hidden flex-wrap justify-between items-center">
        {certificates.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Certificate ${index + 1}`}
            className="h-[70px]"
          />
        ))}
      </div>
      <Marquee
        // autoFill={true}
        pauseOnHover={true}
        className="max-lg:!flex !hidden certificate-marquee"
        duration={15000}
      >
        {certificates.map((src, index) => (
          <div key={index} className="ml-[60px]">
            <img
              src={src}
              alt={`Certificate ${index + 1}`}
              className="max-lg:h-[60px] h-[70px]"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Certificate;
