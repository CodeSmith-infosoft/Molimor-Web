import { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import MainContext from "@/context/MainContext";
import {
  addCartToLocalstorage,
  deleteWishlistItemFromLocalstorage,
  formatCurrency,
  isDateNotPast,
} from "@/utils";
import useAxios from "@/customHook/fetch-hook";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/MainLoader/Loader";

const ITEMS_PER_PAGE = 5;

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const { data, fetchData, loading } = useAxios({
    method: "GET",
    url: "/wishlist/getWishlist",
  });

  const { fetchData: addToCart } = useAxios({
    method: "POST",
    url: `/cart/addToCart`,
  });

  const { fetchData: removeFromWishlist } = useAxios({
    method: "DELETE",
    url: `/wishlist/removeFromWishlist`,
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [buttonLoader, setButtonLoader] = useState(null);
  useEffect(() => {
    getWishlistData();
  }, []);

  useEffect(() => {
    if (data?.length) {
      setWishlistData(data);
    }
  }, [data]);

  function getWishlistData() {
    if (token) {
      fetchData();
    } else {
      const localCartData = JSON.parse(localStorage.getItem("wishlistData"));
      setWishlistData(localCartData);
    }
  }
  // const [currentPage, setCurrentPage] = useState(1);
  const { language, currency, setCartCount, cartCount } =
    useContext(MainContext);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const getStockStatusStyle = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green border-green";
      case "Out of Stock":
        return "bg-[#DC2626] text-white border-[#DC2626]";
    }
  };

  const AddtoCart = (item) => {
    const payload = {
      productId: item._id,
      quantity: 1,
      weight: item.variants[0]?.weight,
      price: isDateNotPast([item.variants[0]]),
      mrp: item.variants[0]?.mrp,
    };
    if (token) {
      setButtonLoader(item._id);
      addToCart({ data: { items: [{ ...payload }] } })
        .then((res) => {
          if (res.success) {
            getWishlistData();
            setCartCount(cartCount + 1);
          }
        })
        .finally(() => setButtonLoader(""));
    } else {
      addCartToLocalstorage({
        productId: item,
        quantity: 1,
        weight: item.variants[0]?.weight,
        price: isDateNotPast([item.variants[0]]),
        mrp: item.variants[0]?.mrp,
      });
      getWishlistData();
      setCartCount(cartCount + 1);
    }
  };

  const removeWishlist = (id) => {
    if (token) {
      setButtonLoader(id);
      removeFromWishlist({
        url: `/wishlist/removeFromWishlist/${id}`,
      })
        .then((res) => {
          if (res.success) {
            getWishlistData();
            setCartCount(cartCount + 1);
          }
        })
        .finally(() => setButtonLoader(""));
    } else {
      deleteWishlistItemFromLocalstorage(id);
      getWishlistData();
      setCartCount(cartCount + 1);
    }
  };

  return (
    <>
      <section className="py-[70px] max-md:py-[40px] max-mobile:py-[30px] max-lg:py-[50px] bg-[#f3f4f6]">
        <div className="bg-white max-lg:py-[30px] py-[50px]">
          <div className="max-w-[1576px] px-10 max-lg:px-5 mx-auto">
            {loading ? (
              <Loader />
            ) : (
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="">
                      <TableHead className="w-[50%] text-[15px] font-medium">
                        Product
                      </TableHead>
                      <TableHead className="w-[15%] text-[15px] font-medium">
                        Price
                      </TableHead>
                      <TableHead className="w-[10%] text-[15px] font-medium">
                        Stock Status
                      </TableHead>
                      <TableHead className="w-[25%] text-[15px] font-medium text-center">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wishlistData?.length ? (
                      wishlistData?.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="flex max-md:w-[280px] whitespace-break-spaces items-center gap-4 py-4">
                            <Link
                              className="flex items-center"
                              to={`/products/${item?.productId?._id}`}
                            >
                              <img
                                src={
                                  item?.productId?.mainImage[0] ||
                                  item?.productId?.mainImage ||
                                  "/placeholder.svg"
                                }
                                alt={item?.productId?.title}
                                width={60}
                                height={50}
                                className="rounded-md object-cover"
                              />
                              <span className="d line-clamp-1">
                                {item?.productId?.title}
                              </span>
                            </Link>
                          </TableCell>
                          <TableCell className={"text-[15px] font-medium"}>
                            {formatCurrency(
                              isDateNotPast(item?.productId?.variants),
                              currency,
                              language
                            )}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-sm ${getStockStatusStyle(
                                item?.productId?.stock
                                  ? "In Stock"
                                  : "Out of Stock"
                              )} px-2 py-1 text-sm font-medium text-white`}
                            >
                              {item?.productId?.stock
                                ? "In Stock"
                                : "Out of Stock"}
                            </span>
                          </TableCell>
                          <TableCell className="">
                            <div className="flex items-center justify-center gap-2">
                              {!item?.productId?.isCart && (
                                <button
                                  className="bg-green flex gap-2 hover:bg-green-800 cursor-pointer text-white rounded-[43px] px-8 py-[12px]"
                                  size="sm"
                                  disabled={
                                    buttonLoader === item?.productId?._id
                                  }
                                  onClick={() => AddtoCart(item?.productId)}
                                >
                                  {buttonLoader === item?.productId?._id && (
                                    <span className="w-4 h-4 block border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                  )}
                                  Add to Cart
                                </button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full cursor-pointer w-6 h-6"
                                disabled={buttonLoader === item?.productId?._id}
                                onClick={() =>
                                  removeWishlist(item?.productId?._id)
                                }
                              >
                                <svg
                                  width="25"
                                  height="24"
                                  viewBox="0 0 25 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="!w-6 !h-6"
                                >
                                  <g clipPath="url(#clip0_76_208)">
                                    <path
                                      d="M12.1665 23C18.2413 23 23.1665 18.0748 23.1665 12C23.1665 5.92525 18.2413 1 12.1665 1C6.09175 1 1.1665 5.92525 1.1665 12C1.1665 18.0748 6.09175 23 12.1665 23Z"
                                      stroke="#E5E7EB"
                                      strokeMiterlimit="10"
                                    />
                                    <path
                                      d="M16.1665 8L8.1665 16"
                                      stroke="#333333"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M16.1665 16L8.1665 8"
                                      stroke="#333333"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_76_208">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                        transform="translate(0.166504)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="sr-only">Remove item</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <h3 className="text-center pt-8 max-md:text-sm text-xl font-semibold">
                            Your Wishlist Is Empty{" "}
                            <span
                              className="text-green underline cursor-pointer"
                              onClick={() => navigate("/products")}
                            >
                              Go Shopping
                            </span>
                          </h3>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="flex justify-between items-center mt-10">
              <button
                className=" text-sm underline"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>
              {/* <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 text-sm rounded ${
                          currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        Previous
                      </button>
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <button
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-3 py-1 text-sm rounded ${
                            currentPage === index + 1
                              ? "bg-green text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          {index + 1}
                        </button>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 text-sm rounded ${
                          currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        Next
                      </button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
