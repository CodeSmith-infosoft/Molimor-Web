import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex justify-center">
        <Header />
      </div>
      <div className="max-md:mt-[167px] mt-[190px] w-full">{children}</div>
      <div className="max-w-[1440px] mx-auto">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
