import React, { useContext, useState } from "react";
import { formatCurrency } from "@/utils";
import MainContext from "@/context/MainContext";
import { ShoppingCart } from "lucide-react";
import SelectCard from "./SelectCard";
const BuyMore = ({ data = [] }) => {
  const { language, currency } = useContext(MainContext);
  const [selectedProducts, setSelectedProducts] = useState([]);
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
      return total + product?.buyItWithPrice;
    }, 0);
  };
  const calculateSavings = () => {
    return selectedProducts.reduce((total, product) => {
      return (
        total + (product.variants[0].mrp - product?.buyItWithPrice)
      );
    }, 0);
  };
  const handleAddToCart = () => {
    console.log("Adding to cart:", selectedProducts);
  };
  return (
    <>
      {data.length ? (
        <div className="max-mobile:py-[30px] max-md:py-[40px] max-lg:py-[50px] py-[70px]">
          <h4 className="max-mobile:text-lg text-[20px] max-mobile:font-medium font-semibold mb-[26px]">Buy it with</h4>
          <div className="grid max-md:grid-cols-1 grid-cols-5 max-lg:gap-5 gap-6">
            <div className="max-md:col-span-1 col-span-4">
              <div className="grid max-mobile:grid-cols-1 max-md:grid-cols-2 grid-cols-4 gap-5">
                {data?.length ? (
                  data.map((product) => (
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
            <div className="w-full">
              <div className="bg-white rounded-lg sticky top-6">
                <h3 className="max-mobile:text-base text-lg max-mobile:font-medium mb-4">Order Summary</h3>
                {selectedProducts.length === 0 ? (
                  <p className=" text-center py-8">
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
                          <div className="flex-1 max-lg:max-w-[120px]">
                            <h4 className="font-medium text-sm line-clamp-1">
                              {product.title}
                            </h4>
                            <p className="text-xs ">
                              {product.category1?.name}
                            </p>
                          </div>
                          <span className="font-bold text-sm">
                            {formatCurrency(
                              product?.buyItWithPrice,
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
                            {formatCurrency(
                              calculateSavings(),
                              currency,
                              language
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      className="w-full bg-green text-white py-3 rounded-lg max-mobile:text-base font-medium mt-6 cursor-pointer transition-colors flex items-center justify-center space-x-2"
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
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};
export default BuyMore;
