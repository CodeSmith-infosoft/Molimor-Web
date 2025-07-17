import OrderProgressBar from "@/components/OrderDetails/OrderProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Using shadcn/ui Card components
import { Link } from "react-router-dom";

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
  ],
};

export default function OrderDetail() {
  const orderStatuses = [
    { name: "Order received", key: "Order received" },
    { name: "Processing", key: "Processing" },
    { name: "On the way", key: "On the way" },
    { name: "Delivered", key: "Delivered" },
  ];

  const currentStatusIndex = orderStatuses.findIndex(
    (status) => status.key === orderData.orderStatus
  );

  return (
    <div className="max-w-[1576px] px-10 py-[70px] mx-auto">
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
                <p className="mb-[13px]">{orderData.billingAddress.name}</p>
                <p>{orderData.billingAddress.street}{" "}{orderData.billingAddress.cityStateZip}</p>
              </div>
              <div>
                <p className="pt-2">Email</p>
                <p>{orderData.billingAddress.email}</p>
              </div>
              <div>
                <p className="pt-2">Phone</p>
                <p>{orderData.billingAddress.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 !rounded-none !shadow-none !px-5 !py-[19px]">
            <CardHeader className={"!px-0"}>
              <CardTitle className="text-base font-semibold text-gray-800">
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm !px-0 text-gray-600 space-y-1">
              <p>{orderData.shippingAddress.name}</p>
              <p>{orderData.shippingAddress.street}</p>
              <p>{orderData.shippingAddress.cityStateZip}</p>
              <p className="pt-2">Email</p>
              <p>{orderData.shippingAddress.email}</p>
              <p className="pt-2">Phone</p>
              <p>{orderData.shippingAddress.phone}</p>
            </CardContent>
          </Card>

          <Card className="col-span-1 !rounded-none !shadow-none !px-5 !py-[19px]">
            <CardHeader className={"!px-0"}>
              <CardTitle className="text-base font-semibold text-gray-800">
                Order ID:{" "}
                <span className="text-gray-900">{orderData.orderId}</span>
              </CardTitle>
              <p className="text-sm text-gray-500">
                Payment Method: {orderData.paymentMethod}
              </p>
            </CardHeader>
            <CardContent className="text-sm !px-0 text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">
                  ${orderData.summary.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="font-medium">
                  {orderData.summary.discount}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">
                  {orderData.summary.shipping}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-green text-lg">
                  ${orderData.summary.total.toFixed(2)}
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
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                <th className="py-3 px-4 rounded-tl-lg">Product</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4 rounded-tr-lg">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orderData.products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="py-4 px-4 flex items-center">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded-md mr-3"
                    />
                    <span className="text-gray-800 font-medium">
                      {product.name}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    x{product.quantity}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    ${product.subtotal.toFixed(2)}
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
