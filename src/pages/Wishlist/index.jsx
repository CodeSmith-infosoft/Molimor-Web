"use client";

import { useState } from "react";
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
    stockStatus: "In Stock",
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
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = wishlistItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(wishlistItems.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                  {currentItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="flex items-center gap-4 py-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                        <span>{item.name}</span>
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-xs bg-green px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-green">
                          {item.stockStatus}
                        </span>
                      </TableCell>
                      <TableCell className="">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            className="bg-green hover:bg-green-800 text-white rounded-full px-4 py-2"
                            size="sm"
                          >
                            Add to Cart
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full w-8 h-8"
                          >
                            <X className="h-4 w-4" />
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
                              ? "bg-gray-900 text-white"
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
