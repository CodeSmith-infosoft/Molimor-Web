import { useState, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import BorderCard from "../ProductCard/BorderCard";

const ITEMS_PER_PAGE = 20;

const ProductList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    if (!data?.products?.length) return 0;
    return Math.ceil(data.products.length / ITEMS_PER_PAGE);
  }, [data?.products?.length]);

  const currentProducts = useMemo(() => {
    if (!data?.products) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.products.slice(startIndex, endIndex);
  }, [currentPage, data?.products]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full h-fit">
      <div className="grid max-lg:gap-[22px] gap-10 max-mobile:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 w-full">
        {currentProducts.length ? (
          currentProducts.map((product) => (
            <BorderCard key={product.id} product={product} />
          ))
        ) : (
          <h3 className="max-md:text-base text-2xl col-span-full text-center">
            No Product Found. Try With Different Filter.
          </h3>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
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
