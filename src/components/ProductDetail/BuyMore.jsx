import useAxios from "@/customHook/fetch-hook";
import React, { useContext, useEffect, useState } from "react";
import { formatCurrency, isDateNotPast } from "@/utils";
import MainContext from "@/context/MainContext";
import { ShoppingCart } from "lucide-react";
import SelectCard from "./SelectCard";

const BuyMore = () => {
  const { language, currency } = useContext(MainContext);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { data, fetchData } = useAxios({
    method: "GET",
    url: "/product/getAllProductsList",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p._id === product._id);
      if (isSelected) {
        return prev.filter((p) => p._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      return total + isDateNotPast(product.variants);
    }, 0);
  };

  const calculateSavings = () => {
    return selectedProducts.reduce((total, product) => {
      return (
        total + (product.variants[0].mrp - isDateNotPast(product.variants))
      );
    }, 0);
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", selectedProducts);
  };

  return (
    <>
      <h4 className="text-[20px] font-semibold mb-[26px]">Buy it with</h4>
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-4">
          <div className="grid grid-cols-4 gap-5">
            {data?.products?.length ? (
              data.products.map((product) => (
                <SelectCard
                  key={product._id}
                  product={product}
                  isSelected={selectedProducts.some(
                    (p) => p._id === product._id
                  )}
                  onSelect={() => handleProductSelect(product)}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-white rounded-lg p-6 sticky top-6 min-w-[280px]">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

            {selectedProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No products selected
              </p>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                  {selectedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {product.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {product.category1?.name}
                        </p>
                      </div>
                      <span className="font-bold text-sm">
                        {formatCurrency(
                          isDateNotPast(product.variants),
                          currency,
                          language
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Price:</span>
                    <span>
                      {formatCurrency(calculateTotal(), currency, language)}
                    </span>
                  </div>
                  {calculateSavings() > 0 && (
                    <div className="flex justify-between text-green font-medium">
                      <span>Savings:</span>
                      <span>
                        {formatCurrency(calculateSavings(), currency, language)}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  className="w-full bg-green text-white py-3 rounded-lg font-medium mt-6 cursor-pointer transition-colors flex items-center justify-center space-x-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add all {selectedProducts.length} to Cart</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyMore;
