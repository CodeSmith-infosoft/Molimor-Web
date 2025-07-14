import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex justify-center">
        <Header />
      </div>
      <div className="mt-[250px] w-full">{children}</div>
      <div className="max-w-[1536px] mx-auto">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
