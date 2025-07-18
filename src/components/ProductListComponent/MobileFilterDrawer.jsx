import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const MobileFilterDrawer = ({ setFilter, children, triggerData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const clearAll = () => {
    setFilter({
      category: [],
      minPrice: "",
      maxPrice: "",
      review: "",
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{triggerData}</DrawerTrigger>
      <DrawerContent className="rounded-t-2xl max-h-[95vh]">
        <DrawerHeader className={"flex-row justify-between"}>
          <DrawerTitle className="text-lg font-bold text-[#333333]">
            Filters
          </DrawerTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className={"text-[#333333]"}
          >
            Clear All
          </Button>
        </DrawerHeader>

        {children}

        <DrawerFooter className="flex flex-row gap-3 p-4">
          <Button
            onClick={() => setIsOpen(false)}
            className={"flex-1 bg-green"}
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className={"flex-1 text-[#333333]"}
          >
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilterDrawer;
