import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "@/customHook/fetch-hook";
import toast from "react-hot-toast";
import MainContext from "@/context/MainContext";
import {
  deleteCartItemFromLocalstorage,
  editCartItemFromLocalstorage,
  formatCurrency,
} from "@/utils";
import RecentView from "@/components/HomeComponents/RecentView";
import Loader from "@/components/MainLoader/Loader";

const Cart = () => {
  const { setCartCount, currency, language } = useContext(MainContext);
  const token = localStorage.getItem("token");
  const [cartData, setCartData] = useState([]);
  const [buttonLoader, setButtonLoader] = useState(null);
  const navigate = useNavigate();
  const { data, fetchData, loading } = useAxios({
    method: "GET",
    url: "/cart/getUserCart",
  });

  const { fetchData: removeCart } = useAxios({
    method: "DELETE",
    url: `/cart/deleteCartByProductId`,
  });

  const { fetchData: updateCart } = useAxios({
    method: "PUT",
    url: `/cart/updateCartByProductId`,
  });

  useEffect(() => {
    if (data?.length) {
      setCartData(data);
    }
  }, [data]);

  useEffect(() => {
    getCartData();
  }, []);

  function getCartData() {
    if (token) {
      fetchData();
    } else {
      const localCartData = JSON.parse(localStorage.getItem("cartData"));
      setCartData(localCartData);
    }
  }

  const handleIncrement = (weight, quantity, id, price, mrp, productId) => {
    if (token) {
      setButtonLoader(productId._id);
      updateCart({
        data: {
          quantity: quantity + 1,
          weight,
          price,
          mrp,
        },
        url: `/cart/updateCartByProductId/${productId._id}`,
      }).then((res) => {
        setButtonLoader(null);
        if (res.success) {
          getCartData();
        }
      });
    } else {
      editCartItemFromLocalstorage({
        quantity: quantity + 1,
        weight: weight,
        price: price,
        mrp: mrp,
        productId,
      });
      getCartData();
    }
  };

  const handleDecrement = (weight, quantity, id, price, mrp, productId) => {
    if (quantity - 1 === 0) return null;
    if (token) {
      setButtonLoader(productId._id);
      updateCart({
        data: {
          quantity: quantity - 1,
          weight,
          price,
          mrp,
        },
        url: `/cart/updateCartByProductId/${productId._id}`,
      }).then((res) => {
        setButtonLoader(null);
        if (res.success) {
          getCartData();
        }
      });
    } else {
      editCartItemFromLocalstorage({
        quantity: quantity - 1,
        weight: weight,
        price: price,
        mrp: mrp,
        productId,
      });
      getCartData();
    }
  };

  const handleDeleteItem = (itemId) => {
    if (token) {
      removeCart({
        url: `/cart/deleteCartByProductId/${itemId}`,
      }).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        if (res.success) {
          setCartCount((prev) => prev + 1);
          getCartData();
        }
      });
    } else {
      deleteCartItemFromLocalstorage(itemId);
      getCartData();
      setCartCount((prev) => prev + 1);
    }
  };

  const { subTotal, deliveryCharges, totalAmount } = useMemo(() => {
    if (cartData?.length) {
      const calculatedSubTotal = cartData.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      // Example: 20% delivery charges (you can adjust this logic)
      const calculatedDeliveryCharges = calculatedSubTotal * 0.2;
      const calculatedTotalAmount =
        calculatedSubTotal + calculatedDeliveryCharges;

      return {
        subTotal: calculatedSubTotal,
        deliveryCharges: calculatedDeliveryCharges,
        totalAmount: calculatedTotalAmount,
      };
    } else {
      return {
        subTotal: 0,
        deliveryCharges: 0,
        totalAmount: 0,
      };
    }
  }, [cartData]);

  const handleCheckOut = () => {
    if (token) {
      navigate("/order");
    } else {
      toast.error("Please login for product purchase");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="bg-[#f3f4f6] max-mobile:py-[30px] max-md:py-[40px] max-lg:py-[50px] py-[70px]">
        <div className="bg-white max-lg:py-[30px] py-[50px]">
          <div className="max-w-[1576px]  px-10 max-lg:px-5 mx-auto">
            <div className="grid max-md:grid-cols-1 grid-cols-3 max-md:gap-[30px] max-lg:gap-5 gap-[100px]">
              <div className="max-md:order-2">
                <Card className="w-full p-[22px] gap-0 !shadow-none !rounded-[5px] !border-[#E5E7EB]">
                  <CardHeader className="border-b gap-0 px-0">
                    <CardTitle className="text-[20px] mb-[10px] font-bold">
                      Summary
                    </CardTitle>
                    <p className="text-[16px] font-light">Estimate Shipping</p>
                  </CardHeader>
                  <CardContent className="space-y-6 px-0">
                    <div className="space-y-2 pt-4">
                      <div className="flex justify-between mb-4">
                        <span className="text-sm">Sub-Total</span>
                        <span className="text-sm font-medium">
                          {formatCurrency(subTotal, currency, language)}
                        </span>
                      </div>
                      <div className="flex justify-between pb-[20px]">
                        <span className="text-sm">Delivery Charges</span>
                        <span className="text-sm font-medium">
                          {formatCurrency(deliveryCharges, currency, language)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-[20px] border-t border-gray-200 dark:border-gray-700">
                        <span className="text-base font-semibold">
                          Total Amount
                        </span>
                        <span className="text-base font-semibold">
                          {formatCurrency(totalAmount, currency, language)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {loading ? (
                <Loader />
              ) : (
                <div className="max-md:col-span-1 max-md:order-1 col-span-2">
                  <div className="w-full overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[35%] text-[15px] font-medium">
                            Product
                          </TableHead>
                          <TableHead className="w-[15%] text-[15px] font-medium">
                            Price
                          </TableHead>
                          <TableHead className="w-[20%] text-[15px] font-medium">
                            Quantity
                          </TableHead>
                          <TableHead className="w-[15%] text-[15px] font-medium">
                            Total
                          </TableHead>
                          <TableHead className="w-[15%] text-[15px] font-medium text-center">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartData?.length ? (
                          cartData?.map((item) => (
                            <TableRow key={item?._id}>
                              <TableCell className="flex max-lg:max-w-[200px] items-center gap-4 py-4 overflow-hidden">
                                <img
                                  src={item?.productId?.image}
                                  alt={item?.productId?.title}
                                  width={60}
                                  height={50}
                                  className="rounded-md object-cover"
                                />
                                <span className="text-ellipsis line-clamp-1">
                                  {item?.productId?.title}
                                </span>
                              </TableCell>
                              <TableCell className={"text-[15px] font-medium"}>
                                {formatCurrency(
                                  item?.price,
                                  currency,
                                  language
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center w-fit py-[3px] px-1 border border-gray-300 rounded-md">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-[16px] cursor-pointer"
                                    disabled={
                                      buttonLoader === item?.productId?._id
                                    }
                                    onClick={() =>
                                      handleDecrement(
                                        item.weight,
                                        item.quantity,
                                        item._id,
                                        item.price,
                                        item.mrp,
                                        item.productId
                                      )
                                    }
                                  >
                                    -
                                  </Button>
                                  {buttonLoader === item?.productId?._id ? (
                                    <span className="w-4 h-4 block border-2 border-green border-t-transparent rounded-full animate-spin"></span>
                                  ) : (
                                    <span className="w-[20px] text-center text-sm font-semibold">
                                      {item.quantity}
                                    </span>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-[16px] cursor-pointer"
                                    disabled={
                                      buttonLoader === item?.productId?._id
                                    }
                                    onClick={() =>
                                      handleIncrement(
                                        item.weight,
                                        item.quantity,
                                        item._id,
                                        item.price,
                                        item.mrp,
                                        item.productId
                                      )
                                    }
                                  >
                                    +
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell className={"text-[15px] font-medium"}>
                                {formatCurrency(
                                  item?.price * item?.quantity,
                                  currency,
                                  language
                                )}
                              </TableCell>
                              <TableCell className="">
                                <div className="flex items-center justify-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full w-8 cursor-pointer h-8"
                                    onClick={() =>
                                      handleDeleteItem(item?.productId?._id)
                                    }
                                  >
                                    <svg
                                      width="18"
                                      height="22"
                                      viewBox="0 0 18 22"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="!w-[24px] !h-[20px]"
                                    >
                                      {" "}
                                      <g clip-path="url(#clip0_76_2914)">
                                        {" "}
                                        <path
                                          d="M6.80855 9.0357V16.1071C6.80855 16.2217 6.77236 16.3158 6.69997 16.3895C6.62759 16.4632 6.5351 16.5 6.4225 16.5H5.65042C5.53782 16.5 5.44533 16.4632 5.37295 16.3895C5.30056 16.3158 5.26437 16.2217 5.26437 16.1071V9.0357C5.26437 8.92112 5.30056 8.82699 5.37295 8.75333C5.44533 8.67967 5.53782 8.64284 5.65042 8.64284H6.4225C6.5351 8.64284 6.62759 8.67967 6.69997 8.75333C6.77236 8.82699 6.80855 8.92112 6.80855 9.0357ZM9.89691 9.0357V16.1071C9.89691 16.2217 9.86071 16.3158 9.78833 16.3895C9.71595 16.4632 9.62346 16.5 9.51086 16.5H8.73877C8.62618 16.5 8.53369 16.4632 8.4613 16.3895C8.38892 16.3158 8.35273 16.2217 8.35273 16.1071V9.0357C8.35273 8.92112 8.38892 8.82699 8.4613 8.75333C8.53369 8.67967 8.62618 8.64284 8.73877 8.64284H9.51086C9.62346 8.64284 9.71595 8.67967 9.78833 8.75333C9.86071 8.82699 9.89691 8.92112 9.89691 9.0357ZM12.9853 9.0357V16.1071C12.9853 16.2217 12.9491 16.3158 12.8767 16.3895C12.8043 16.4632 12.7118 16.5 12.5992 16.5H11.8271C11.7145 16.5 11.622 16.4632 11.5497 16.3895C11.4773 16.3158 11.4411 16.2217 11.4411 16.1071V9.0357C11.4411 8.92112 11.4773 8.82699 11.5497 8.75333C11.622 8.67967 11.7145 8.64284 11.8271 8.64284H12.5992C12.7118 8.64284 12.8043 8.67967 12.8767 8.75333C12.9491 8.82699 12.9853 8.92112 12.9853 9.0357ZM14.5294 17.9241V6.2857H3.72019V17.9241C3.72019 18.1042 3.74834 18.2699 3.80464 18.4213C3.86094 18.5727 3.91925 18.6832 3.97957 18.7528C4.03989 18.8223 4.08211 18.8571 4.10624 18.8571H14.1434C14.1675 18.8571 14.2097 18.8223 14.2701 18.7528C14.3304 18.6832 14.3887 18.5727 14.445 18.4213C14.5013 18.2699 14.5294 18.1042 14.5294 17.9241ZM6.4225 4.71427H11.8271L11.2481 3.27789C11.1918 3.20423 11.1234 3.15921 11.043 3.14284H7.21872C7.1383 3.15921 7.06993 3.20423 7.01364 3.27789L6.4225 4.71427ZM17.6178 5.10713V5.89284C17.6178 6.00743 17.5816 6.10155 17.5092 6.17521C17.4368 6.24887 17.3443 6.2857 17.2318 6.2857H16.0736V17.9241C16.0736 18.6034 15.8846 19.1906 15.5066 19.6858C15.1286 20.181 14.6742 20.4286 14.1434 20.4286H4.10624C3.57543 20.4286 3.12102 20.1892 2.74302 19.7104C2.36502 19.2316 2.17601 18.6525 2.17601 17.9732V6.2857H1.01788C0.905284 6.2857 0.812794 6.24887 0.740411 6.17521C0.668028 6.10155 0.631836 6.00743 0.631836 5.89284V5.10713C0.631836 4.99255 0.668028 4.89842 0.740411 4.82476C0.812794 4.7511 0.905284 4.71427 1.01788 4.71427H4.74562L5.5901 2.66405C5.71074 2.36122 5.92789 2.10341 6.24155 1.89061C6.55521 1.67781 6.87289 1.57141 7.19459 1.57141H11.055C11.3767 1.57141 11.6944 1.67781 12.0081 1.89061C12.3217 2.10341 12.5389 2.36122 12.6595 2.66405L13.504 4.71427H17.2318C17.3443 4.71427 17.4368 4.7511 17.5092 4.82476C17.5816 4.89842 17.6178 4.99255 17.6178 5.10713Z"
                                          fill="#FF0000"
                                        />{" "}
                                      </g>{" "}
                                      <defs>
                                        {" "}
                                        <clipPath id="clip0_76_2914">
                                          {" "}
                                          <rect
                                            width="17"
                                            height="22"
                                            fill="white"
                                            transform="matrix(1 0 0 -1 0.625 22)"
                                          />{" "}
                                        </clipPath>{" "}
                                      </defs>{" "}
                                    </svg>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5}>
                              <h3 className="text-center pt-8 text-xl font-semibold">
                                Your Cart Is Empty{" "}
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
                  <div className="flex justify-between items-center mt-[30px]">
                    <Link to={"/products"} className=" text-sm underline">
                      Continue Shopping
                    </Link>
                    {cartData?.length ? (
                      <div>
                        <button
                          className="underline cursor-pointer text-[15px] font-medium py-[10px] px-5 bg-green rounded-[5px] text-white"
                          onClick={handleCheckOut}
                        >
                          Check Out
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f3f4f6] max-lg:pb-[50px] pb-[70px]">
        <RecentView title={"Recommendations"} />
      </div>
    </>
  );
};

export default Cart;
