"use client";

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
import { formatCurrency, isDateNotPast } from "@/utils";
import useAxios from "@/customHook/fetch-hook";

const wishlistItems = [
  {
    id: "1",
    image: "/images/dummy/khichadi.png",
    name: "Women's wallet Hand Purse",
    price: "$70",
    stockStatus: "In Stock",
  },
  {
    id: "2",
    image: "/images/dummy/khichadi.png",
    name: "Rose Gold Earring",
    price: "$80",
    stockStatus: "Out of Stock",
  },
  {
    id: "3",
    image: "/images/dummy/khichadi.png",
    name: "Apple",
    price: "$12",
    stockStatus: "In Stock",
  },
  {
    id: "4",
    image: "/images/dummy/khichadi.png",
    name: "Apple",
    price: "$12",
    stockStatus: "In Stock",
  },
  {
    id: "5",
    image: "/images/dummy/khichadi.png",
    name: "Apple",
    price: "$12",
    stockStatus: "In Stock",
  },
  {
    id: "6",
    image: "/images/dummy/khichadi.png",
    name: "Leather Backpack",
    price: "$120",
    stockStatus: "In Stock",
  },
  {
    id: "7",
    image: "/images/dummy/khichadi.png",
    name: "Bluetooth Headphones",
    price: "$99",
    stockStatus: "In Stock",
  },
  {
    id: "8",
    image: "/images/dummy/khichadi.png",
    name: "Smartwatch",
    price: "$150",
    stockStatus: "In Stock",
  },
  {
    id: "9",
    image: "/images/dummy/khichadi.png",
    name: "Coffee Maker",
    price: "$45",
    stockStatus: "In Stock",
  },
  {
    id: "10",
    image: "/images/dummy/khichadi.png",
    name: "Desk Lamp",
    price: "$25",
    stockStatus: "In Stock",
  },
];

const ITEMS_PER_PAGE = 5;

const Wishlist = () => {
  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/wishlist/getWishlist",
  });

  useEffect(() => {
    fetchData();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(wishlistItems.length / ITEMS_PER_PAGE);

  const { language, currency } = useContext(MainContext);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStockStatusStyle = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green border-green";
      case "Out of Stock":
        return "bg-[#DC2626] text-white border-[#DC2626]";
    }
  };

  return (
    <>
      <section className="py-[70px] bg-[#f3f4f6]">
        <div className="bg-white py-[50px]">
          <div className="max-w-[1576px] px-10 mx-auto">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="">
                    <TableHead className="w-[40%] text-[15px] font-medium">
                      Product
                    </TableHead>
                    <TableHead className="w-[20%] text-[15px] font-medium">
                      Price
                    </TableHead>
                    <TableHead className="w-[15%] text-[15px] font-medium">
                      Stock Status
                    </TableHead>
                    <TableHead className="w-[25%] text-[15px] font-medium text-center">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="flex items-center gap-4 py-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={50}
                          className="rounded-md object-cover"
                        />
                        <span>{item.name}</span>
                      </TableCell>
                      <TableCell className={"text-[15px] font-medium"}>
                        {formatCurrency(
                          isDateNotPast(item.variants),
                          currency,
                          language
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-sm ${getStockStatusStyle(
                            item.stockStatus
                          )} px-2 py-1 text-sm font-medium text-white`}
                        >
                          {item.stockStatus}
                        </span>
                      </TableCell>
                      <TableCell className="">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="bg-green hover:bg-green-800 cursor-pointer text-white rounded-[43px] px-8 py-[14px]"
                            size="sm"
                          >
                            Add to Cart
                          </button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full w-8 h-8"
                          >
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_76_208)">
                                <path
                                  d="M12.1665 23C18.2413 23 23.1665 18.0748 23.1665 12C23.1665 5.92525 18.2413 1 12.1665 1C6.09175 1 1.1665 5.92525 1.1665 12C1.1665 18.0748 6.09175 23 12.1665 23Z"
                                  stroke="#E5E7EB"
                                  stroke-miterlimit="10"
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
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between items-center mt-10">
              <a href="#" className=" text-sm">
                Continue Shopping
              </a>
              <div>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
