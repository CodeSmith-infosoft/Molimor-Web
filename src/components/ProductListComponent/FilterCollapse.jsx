import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function FilterCollapse({ data, filter, setFilter }) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-[16px]"
    >
      <CollapsibleTrigger asChild>
        <div className="flex justify-between items-center cursor-pointer">
          <div className="flex justify-between cursor-pointer items-center">
            <label className="flex items-center cursor-pointer gap-2 ">
              <input
                type="checkbox"
                checked={
                  filter.category === data?.categoryName ||
                  data?.subCategories.some(
                    (item) => item._id === filter.subCategory
                  )
                }
                onChange={(e) => {
                  e.stopPropagation();
                  setFilter({
                    category: e.target.checked ? data?.categoryName : "",
                    subCategory: "",
                  });
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="peer hidden"
              />
              <div className="w-[16px] h-[16px] rounded-[4px] border border-[#E5E7EB] flex items-center justify-center peer-checked:bg-[#076536] peer-checked:border-[#076536] transition-colors duration-200">
                <img
                  src={"/images/login/checked.svg"}
                  className="w-[12px] h-[8px]"
                />
              </div>
              <span className="text-[#333333] font-bold">
                {data?.categoryName}
              </span>
            </label>
          </div>
          <span className="text-2xl text-[#636363] leading-[normal] ">
            {isOpen ? "-" : "+"}
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="CollapsibleContent space-y-4">
        {data?.subCategories?.length ? (
          data?.subCategories?.map((sub) => (
            <div className="flex justify-between items-center pl-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filter.subCategory === sub?._id}
                  onChange={(e) => {
                    e.stopPropagation();
                    setFilter({
                      subCategory: e.target.checked ? sub?._id : "",
                      category: "",
                    });
                  }}
                  className="peer hidden"
                />
                <div className="w-[16px] h-[16px] rounded-[4px] border border-[#E5E7EB] flex items-center justify-center peer-checked:bg-[#076536] peer-checked:border-[#076536] transition-colors duration-200">
                  <img
                    src={"/images/login/checked.svg"}
                    className="w-[12px] h-[8px]"
                  />
                </div>
                <span className="text-[#333333] text-sm">{sub?.name}</span>
              </label>
            </div>
          ))
        ) : (
          <></>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
