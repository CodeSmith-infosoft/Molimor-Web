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

const ProductList = ({ data, setFilter }) => {
  const handlePageChange = (pageNumber) => {
    setFilter((prev) => ({ ...prev, page: pageNumber }));
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full h-fit">
      <div className="grid max-lg:gap-[22px] gap-10 max-mobile:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 w-full">
        {data?.products?.length ? (
          data?.products.map((product) => (
            <BorderCard key={product.id} product={product} />
          ))
        ) : (
          <h3 className="max-md:text-base text-2xl col-span-full text-center">
            No Product Found. Try With Different Filter.
          </h3>
        )}
      </div>

      {data?.totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(data?.page - 1)}
                className={
                  data?.page === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(data?.totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={data?.page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(data?.page + 1)}
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
