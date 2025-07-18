import { useContext, useEffect, useRef, useState } from "react";
import CountdownTimer from "../HeaderComponents/CountdownTimer";
import Dropdown from "../HeaderComponents/Dropdown";
import CategoriesNavigation from "../HeaderComponents/CategoriesNavigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainContext from "@/context/MainContext";
import useAxios from "@/customHook/fetch-hook";
import { FaList, FaUser } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { IoLogOut } from "react-icons/io5";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const categoryData = [
  {
    label: "Categories",
    img: "/images/header/category_m.svg",
    link: "/products",
  },
  {
    label: "Home & Kitchen",
    img: "/images/header/kitchen_m.svg",
    link: "/products?category=Home-Kitchen",
  },
  {
    label: "Home & Care",
    img: "/images/header/care_m.svg",
    link: "/products?category=Home-Care",
  },
  { label: "Deals", img: "/images/header/deal_m.svg", link: "/deals" },
  {
    label: "Food",
    img: "/images/header/food_m.svg",
    link: "/products?category=Food",
  },
];

export default function Header() {
  // const [language, setLanguage] = useState("English");
  const { currency, setCurrency, cartCount, setCartCount } =
    useContext(MainContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [activeCart, setActiveCart] = useState({
    cart: 0,
    wishlist: 0,
  });
  const { fetchData: getUserCartAndWishListCount } = useAxios({
    method: "GET",
    url: `/cart/getUserCartAndWishListCount`,
  });
  const location = useLocation();
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/products" ||
    location.pathname === "/deals";

  // const languageOptions = ["English", "Spanish", "French", "German", "Italian"];
  const currencyOptions = ["USD", "EUR", "INR"];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const [showCategories, setShowCategories] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Hide categories when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide categories
        setShowCategories(false);
      } else if (currentScrollY < lastScrollY && currentScrollY > 100) {
        // Scrolling up - show categories
        setShowCategories(true);
      }

      // Show categories after user stops scrolling for 2 seconds
      scrollTimeoutRef.current = setTimeout(() => {
        setShowCategories(true);
      }, 2000);

      setLastScrollY(currentScrollY);
    };

    // Only add scroll listener on home pages
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [lastScrollY, isHomePage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // trigger when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  useEffect(() => {
    if (token) {
      getUserCartAndWishListCount().then((res) => {
        const result = res.data;

        setActiveCart({
          cart: result.cart,
          wishlist: result.wishList,
        });
      });
    } else {
      let cartLength =
        JSON.parse(localStorage.getItem("cartData"))?.length || 0;
      let wishlistLength =
        JSON.parse(localStorage.getItem("wishlistData"))?.length || 0;

      setActiveCart({
        cart: cartLength,
        wishlist: wishlistLength,
      });
    }
  }, [cartCount]);

  const handleLogout = () => {
    setCartCount((prev) => prev + 1);
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    navigate("/login");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.length) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const handleSearch = () => {
    if (searchQuery.length) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  return (
    <div className="w-full bg-white fixed z-20 top-0">
      {/* Green countdown banner */}
      <div className="bg-green px-4 max-mobile:py-[5px] py-[9px] text-center">
        <CountdownTimer
          initialDays={47}
          initialHours={6}
          initialMinutes={55}
          initialSeconds={51}
        />
      </div>

      {/* Top navigation bar */}
      <div className="bg-white mt-5 max-md:hidden">
        <div className="max-w-[1576px] max-lg:px-5 px-10 mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-5">
            <Link to={"/profile"} className="text-xs font-medium">
              My Account
            </Link>
            <Link to={"/wishlist"} className="text-xs font-medium">
              Wishlist
            </Link>
            <span className="text-xs border-l pl-5 border-[#E5E7EB]">
              We deliver to you every day from{" "}
              <span className="font-bold">7:00 to 23:00</span>
            </span>
          </div>

          <div className="flex items-center gap-[13px]">
            <Dropdown
              options={currencyOptions}
              defaultValue={currency}
              onChange={setCurrency}
            />
            <Link to={"/recent-order"} className="text-xs font-medium">
              Order Tracking
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mt-5 max-mobile:mt-4">
        <div className="max-w-[1576px] px-10 max-lg:px-5 mx-auto max-lg:gap-6 max-main:gap-10 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/logo.png"
              className="h-[66px] max-mobile:h-[50px] cursor-pointer"
              alt=""
              onClick={() => navigate("/")}
            />
          </div>

          {/* Location */}
          <div className="flex gap-[10px] max-md:hidden items-center text-sm">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.542 0.600046C10.826 0.600046 9.23133 1.03338 7.758 1.90005C6.31933 2.73205 5.17533 3.86738 4.326 5.30605C3.442 6.79671 3 8.40871 3 10.142C3 11.9967 3.63267 13.964 4.898 16.044C5.85133 17.6214 7.12533 19.216 8.72 20.828C9.58667 21.6947 10.5747 22.596 11.684 23.532L11.996 23.792C12.048 23.844 12.126 23.8917 12.23 23.935C12.334 23.9784 12.4423 24 12.555 24C12.6677 24 12.763 23.987 12.841 23.961C12.919 23.935 13.0013 23.8787 13.088 23.792L13.4 23.532C14.5093 22.596 15.4973 21.6947 16.364 20.828C17.9587 19.216 19.2327 17.6214 20.186 16.044C21.4513 13.964 22.084 11.9967 22.084 10.142C22.084 8.40871 21.642 6.79671 20.758 5.30605C19.9087 3.86738 18.7647 2.73205 17.326 1.90005C15.8527 1.03338 14.258 0.600046 12.542 0.600046ZM12.542 21.946C11.6233 21.2007 10.6873 20.3427 9.734 19.372C8.33 17.8987 7.212 16.46 6.38 15.056C5.288 13.236 4.742 11.5634 4.742 10.038C4.742 8.61671 5.09733 7.29938 5.808 6.08605C6.484 4.90738 7.41133 3.98005 8.59 3.30405C9.80333 2.59338 11.1207 2.23805 12.542 2.23805C13.9633 2.23805 15.2807 2.60205 16.494 3.33005C17.6727 4.02338 18.6087 4.96805 19.302 6.16405C19.9953 7.36005 20.342 8.65138 20.342 10.038C20.342 11.6154 19.796 13.314 18.704 15.134C17.872 16.5207 16.754 17.942 15.35 19.398C14.4313 20.334 13.4953 21.1834 12.542 21.946ZM12.542 6.00805C11.7967 6.00805 11.112 6.19438 10.488 6.56705C9.864 6.93971 9.36567 7.44238 8.993 8.07505C8.62033 8.70771 8.434 9.39671 8.434 10.142C8.434 10.8874 8.62033 11.5764 8.993 12.209C9.36567 12.8417 9.864 13.34 10.488 13.704C11.112 14.068 11.7967 14.25 12.542 14.25C13.2873 14.25 13.9763 14.0637 14.609 13.691C15.2417 13.3184 15.74 12.82 16.104 12.196C16.468 11.572 16.65 10.8874 16.65 10.142C16.65 9.39671 16.468 8.70771 16.104 8.07505C15.74 7.44238 15.2417 6.93971 14.609 6.56705C13.9763 6.19438 13.2873 6.00805 12.542 6.00805ZM12.542 12.508C11.8833 12.508 11.32 12.274 10.852 11.806C10.384 11.338 10.15 10.7834 10.15 10.142C10.15 9.70871 10.2583 9.31005 10.475 8.94605C10.6917 8.58205 10.982 8.29171 11.346 8.07505C11.71 7.85838 12.1087 7.75005 12.542 7.75005C12.9753 7.75005 13.374 7.85838 13.738 8.07505C14.102 8.29171 14.3923 8.58205 14.609 8.94605C14.8257 9.31005 14.934 9.70871 14.934 10.142C14.934 10.7834 14.7 11.338 14.232 11.806C13.764 12.274 13.2007 12.508 12.542 12.508Z"
                fill="#333333"
              />
            </svg>

            <div>
              <div className="text-[11px] opacity-70">
                Delivering to Surat 395007
              </div>
              <button className="text-[13px] font-medium">
                Update location
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-lg:max-w-[354px] max-md:hidden max-main:max-w-[700px] max-w-[868px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 text-sm border bg-[#F3F4F6] border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              />
              <button
                className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2"
                onClick={() => handleSearch()}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.1638 22.204L17.0558 18.096C17.7664 17.264 18.3211 16.3237 18.7198 15.275C19.1184 14.2263 19.3178 13.1387 19.3178 12.012C19.3178 10.296 18.8844 8.70134 18.0178 7.228C17.1858 5.78934 16.0504 4.64534 14.6118 3.796C13.1384 2.92934 11.5351 2.496 9.80177 2.496C8.06843 2.496 6.4651 2.92934 4.99177 3.796C3.5531 4.628 2.4091 5.75467 1.55977 7.176C0.693099 8.66667 0.259766 10.2743 0.259766 11.999C0.259766 13.7237 0.693099 15.3227 1.55977 16.796C2.39177 18.2347 3.51843 19.3787 4.93977 20.228C6.43043 21.112 8.04243 21.554 9.77577 21.554C10.9024 21.554 11.9901 21.3547 13.0388 20.956C14.0874 20.5573 15.0278 20.0027 15.8598 19.292L19.9678 23.4C20.0198 23.452 20.0978 23.4997 20.2018 23.543C20.3058 23.5863 20.4098 23.608 20.5138 23.608C20.6178 23.608 20.7218 23.5863 20.8258 23.543C20.9298 23.4997 21.0078 23.452 21.0598 23.4C21.2678 23.192 21.3761 22.984 21.3848 22.776C21.3934 22.568 21.3198 22.3773 21.1638 22.204ZM1.97577 11.908C1.97577 10.4867 2.3311 9.16934 3.04177 7.956C3.7351 6.79467 4.66243 5.86734 5.82377 5.174C7.0371 4.46334 8.35443 4.108 9.77577 4.108C11.1971 4.108 12.5144 4.472 13.7278 5.2C14.9064 5.89334 15.8424 6.838 16.5358 8.034C17.2291 9.23 17.5758 10.53 17.5758 11.934C17.5758 13.338 17.2118 14.6467 16.4838 15.86C15.7904 17.0387 14.8458 17.9747 13.6498 18.668C12.4538 19.3613 11.1624 19.708 9.77577 19.708C8.37177 19.7427 7.05443 19.4047 5.82377 18.694C4.66243 18.018 3.73077 17.0733 3.02877 15.86C2.32677 14.6467 1.97577 13.3293 1.97577 11.908Z"
                    fill="#333333"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Right side icons */}
          <div className="flex flex-col justify-between max-md:h-[66px] max-mobile:h-[50px]">
            <div className="hidden max-md:flex justify-end">
              <Dropdown
                options={currencyOptions}
                defaultValue={currency}
                onChange={setCurrency}
              />
            </div>
            <div className="flex items-center max-mobile:gap-3 max-md:gap-4 gap-6">
              <div
                className="flex items-center max-mobile:gap-0 gap-1 text-sm cursor-pointer relative"
                ref={dropdownRef}
                onClick={() =>
                  token ? setIsOpen(!isOpen) : navigate("/login")
                }
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=" max-mobile:w-[18px] max-mobile:h-[18px]"
                >
                  <path
                    d="M15.454 11.26C14.622 11.7973 13.7207 12.066 12.75 12.066C12.1087 12.066 11.489 11.9403 10.891 11.689C10.293 11.4377 9.76433 11.0867 9.305 10.636C8.84567 10.1853 8.49467 9.661 8.252 9.063C8.00933 8.465 7.888 7.84534 7.888 7.204C7.888 6.19867 8.161 5.28867 8.707 4.474C9.253 3.65933 9.97233 3.06567 10.865 2.693C11.7577 2.32034 12.7067 2.22933 13.712 2.42C14.648 2.59333 15.4713 3.031 16.182 3.733C16.8927 4.435 17.339 5.267 17.521 6.229C17.703 7.191 17.612 8.13133 17.248 9.05C16.884 9.96867 16.286 10.7053 15.454 11.26ZM14.258 4.942C13.8073 4.64734 13.3047 4.5 12.75 4.5C12.022 4.5 11.3807 4.76 10.826 5.28C10.306 5.83467 10.046 6.476 10.046 7.204C10.046 7.75867 10.1977 8.26133 10.501 8.712C10.8043 9.16267 11.2073 9.492 11.71 9.7C12.2127 9.908 12.7327 9.96 13.27 9.856C13.8073 9.752 14.271 9.505 14.661 9.115C15.051 8.725 15.298 8.26133 15.402 7.724C15.506 7.18667 15.454 6.66667 15.246 6.164C15.038 5.66133 14.7087 5.254 14.258 4.942ZM5.86 16.018C6.76133 15.0993 7.81 14.393 9.006 13.899C10.202 13.405 11.45 13.158 12.75 13.158C14.05 13.158 15.298 13.405 16.494 13.899C17.69 14.393 18.743 15.095 19.653 16.005C20.563 16.915 21.265 17.968 21.759 19.164C22.253 20.36 22.5 21.608 22.5 22.908C22.5 23.22 22.3873 23.48 22.162 23.688C21.9367 23.896 21.6853 24 21.408 24H16C15.7053 24 15.4497 23.8917 15.233 23.675C15.0163 23.4583 14.908 23.2027 14.908 22.908C14.908 22.6133 15.0163 22.3577 15.233 22.141C15.4497 21.9243 15.7053 21.816 16 21.816H20.264C20.1253 20.9147 19.8393 20.061 19.406 19.255C18.9727 18.449 18.4093 17.7513 17.716 17.162C17.0227 16.5727 16.2513 16.1177 15.402 15.797C14.5527 15.4763 13.6687 15.316 12.75 15.316C11.8313 15.316 10.9473 15.4763 10.098 15.797C9.24867 16.1177 8.47733 16.5727 7.784 17.162C7.09067 17.7513 6.52733 18.449 6.094 19.255C5.66067 20.061 5.37467 20.9147 5.236 21.816H9.5C9.77733 21.816 10.0373 21.92 10.28 22.128C10.488 22.3707 10.592 22.6307 10.592 22.908C10.592 23.1853 10.488 23.4453 10.28 23.688C10.0373 23.896 9.77733 24 9.5 24H4.092C3.81467 24 3.56333 23.896 3.338 23.688C3.11267 23.48 3 23.22 3 22.908C3 21.608 3.247 20.3643 3.741 19.177C4.235 17.9897 4.94133 16.9367 5.86 16.018Z"
                    fill="#333333"
                  />
                </svg>

                <div className="flex items-center text-sm relative ">
                  <div className="flex flex-col items-center space-x-[10px] max-md:hidden">
                    <div className="text-[11px] opacity-70">
                      {token ? "Profile" : "Sign in"}
                    </div>
                    <div className="text-[13px] font-medium">Account</div>
                  </div>
                  {isOpen && token && (
                    <>
                      <div className="absolute p-2 max-md:top-4 top-full space-y-2 flex flex-col max-md:-left-10 left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                        <Link
                          to={"/profile"}
                          className="flex gap-2 cursor-pointer items-center border-b pb-1"
                        >
                          <FaUser />
                          Profile
                        </Link>
                        <Link
                          to={"/recent-order"}
                          className="flex gap-2 cursor-pointer items-center border-b pb-1"
                        >
                          <FaList size={14} /> Orders
                        </Link>
                        <Link
                          to={"/wishlist"}
                          className="flex gap-2 cursor-pointer items-center border-b pb-1"
                        >
                          <GoHeartFill />
                          Wishlist
                        </Link>
                        <button
                          className="flex gap-2 cursor-pointer items-center"
                          onClick={handleLogout}
                        >
                          <IoLogOut />
                          Log Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="relative">
                <Link to={"/wishlist"}>
                  <svg
                    width="33"
                    height="26"
                    viewBox="0 0 33 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className=" max-mobile:w-[20px] max-mobile:h-[20px]"
                  >
                    <path
                      d="M11.5 5.566C10.72 5.566 9.99633 5.761 9.329 6.151C8.66167 6.541 8.133 7.06967 7.743 7.737C7.353 8.40433 7.158 9.128 7.158 9.908C7.158 11.6933 7.66933 13.392 8.692 15.004C9.524 16.356 10.6853 17.6213 12.176 18.8C13.5107 19.892 15.0447 20.854 16.778 21.686L16.908 21.738C18.6933 20.8887 20.288 19.9007 21.692 18.774L21.64 18.8C23.1307 17.6213 24.292 16.356 25.124 15.004C26.1467 13.392 26.658 11.6933 26.658 9.908C26.658 9.128 26.463 8.40433 26.073 7.737C25.683 7.06967 25.1543 6.541 24.487 6.151C23.8197 5.761 23.096 5.566 22.316 5.566C21.6227 5.566 20.9683 5.71767 20.353 6.021C19.7377 6.32433 19.2177 6.74033 18.793 7.269C18.3683 7.79767 18.0953 8.39133 17.974 9.05C17.922 9.29267 17.7963 9.49633 17.597 9.661C17.3977 9.82567 17.168 9.908 16.908 9.908C16.648 9.908 16.4183 9.82567 16.219 9.661C16.0197 9.49633 15.894 9.29267 15.842 9.05C15.7207 8.39133 15.4477 7.79767 15.023 7.269C14.5983 6.74033 14.0783 6.32433 13.463 6.021C12.8477 5.71767 12.1933 5.566 11.5 5.566ZM16.908 24C16.752 23.9827 16.596 23.948 16.44 23.896C16.3533 23.8613 16.206 23.792 15.998 23.688C14.0913 22.7867 12.3493 21.7033 10.772 20.438L10.824 20.49C9.14267 19.1727 7.81667 17.734 6.846 16.174C5.61533 14.198 5 12.1093 5 9.908C5 8.72933 5.29033 7.64167 5.871 6.645C6.45167 5.64833 7.24033 4.85967 8.237 4.279C9.23367 3.69833 10.3213 3.408 11.5 3.408C12.592 3.408 13.6103 3.655 14.555 4.149C15.4997 4.643 16.284 5.31467 16.908 6.164V6.19C17.532 5.32333 18.3163 4.643 19.261 4.149C20.2057 3.655 21.224 3.408 22.316 3.408C23.4947 3.408 24.5823 3.69833 25.579 4.279C26.5757 4.85967 27.3643 5.64833 27.945 6.645C28.5257 7.64167 28.816 8.72933 28.816 9.908C28.816 12.1093 28.2007 14.198 26.97 16.174C25.9993 17.734 24.6733 19.1727 22.992 20.49C21.4493 21.7033 19.7767 22.752 17.974 23.636L17.818 23.688C17.402 23.896 17.0987 24 16.908 24Z"
                      fill="#333333"
                    />
                  </svg>

                  <span className="absolute max-mobile:-right-1 max-mobile:-top-0.5 -top-2 -right-2 bg-[#DC2626] text-white text-[10px] font-semibold rounded-full max-mobile:text-[8px] max-mobile:w-[10px] max-mobile:h-[10px] w-5 h-5 flex items-center justify-center">
                    {activeCart.wishlist}
                  </span>
                </Link>
              </div>

              <div className="relative">
                <Link to={"/cart"}>
                  <svg
                    width="33"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className=" max-mobile:w-[18px] max-mobile:h-[18px]"
                  >
                    <path
                      d="M22.1822 3.25H1.07016C0.810156 3.28467 0.59349 3.406 0.420156 3.614C0.246823 3.822 0.160156 4.056 0.160156 4.316C0.160156 4.576 0.246823 4.81433 0.420156 5.031C0.59349 5.24767 0.810156 5.37333 1.07016 5.408H5.25616L4.50216 15.002V15.184C4.50216 15.7733 4.71449 16.2803 5.13916 16.705C5.56382 17.1297 6.07082 17.342 6.66016 17.342H19.9462C20.4662 17.342 20.9212 17.1817 21.3112 16.861C21.7012 16.5403 21.9482 16.146 22.0522 15.678L24.2882 5.902C24.3228 5.694 24.3402 5.52933 24.3402 5.408C24.3402 4.80133 24.1322 4.29 23.7162 3.874C23.3002 3.458 22.7888 3.25 22.1822 3.25ZM19.9462 15.158H6.66016L7.41416 5.408H22.1822L19.9462 15.158ZM8.66216 22.75C9.26882 22.75 9.78449 22.5377 10.2092 22.113C10.6338 21.6883 10.8462 21.1727 10.8462 20.566C10.8462 19.9593 10.6338 19.448 10.2092 19.032C9.78449 18.616 9.26882 18.408 8.66216 18.408C8.07282 18.408 7.56582 18.616 7.14116 19.032C6.71649 19.448 6.50416 19.9593 6.50416 20.566C6.50416 21.1727 6.71649 21.6883 7.14116 22.113C7.56582 22.5377 8.07282 22.75 8.66216 22.75ZM18.4122 22.75C19.0188 22.75 19.5345 22.5377 19.9592 22.113C20.3838 21.6883 20.5962 21.1727 20.5962 20.566C20.5962 19.9593 20.3838 19.448 19.9592 19.032C19.5345 18.616 19.0188 18.408 18.4122 18.408C17.8228 18.408 17.3158 18.616 16.8912 19.032C16.4665 19.448 16.2542 19.9593 16.2542 20.566C16.2542 21.1727 16.4665 21.6883 16.8912 22.113C17.3158 22.5377 17.8228 22.75 18.4122 22.75Z"
                      fill="#333333"
                    />
                  </svg>

                  <span className="absolute max-mobile:-right-1 max-mobile:-top-0.5 -top-2 -right-2 bg-[#DC2626] text-white text-[10px] font-semibold rounded-full max-mobile:text-[8px] max-mobile:w-[10px] max-mobile:h-[10px] w-5 h-5 flex items-center justify-center">
                    {activeCart.cart}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CategoriesNavigation />
      <div className=" max-md:block px-5 my-6 max-mobile:my-4 hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 max-mobile:py-[10px] py-3 text-sm border bg-[#F3F4F6] border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
          />
          <button
            className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2"
            onClick={() => handleSearch()}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-mobile:w-[20px] max-mobile:h-[20px]"
            >
              <path
                d="M21.1638 22.204L17.0558 18.096C17.7664 17.264 18.3211 16.3237 18.7198 15.275C19.1184 14.2263 19.3178 13.1387 19.3178 12.012C19.3178 10.296 18.8844 8.70134 18.0178 7.228C17.1858 5.78934 16.0504 4.64534 14.6118 3.796C13.1384 2.92934 11.5351 2.496 9.80177 2.496C8.06843 2.496 6.4651 2.92934 4.99177 3.796C3.5531 4.628 2.4091 5.75467 1.55977 7.176C0.693099 8.66667 0.259766 10.2743 0.259766 11.999C0.259766 13.7237 0.693099 15.3227 1.55977 16.796C2.39177 18.2347 3.51843 19.3787 4.93977 20.228C6.43043 21.112 8.04243 21.554 9.77577 21.554C10.9024 21.554 11.9901 21.3547 13.0388 20.956C14.0874 20.5573 15.0278 20.0027 15.8598 19.292L19.9678 23.4C20.0198 23.452 20.0978 23.4997 20.2018 23.543C20.3058 23.5863 20.4098 23.608 20.5138 23.608C20.6178 23.608 20.7218 23.5863 20.8258 23.543C20.9298 23.4997 21.0078 23.452 21.0598 23.4C21.2678 23.192 21.3761 22.984 21.3848 22.776C21.3934 22.568 21.3198 22.3773 21.1638 22.204ZM1.97577 11.908C1.97577 10.4867 2.3311 9.16934 3.04177 7.956C3.7351 6.79467 4.66243 5.86734 5.82377 5.174C7.0371 4.46334 8.35443 4.108 9.77577 4.108C11.1971 4.108 12.5144 4.472 13.7278 5.2C14.9064 5.89334 15.8424 6.838 16.5358 8.034C17.2291 9.23 17.5758 10.53 17.5758 11.934C17.5758 13.338 17.2118 14.6467 16.4838 15.86C15.7904 17.0387 14.8458 17.9747 13.6498 18.668C12.4538 19.3613 11.1624 19.708 9.77577 19.708C8.37177 19.7427 7.05443 19.4047 5.82377 18.694C4.66243 18.018 3.73077 17.0733 3.02877 15.86C2.32677 14.6467 1.97577 13.3293 1.97577 11.908Z"
                fill="#333333"
              />
            </svg>
          </button>
        </div>
      </div>
      {isHomePage && showCategories && (
        <div
          className="hidden max-md:block mb-4"
          ref={scrollTimeoutRef}
        >
          <Carousel className="w-full relative px-[10px]">
            <CarouselContent className={"max-mobile:gap-8 gap-[10px]"}>
              {categoryData?.map((item, i) => (
                <CarouselItem
                  key={i}
                  className="w-full max-mobile:w-auto max-mobile:shrink-0 flex items-center flex-col"
                  onClick={() => navigate(item.link)}
                >
                  <img src={item.img} alt={item.label} className="h-10 w-10" />
                  <span className="mt-1 whitespace-nowrap text-xs font-semibold">
                    {item.label}
                  </span>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </div>
  );
}
