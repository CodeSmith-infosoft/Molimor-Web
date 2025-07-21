import React, { useEffect, useMemo, useState } from "react";
import BorderCard from "../ProductCard/BorderCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 1;

const ProductList = ({ category, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    if (data) {
      let result = [];
      Object.keys(data).forEach((key) => {
        if (category.length) {
          if (category.includes(key)) {
            result = [...result, ...data[key]];
          }
        } else {
          result = [...result, ...data[key]];
        }
      });
      setMainData(result);
      setCurrentPage(1);
    }
  }, [data, category]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(mainData.length / ITEMS_PER_PAGE);
  }, [mainData]);

  // Get paginated products
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return mainData.slice(startIndex, endIndex);
  }, [currentPage, mainData]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full h-fit">
      <div className="grid max-lg:gap-[22px] gap-10 max-mobile:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 w-full h-fit">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <BorderCard
              key={product.id || product.slug || product.name}
              product={product}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination className="mt-8 justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNumber);
                    }}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ProductList;
