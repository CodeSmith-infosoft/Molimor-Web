import Banner from "@/components/HomeComponents/Banner";
import Deals from "@/components/HomeComponents/Deals";
import CategoryProduct from "@/components/HomeComponents/CategoryProduct";
import Popular from "@/components/HomeComponents/Popular";
import BestSeller from "@/components/HomeComponents/BestSeller";
import RecentView from "@/components/HomeComponents/RecentView";
import Certificate from "@/components/HomeComponents/Certificate";
import SocialPlatform from "@/components/HomeComponents/SocialPlatform";
import { useEffect, useState } from "react";
import SkeletonLoader from "@/components/MainLoader/SkeletonLoader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return loading ? (
    <SkeletonLoader />
  ) : (
    <>
      <div className="bg-[#F3F4F6] pb-[32px]">
        <Banner />
        <Deals />
        <CategoryProduct />
        <Popular />
        <BestSeller />
      </div>
      <div className="mt-[38px]">
        <RecentView />
        <Certificate />
        <SocialPlatform />
      </div>
    </>
  );
};

export default Home;
