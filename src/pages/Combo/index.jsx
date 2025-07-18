import { useEffect, useState } from "react";
import Banner from "../../components/ComboComponent/Banner";
import Filter from "../../components/ComboComponent/Filter";
import ProductList from "../../components/ComboComponent/ProductList";
import { useSearchParams } from "react-router-dom";

const Combo = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category") || "";
  const [filter, setFilter] = useState({
    minPrice: "",
    maxPrice: "",
    review: "",
  });

  const [category, setCategory] = useState([]);
  
  useEffect(() => {
    if (categoryQuery) {

      setCategory(
        categoryQuery === "Deals"
          ? ["crazyDeal", "dealOfTheDay", "dealOfTheWeek"]
          : [categoryQuery]
      );
    }
  }, [categoryQuery]);

  return (
    <div className="max-w-[1576px]  px-10 max-lg:px-5 mx-auto">
      <Banner />
      <div className="section-top-spacing flex max-lg:gap-[22px] gap-10">
        <Filter
          filter={filter}
          setFilter={setFilter}
          categoryFilter={category}
          setCategory={setCategory}
        />
        <ProductList filter={filter} category={category} />
      </div>
    </div>
  );
};

export default Combo;
