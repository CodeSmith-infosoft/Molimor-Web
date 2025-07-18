import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

const FooterCollapse = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-[16px]"
    >
      <CollapsibleTrigger asChild>
        <div className="flex justify-between items-center cursor-pointer">
          <h3 className="font-bold">{title}</h3>
          <span className="text-2xl text-[#636363] leading-[normal] ">
            {isOpen ? "-" : "+"}
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="CollapsibleContent">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FooterCollapse;
