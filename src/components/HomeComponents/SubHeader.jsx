import { useNavigate } from "react-router-dom";

const SubHeader = ({ heading, link }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full items-center sub-bottom-spacing">
      <label className="capitalize text-2xl font-medium ">{heading}</label>
      <span className="flex" onClick={() => navigate(link)}>
        View All <img src="/images/common/rightArrow.svg" className="ml-3" />
      </span>
    </div>
  );
};

export default SubHeader;
