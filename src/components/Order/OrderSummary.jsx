const OrderSummary = ({
  cartItems,
  selectedShippingOption,
  handleShippingChange,
  selectedPaymentMethod,
  handlePaymentChange,
  couponCode,
  setCouponCode,
  handleApplyCoupon,
  discountAmount,
}) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = selectedShippingOption === "flatRate" ? 15.0 : 0.0;
  const totalBeforeDiscount = subtotal + shippingCost;
  const finalTotal = totalBeforeDiscount - discountAmount;

  return (
    <div className="bg-white p-6 border border-[#D1D5DB] rounded-lg shadow-sm">
      <h2 className="font-bold text-xl mb-6">Your order</h2>

      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700">Product</span>
        <span className="text-gray-700">Subtotal</span>
      </div>
      {cartItems.map((item) => (
        <div
          key={item.productId}
          className="flex justify-between items-center mb-2"
        >
          <span className="text-gray-900">
            {item.name} × {item.quantity}
          </span>
          <span className="text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}

      <div className="flex justify-between items-center mt-4 mb-2">
        <span className="text-gray-700">Subtotal</span>
        <span className="text-gray-900">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700">Shipping:</span>
        <div className="flex flex-col items-end">
          <label className="flex items-center mb-1 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="flatRate"
              checked={selectedShippingOption === "flatRate"}
              onChange={handleShippingChange}
              className="hidden"
            />
            <span
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 ${
                selectedShippingOption === "flatRate"
                  ? "border-[#166534]"
                  : "border-gray-400"
              }`}
            >
              {selectedShippingOption === "flatRate" && (
                <span className="w-2 h-2 bg-[#166534] rounded-full"></span>
              )}
            </span>
            <span className="text-gray-900">Flat Rate: $15.00</span>
            <span className="w-2 h-2 bg-[#22C55E] rounded-full ml-2"></span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="localPickup"
              checked={selectedShippingOption === "localPickup"}
              onChange={handleShippingChange}
              className="hidden"
            />
            <span
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 ${
                selectedShippingOption === "localPickup"
                  ? "border-[#166534]"
                  : "border-gray-400"
              }`}
            >
              {selectedShippingOption === "localPickup" && (
                <span className="w-2 h-2 bg-[#166534] rounded-full"></span>
              )}
            </span>
            <span className="text-gray-900">Local Pickup</span>
          </label>
        </div>
      </div>

      {discountAmount > 0 && (
        <div className="flex justify-between items-center mb-2 text-[#166534]">
          <span className="text-gray-700">Discount</span>
          <span>-${discountAmount.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between items-center font-bold text-lg border-t pt-4 mt-4">
        <span>Total</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>

      <div className="mt-6">
        <label className="flex items-center mb-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="netBanking"
            checked={selectedPaymentMethod === "netBanking"}
            onChange={handlePaymentChange}
            className="hidden"
          />
          <span
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 ${
              selectedPaymentMethod === "netBanking"
                ? "border-[#166534]"
                : "border-gray-400"
            }`}
          >
            {selectedPaymentMethod === "netBanking" && (
              <span className="w-2 h-2 bg-[#166534] rounded-full"></span>
            )}
          </span>
          <span className="text-gray-900">Net Banking</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="cashOnDelivery"
            checked={selectedPaymentMethod === "cashOnDelivery"}
            onChange={handlePaymentChange}
            className="hidden"
          />
          <span
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 ${
              selectedPaymentMethod === "cashOnDelivery"
                ? "border-[#166534]"
                : "border-gray-400"
            }`}
          >
            {selectedPaymentMethod === "cashOnDelivery" && (
              <span className="w-2 h-2 bg-[#166534] rounded-full"></span>
            )}
          </span>
          <span className="text-gray-900">Cash On Delivery</span>
        </label>
      </div>

      <div className="mt-6">
        <a href="#" className="text-[#10B981] text-sm font-medium">
          Have A Coupon?
        </a>
        <div className="flex mt-2">
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-grow px-4 py-3 rounded-l-lg border border-[#D1D5DB] outline-none text-base"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-[#166534] text-white px-6 py-3 rounded-r-lg font-medium hover:bg-green-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mt-6">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our{" "}
        <a href="#" className="text-[#10B981]">
          privacy policy
        </a>
        .
      </p>

      <label className="flex items-center mt-4 cursor-pointer">
        <input type="checkbox" className="hidden peer" id="terms-checkbox" />
        <span className="w-4 h-4 border border-gray-400 rounded mr-2 flex items-center justify-center peer-checked:bg-[#166534] peer-checked:border-[#166534] transition-colors">
          <svg
            className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </span>
        <span className="text-gray-700 text-sm">
          I have read and agree to the website{" "}
          <a href="#" className="text-[#10B981]">
            terms and conditions
          </a>
        </span>
      </label>

      <button
        type="submit"
        className="w-full bg-[#166534] text-white py-4 rounded-lg mt-6 font-medium text-lg hover:bg-green-700 transition-colors"
      >
        Place order
      </button>
    </div>
  );
};

export default OrderSummary;
