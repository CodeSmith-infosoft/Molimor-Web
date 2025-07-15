import Banner from "../../components/ProductListComponent/Banner";
import Filter from "../../components/ProductListComponent/Filter";
import ProductList from "../../components/ProductListComponent/ProductList";

const Products = () => {
  return (
    <div className="max-w-[1576px] mx-auto px-10">
      <Banner />
      <div className="section-top-spacing flex gap-10">
        <Filter />
        <ProductList />
      </div>
    </div>
  );
};

export default Products;
