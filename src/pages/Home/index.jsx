import Banner from "@/components/HomeComponents/Banner";
import Deals from "@/components/HomeComponents/Deals";
import CategoryProduct from "@/components/HomeComponents/CategoryProduct";
import Popular from "@/components/HomeComponents/Popular";
import BestSeller from "@/components/HomeComponents/BestSeller";

const Home = () => {
  return (
    <>
      <div className="bg-[#F3F4F6] pb-[32px]">
        <Banner />
        <Deals />
        <CategoryProduct />
        <Popular />
        <BestSeller />
      </div>
      <div className=" mt-[38px]">
        
      </div>
    </>
  );
};

export default Home;
