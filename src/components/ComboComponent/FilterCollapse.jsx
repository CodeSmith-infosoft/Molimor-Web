import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function FilterCollapse({ data, category, setCategory }) {
  const [isOpen, setIsOpen] = React.useState(true);

  function checkArrayMatch(baseArray, other) {
    // Check exact match
    const isExactMatch =
      Array.isArray(other) &&
      other.length === baseArray.length &&
      other.every((val) => baseArray.includes(val)) &&
      baseArray.every((val) => other.includes(val));

    // Check if at least one element matches
    const hasAnyMatch =
      Array.isArray(other) && other.some((val) => baseArray.includes(val));

    return isExactMatch || hasAnyMatch;
  }

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
                checked={checkArrayMatch(data.value, category)}
                onChange={(e) => {
                  e.stopPropagation();
                  setCategory(checkArrayMatch(data.value, category) ? [] :data.value);
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
              <span className="text-[#333333] font-bold">{data?.label}</span>
            </label>
          </div>
          {data?.subItem?.length && (
            <span className="text-2xl text-[#636363] leading-[normal] ">
              {isOpen ? "-" : "+"}
            </span>
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="CollapsibleContent space-y-4">
        {data?.subItem?.length ? (
          data?.subItem?.map((sub) => (
            <div className="flex justify-between items-center pl-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    category?.[0] === sub?.value[0] && category.length === 1
                  }
                  onChange={(e) => {
                    e.stopPropagation();
                    setCategory(
                      category.length === 1 && category[0] === sub?.value[0]
                        ? []
                        : sub?.value
                    );
                  }}
                  className="peer hidden"
                />
                <div className="w-[16px] h-[16px] rounded-[4px] border border-[#E5E7EB] flex items-center justify-center peer-checked:bg-[#076536] peer-checked:border-[#076536] transition-colors duration-200">
                  <img
                    src={"/images/login/checked.svg"}
                    className="w-[12px] h-[8px]"
                  />
                </div>
                <span className="text-[#333333] text-sm">{sub?.label}</span>
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
