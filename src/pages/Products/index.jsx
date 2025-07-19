import { useEffect, useRef, useState } from "react";
import Banner from "../../components/ProductListComponent/Banner";
import Filter from "../../components/ProductListComponent/Filter";
import ProductList from "../../components/ProductListComponent/ProductList";
import { useSearchParams } from "react-router-dom";
import useAxios from "@/customHook/fetch-hook";
import { getParamString } from "@/utils";
import Loader from "@/components/MainLoader/Loader";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category") || "";
  const subcategoryIdQuery = searchParams.get("subcategoryId") || "";
  const searchQuery = searchParams.get("search") || "";

  const [filter, setFilter] = useState({
    category: "",
    subcategoryId: "",
    minPrice: "",
    maxPrice: "",
    review: "",
    search: "",
    limit: 30,
  });

  const [data, setData] = useState([]);
  const { fetchData, loading } = useAxios({
    method: "GET",
    url: "",
  });
  const { data: categoryData, fetchData: getActiveSubCategoryList } = useAxios({
    method: "GET",
    url: "/subCategory/getActiveSubCategoryList",
  });

  const requestCounter = useRef(0);

  useEffect(() => {
    getActiveSubCategoryList();
  }, []);

  useEffect(() => {
    const requestId = ++requestCounter.current;
    fetchData({
      url: `/product/getAllProductsList?${getParamString({
        ...filter,
        search: "",
      })}`,
    }).then((res) => {
      if (requestId === requestCounter.current) {
        let result = res.data;
        if (filter.search) {
          result = result.filter((item) =>
            item.name.toLowerCase().includes(filter.search.toLowerCase())
          );
        }

        setData(result);
      }
    });
  }, [filter]);

  useEffect(() => {
    if (categoryQuery || subcategoryIdQuery || searchQuery) {
      let newCategory = null;
      if (categoryQuery.split("-").length > 1) {
        newCategory = categoryQuery.split("-").join(" & ");
      }
      setFilter((prev) => ({
        ...prev,
        category: newCategory || categoryQuery,
        subcategoryId: subcategoryIdQuery,
        search: searchQuery,
      }));
    }
  }, [categoryQuery, subcategoryIdQuery, searchQuery]);

  return (
    <div className="max-w-[1576px] px-10 max-lg:px-5 mx-auto">
      <Banner data={categoryData} filter={filter} />
      <div className="section-top-spacing flex max-md:flex-col max-lg:gap-[22px] gap-10">
        <Filter filter={filter} setFilter={setFilter} data={categoryData} />
        {loading ? <Loader /> : <ProductList data={data} />}
      </div>
    </div>
  );
};

export default Products;
