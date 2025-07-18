import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex justify-center">
        <Header />
      </div>
      <div className="max-md:mt-[240px] mt-[250px] mx-auto w-full">
        {children}
      </div>
      <div className="max-w-[1576px] max-lg:px-5 px-10 mx-auto">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
