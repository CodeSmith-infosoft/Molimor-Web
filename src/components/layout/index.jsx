import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/products" ||
    location.pathname === "/deals";
  return (
    <>
      <div className="flex justify-center">
        <Header />
      </div>
      <div className={`${!isHomePage && "max-mobile:!mt-[180px] max-md:!mt-[225px] "} max-mobile:mt-[255px] max-md:mt-[302px] mt-[250px] mx-auto w-full`}>
        {children}
      </div>
      <div className="max-w-[1616px] max-lg:px-5 px-10 mx-auto">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
