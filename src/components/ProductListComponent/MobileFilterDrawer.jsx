import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import StarRating from "../Common/StarRating";
import { formatCurrency } from "@/utils";
import MainContext from "@/context/MainContext";
import { useContext } from "react";

const MobileFilterDrawer = ({ filter, setFilter, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, currency } = useContext(MainContext);

  const priceRanges = [
    {
      id: "under-50",
      label: `Under ${formatCurrency(50, currency, language)}`,
      maxPrice: "50",
    },
    {
      id: "50-100",
      label: `${formatCurrency(50, currency, language)} To ${formatCurrency(100, currency, language)}`,
      minPrice: "50",
      maxPrice: "100",
    },
    {
      id: "100-200",
      label: `${formatCurrency(100, currency, language)} To ${formatCurrency(200, currency, language)}`,
      minPrice: "100",
      maxPrice: "200",
    },
    {
      id: "above-200",
      label: `Above ${formatCurrency(200, currency, language)}`,
      minPrice: "200",
    },
  ];

  const starRanges = [
    { count: 5, label: <><StarRating rating={5} /> <span>5.0</span></> },
    { count: 4, label: <><StarRating rating={4} /> <span>4.0 & up</span></> },
    { count: 3, label: <><StarRating rating={3} /> <span>3.0 & up</span></> },
  ];

  const toggleCategory = (categoryName) => {
    setFilter((prev) => {
      const current = prev.category || [];
      const isChecked = current.includes(categoryName);
      return {
        ...prev,
        category: isChecked ? current.filter((item) => item !== categoryName) : [...current, categoryName],
      };
    });
  };

  const selectPrice = (range) => {
    setFilter((prev) => ({
      ...prev,
      minPrice: range.minPrice || "",
      maxPrice: range.maxPrice || "",
    }));
  };

  const selectRating = (count) => {
    setFilter((prev) => ({
      ...prev,
      review: prev.review === count ? "" : count,
    }));
  };

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
      <DrawerTrigger asChild>
        <Button className="w-full max-md:flex hidden">Filter</Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-t-2xl max-h-[95vh]">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-bold">Filters</DrawerTitle>
          <Button variant="ghost" size="sm" onClick={clearAll}>Clear All</Button>
        </DrawerHeader>

        <div className="overflow-auto px-4 pb-4 space-y-6 max-h-[70vh]">
          {/* Category */}
          <div>
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-3">
              {data?.filter((d) => d.categoryName !== "Combo").map((category) => (
                <div key={category._id} className="flex items-center gap-2">
                  <Checkbox
                    checked={filter?.category?.includes(category.categoryName)}
                    onCheckedChange={() => toggleCategory(category.categoryName)}
                  />
                  <span className="text-sm">{category.categoryName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-medium mb-3">Price</h3>
            <div className="space-y-3">
              {priceRanges.map((range) => (
                <div key={range.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={
                      filter.minPrice === range.minPrice && filter.maxPrice === range.maxPrice
                    }
                    onCheckedChange={() => selectPrice(range)}
                  />
                  <span className="text-sm">{range.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-medium mb-3">Rating</h3>
            <div className="space-y-3">
              {starRanges.map((range) => (
                <div key={range.count} className="flex items-center gap-2">
                  <Checkbox
                    checked={filter.review === range.count}
                    onCheckedChange={() => selectRating(range.count)}
                  />
                  <span className="text-sm flex items-center gap-2">{range.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DrawerFooter className="flex flex-col gap-3 p-4">
          <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilterDrawer;
