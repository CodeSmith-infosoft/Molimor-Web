import { useEffect, useState } from "react";
import Banner from "../../components/ComboComponent/Banner";
import Filter from "../../components/ComboComponent/Filter";
import ProductList from "../../components/ComboComponent/ProductList";
import { useSearchParams } from "react-router-dom";
import useAxios from "@/customHook/fetch-hook";
import { getParamString } from "@/utils";
import Loader from "@/components/MainLoader/Loader";

const Combo = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category") || "";
  const [filter, setFilter] = useState({
    minPrice: "",
    maxPrice: "",
    review: "",
    limit: 20,
    page: 1,
  });
  const { data, fetchData, loading } = useAxios({
    method: "GET",
    url: `/product/getBigSalesProducts?${getParamString(filter)}`,
  });
  const { data: categoryData, fetchData: getActiveSubCategoryList } = useAxios({
    method: "GET",
    url: "/subCategory/getActiveSubCategoryList",
  });
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getActiveSubCategoryList();
  }, []);

  useEffect(() => {
    if (categoryQuery) {
      setCategory(
        categoryQuery === "Deals"
          ? ["crazyDeal", "dealOfTheDay", "dealOfTheWeek"]
          : [categoryQuery]
      );
    }
  }, [categoryQuery]);

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <div className="max-w-[1616px]  px-10 max-lg:px-5 mx-auto">
      <Banner data={categoryData} />
      <div className="section-top-spacing max-md:flex-col flex max-lg:gap-[22px] gap-10">
        <Filter
          filter={filter}
          setFilter={setFilter}
          categoryFilter={category}
          setCategory={setCategory}
        />
        {loading ? (
          <Loader />
        ) : (
          <ProductList category={category} data={data} setFilter={setFilter} />
        )}
      </div>
    </div>
  );
};

export default Combo;
