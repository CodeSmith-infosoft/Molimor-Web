import SubHeader from "../../components/HomeComponents/SubHeader";import BorderCard from "../../components/ProductCard/BorderCard";
BorderCard
import FillCard from "../../components/ProductCard/FillCard";
import HorizontalCard from "../../components/ProductCard/HorizontalCard";

const Home = () => {
  // const { data, fetchData } = useAxios({
  //   method: "GET",
  //   url: "/product/getAllProductsList",
  // });

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div className="bg-[#F3F4F6]">
      <SubHeader heading={"Combo"} />
      <HorizontalCard  />
      <BorderCard />
    </div>
  );
};

export default Home;
