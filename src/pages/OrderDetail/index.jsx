import OrderProgressBar from "@/components/OrderDetails/OrderProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Using shadcn/ui Card components
import MainContext from "@/context/MainContext";
import useAxios from "@/customHook/fetch-hook";
import { formatCurrency, formatUserAddress } from "@/utils";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const orderData = {
  orderId: "#4152",
  orderDate: "April 24, 2021",
  numProducts: 3,
  paymentMethod: "Paypal",
  billingAddress: {
    name: "Dainne Russell",
    street: "4140 Parker Rd.",
    cityStateZip: "Allentown, New Mexico 31134",
    email: "dainne.ressell@gmail.com",
    phone: "(671) 555-0110",
  },
  shippingAddress: {
    name: "Dainne Russell",
    street: "4140 Parker Rd.",
    cityStateZip: "Allentown, New Mexico 31134",
    email: "dainne.ressell@gmail.com",
    phone: "(671) 555-0110",
  },
  summary: {
    subtotal: 365.0,
    discount: 20, // percentage
    shipping: "Free",
    total: 84.0,
  },
  orderStatus: "Processing", // Can be "Order received", "Processing", "On the way", "Delivered"
  products: [
    {
      id: 1,
      name: "Red Capsicum",
      image: "/images/dummy/khichadi.png",
      price: 14.0,
      quantity: 5,
      subtotal: 70.0,
    },
    {
      id: 2,
      name: "Red Capsicum",
      image: "/images/dummy/khichadi.png",
      price: 14.0,
      quantity: 5,
      subtotal: 70.0,
    },
  ],
};

export default function OrderDetail() {
  const { language, currency } = useContext(MainContext);
  const { id } = useParams();
  const { data: orderList, fetchData: getAllUserOrders } = useAxios({
    method: "GET",
    url: `/order/getOrderById/${id}`,
  });

  useEffect(() => {
    getAllUserOrders();
  }, []);

  const orderStatuses = [
    { name: "Order received", key: "Order received" },
    { name: "Processing", key: "Processing" },
    { name: "On the way", key: "On the way" },
    { name: "Delivered", key: "Delivered" },
  ];

  const currentStatusIndex = orderStatuses.findIndex(
    (status) => status.key === orderList?.status
  );

  return (
    <div className="max-w-[1576px] px-10 max-lg:px-5 py-[70px] mx-auto">
      <div className="border px-[37px]">
        {/* Header */}
        <div className="flex items-center justify-between py-4 px-6 border-b border-gray-200 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-[22px] font-black">Order Details</span>
            <span className="opacity-50">•</span>
            <span className="text-sm opacity-50">{orderData.orderDate}</span>
            <span className="opacity-50">•</span>
            <span className="text-sm opacity-50">
              {orderData.numProducts} Products
            </span>
          </div>
          <Link
            to={"/recent-order"}
            className="text-green hover:underline font-semibold"
          >
            Back to List
          </Link>
        </div>

        {/* Address and Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[50px] my-10">
          <Card className="col-span-1 !rounded-none !shadow-none gap-0 !px-5 !py-[19px]">
            <CardHeader className={"!px-0 border-b !pb-0 gap-0"}>
              <CardTitle className="text-base font-semibold pb-[19px]">
                Billing Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-[14px] !px-0 space-y-6">
              <div>
                <p className="mb-[13px]">
                  {orderList?.fname} {orderList?.lname}
                </p>
                <p>
                  {formatUserAddress(
                    orderList?.streetAddress?.[0],
                    orderList?.streetAddress?.[1],
                    orderList?.city,
                    orderList?.state,
                    orderList?.country,
                    orderList?.pincode
                  )}
                </p>
              </div>
              <div>
                <p className="pt-2">Email</p>
                <p>{orderList?.email}</p>
              </div>
              <div>
                <p className="pt-2">Phone</p>
                <p>{orderList?.mobile}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1 !rounded-none !shadow-none gap-0 !px-5 !py-[19px]">
            <CardHeader className={"!px-0 border-b !pb-0 gap-0"}>
              <CardTitle className="text-base font-semibold pb-[19px]">
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-[14px] !px-0 space-y-6">
              <div>
                <p className="mb-[13px]">
                  {orderList?.fname} {orderList?.lname}
                </p>
                <p>
                  {formatUserAddress(
                    orderList?.shippingAddress?.[0] ||
                      orderList?.streetAddress?.[0],
                    orderList?.shippingAddress?.[1] ||
                      orderList?.streetAddress?.[1],
                    orderList?.shippingCity || orderList?.city,
                    orderList?.shippingState || orderList?.state,
                    orderList?.shippingCountry || orderList?.country,
                    orderList?.shippingPincode || orderList?.pincode
                  )}
                </p>
              </div>
              <div>
                <p className="pt-2">Email</p>
                <p>{orderList?.email}</p>
              </div>
              <div>
                <p className="pt-2">Phone</p>
                <p>{orderList?.mobile}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 !rounded-none !shadow-none gap-0">
            <CardHeader
              className={"border-b !pb-[18px] !px-5 flex justify-between"}
            >
              <CardTitle className="text-base font-normal">
                <span className="opacity-50">Order ID: </span>
                <p className="">#{id}</p>
              </CardTitle>
              <p className="text-sm">
                <span className="opacity-50">Payment Method: </span>
                <p>{orderList?.paymentMethod?.toUpperCase()}</p>
              </p>
            </CardHeader>
            <CardContent className="text-sm pt-[18px]">
              <div className="flex justify-between pb-3 border-b">
                <span className="opacity-50">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(orderList?.totalAmount, currency, language)}
                </span>
              </div>
              {/* <div className="flex justify-between py-3 border-b">
                <span className="opacity-50">Discount</span>
                <span className="font-medium">
                  {orderData.summary.discount}%
                </span>
              </div> */}
              <div className="flex justify-between py-3 border-b">
                <span className="opacity-50">Shipping</span>
                <span className="font-medium">
                  {formatCurrency(
                    orderList?.shippingCharge,
                    currency,
                    language
                  )}
                </span>
              </div>
              <div className="flex justify-between mt-3">
                <span className="">Total</span>
                <span className="font-bold text-green text-[16px]">
                  {formatCurrency(
                    Number(orderList?.shippingCharge) +
                      Number(orderList?.totalAmount),
                    currency,
                    language
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <OrderProgressBar currentStep={currentStatusIndex + 1} />

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium uppercase tracking-wider">
                <th className="py-3 px-4 rounded-tl-lg">Product</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4 rounded-tr-lg">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orderList?.items?.map((product) => (
                <tr key={product._id} className="border-b last:border-b-0">
                  <td className="py-4 px-4 flex items-center">
                    <img
                      src={
                        product.productId.mainImage[0] ||
                        product.productId.mainImage ||
                        "/placeholder.svg"
                      }
                      alt={product.productId.title}
                      className="h-[70px] object-cover rounded-md mr-3"
                    />
                    <span className="line-clamp-1">{product.productId.title}</span>
                  </td>
                  <td className="py-4 px-4">
                    {formatCurrency(
                      product?.price,
                      currency,
                      language
                    )}
                  </td>
                  <td className="py-4 px-4">x{product.quantity}</td>
                  <td className="py-4 px-4">
                    {formatCurrency(
                      product?.price * product.quantity,
                      currency,
                      language
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
