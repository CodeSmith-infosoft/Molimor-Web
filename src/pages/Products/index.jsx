import { useEffect, useRef, useState } from "react";
import Banner from "../../components/ProductListComponent/Banner";
import Filter from "../../components/ProductListComponent/Filter";
import ProductList from "../../components/ProductListComponent/ProductList";
import { useSearchParams } from "react-router-dom";
import useAxios from "@/customHook/fetch-hook";
import { getParamString } from "@/utils";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category") || "";
  const subcategoryIdQuery = searchParams.get("subcategoryId") || "";
  const [filter, setFilter] = useState({
    category: "",
    subcategoryId: "",
    minPrice: "",
    maxPrice: "",
    review: "",
  });
  const [data, setData] = useState([]);
  const { fetchData } = useAxios({
    method: "GET",
    url: "", // we'll pass url dynamically
  });

  const requestCounter = useRef(0);

  useEffect(() => {
    const requestId = ++requestCounter.current;
    fetchData({
      url: `/product/getAllProductsList?${getParamString(filter)}`,
    }).then((res) => {
      if (requestId === requestCounter.current) {
        setData(res.data);
      }
    });
  }, [filter]);

  useEffect(() => {
    if (categoryQuery || subcategoryIdQuery) {
      let newCategory = null;
      if (categoryQuery.split("-").length > 1) {
        newCategory = categoryQuery.split("-").join(" & ");
      }
      setFilter({
        ...filter,
        category: newCategory || categoryQuery,
        subcategoryId: subcategoryIdQuery,
      });
    }
  }, [categoryQuery, subcategoryIdQuery]);

  return (
    <div className="max-w-[1576px] mx-auto px-10">
      <Banner />
      <div className="section-top-spacing flex gap-10">
        <Filter filter={filter} setFilter={setFilter} />
        <ProductList data={data} />
      </div>
    </div>
  );
};

export default Products;
