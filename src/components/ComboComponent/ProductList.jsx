import React, { useEffect, useState } from "react";
import BorderCard from "../ProductCard/BorderCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductList = ({ category, data, setFilter }) => {
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
    }
  }, [data, category]);

  const handlePageChange = (pageNumber) => {
    setFilter((prev) => ({ ...prev, page: pageNumber }));
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full h-fit">
      <div className="grid max-lg:gap-[22px] gap-10 max-mobile:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 w-full h-fit">
        {mainData ?.length > 0 ? (
          mainData  .map((product) => (
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
      {data?.totalPages > 1 && (
        <Pagination className="mt-8 justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(data?.page - 1);
                }}
                className={
                  data?.page === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(data?.totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNumber);
                    }}
                    isActive={data?.page === pageNumber}
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
                  handlePageChange(data?.page + 1);
                }}
                className={
                  data?.page === data?.totalPages
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
