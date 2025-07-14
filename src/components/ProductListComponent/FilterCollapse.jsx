import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function FilterCollapse({ data }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center mt-[25px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                //   checked={rememberMe}
                //   onChange={(e) => setRememberMe(e.target.checked)}
                  className="peer hidden"
                />
                <div className="w-[16px] h-[16px] rounded-[4px] border border-[#E5E7EB] flex items-center justify-center peer-checked:bg-[#076536] peer-checked:border-[#076536] transition-colors duration-200">
                  <img src={"/images/login/checked.svg"} className="w-[10px] h-[6px]" />
                </div>
                <span className="text-[#333333] font-bold">{data.categoryName}</span>
              </label>
            </div>
            <span className="text-2xl text-[#636363] ">+</span>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
