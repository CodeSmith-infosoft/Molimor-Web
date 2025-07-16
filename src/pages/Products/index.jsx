import { useState } from "react";
import Banner from "../../components/ProductListComponent/Banner";
import Filter from "../../components/ProductListComponent/Filter";
import ProductList from "../../components/ProductListComponent/ProductList";

const Products = () => {
  const [filter, setFilter] = useState({
    category: "",
    subCategory: "",
  });
  return (
    <div className="max-w-[1576px] mx-auto px-10">
      <Banner />
      <div className="section-top-spacing flex gap-10">
        <Filter filter={filter} setFilter={setFilter} />
        <ProductList filter={filter} />
      </div>
    </div>
  );
};

export default Products;
