import { useEffect, useState } from "react";
import Banner from "../../components/ProductListComponent/Banner";
import Filter from "../../components/ProductListComponent/Filter";
import ProductList from "../../components/ProductListComponent/ProductList";
import { useSearchParams } from "react-router-dom";

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
    <div className="max-w-[1576px]  px-10 max-lg:px-5 mx-auto">
      <Banner />
      <div className="section-top-spacing flex gap-10">
        <Filter filter={filter} setFilter={setFilter} />
        <ProductList filter={filter} />
      </div>
    </div>
  );
};

export default Products;
