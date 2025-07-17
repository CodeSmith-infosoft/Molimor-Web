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
  handleSubmit,
}) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = selectedShippingOption === "flatRate" ? 15.0 : 0.0;
  const totalBeforeDiscount = subtotal + shippingCost;
  const finalTotal = totalBeforeDiscount - discountAmount;

  return (
    <div className="bg-white p-[30px] border border-[#E5E7EB] rounded-lg">
      <h2 className="font-semibold text-xl mb-5">Your order</h2>

      <div className="flex justify-between items-center mb-[14px]">
        <span className=" text-sm font-medium">Product</span>
        <span className=" text-sm font-medium">Subtotal</span>
      </div>
      {cartItems.map((item) => (
        <div
          key={item.productId}
          className="flex justify-between items-center mb-[14px]"
        >
          <span className="text-sm max-w-[150px]">
            {item.name} <span className="font-bold">× {item.quantity}</span>
          </span>
          <span className="text-sm">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}

      <div className="flex justify-between items-center mb-[14px]">
        <span className="text-sm font-medium">Subtotal</span>
        <span className="text-sm">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between items-center mb-[14px]">
        <span className="text-sm font-medium">Shipping:</span>
        <div className="flex flex-col items-end">
          <label className="flex items-center mb-1 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="flatRate"
              checked={selectedShippingOption === "flatRate"}
              onChange={handleShippingChange}
              className="hidden text-sm font-medium"
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
            <span className="text-sm font-medium">Flat Rate: $15.00</span>
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
            <span className="text-sm font-medium">Local Pickup</span>
          </label>
        </div>
      </div>

      {discountAmount > 0 && (
        <div className="flex justify-between items-center mb-[14px] text-[#166534]">
          <span className="text-gray-700">Discount</span>
          <span>-${discountAmount.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between items-center font-bold text-lg border-t pt-[14px]">
        <span className="text-sm font-medium">Total</span>
        <span className="text-sm font-bold">${finalTotal.toFixed(2)}</span>
      </div>

      <div className="mt-5">
        <label className="flex items-center mb-5 cursor-pointer">
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
          <span className="text-sm font-semibold">Net Banking</span>
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
          <span className="text-sm font-semibold">Cash On Delivery</span>
        </label>
      </div>

      <div className="mt-5">
        <a href="#" className="text-[#076536] underline text-sm font-bold">
          Have A Coupon?
        </a>
        <div className="flex w-full mt-[14px]">
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className=" px-4 py-[6px] w-full rounded-l-[5px] border border-[#D1D5DB] outline-none text-sm"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-[#166534] text-white text-sm font-bold px-6 py-[6px] rounded-r-[5px] hover:bg-green-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <p className=" text-sm mt-5">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our{" "}
        <a href="#" className="text-[#076536]">
          privacy policy
        </a>
        .
      </p>

      <label className="flex items-center gap-2 mt-5 cursor-pointer">
        <input type="checkbox" className="peer hidden" />
        <div className="w-4 shrink-0 h-4 rounded-[2.5px] border border-[#333333] flex items-center justify-center peer-checked:bg-[#076536] peer-checked:border-[#076536] transition-colors duration-200">
          <img src={"/images/login/checked.svg"} className="w-3 h-3" />
        </div>
        <span className="text-sm">
          I have read and agree to the website{" "}
          <a href="#" className="text-[#076536]">
            terms and conditions
          </a>
        </span>
      </label>

      <button
        type="submit"
        className="w-full bg-[#076536] text-white py-3 rounded-[8px] mt-6 font-bold text-sm hover:bg-green-700 transition-colors"
        onClick={handleSubmit}
      >
        Place order
      </button>
    </div>
  );
};

export default OrderSummary;
