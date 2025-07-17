import { useNavigate } from "react-router-dom";

const SubHeader = ({ heading, link }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full items-center sub-bottom-spacing">
      <label className="capitalize max-lg:text-[20px] text-2xl font-medium ">{heading}</label>
      <span className="flex max-lg:font-normal font-bold max-lg:text-sm text-xl cursor-pointer" onClick={() => navigate(link)}>
        View All <img src="/images/common/rightArrow.svg" className="ml-3" />
      </span>
    </div>
  );
};

export default SubHeader;
