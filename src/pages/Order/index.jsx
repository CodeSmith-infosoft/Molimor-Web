import AddressFormSection from "@/components/Order/AddressFormSection";
import InputGroup from "@/components/Order/InputGroup";
import OrderSummary from "@/components/Order/OrderSummary";
import { useState } from "react";

export default function Order() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "United States (US)",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "California",
    zipCode: "",
    createAccount: false,
    shipToDifferentAddress: false,
    orderNotes: "",
    shippingCountry: "United States (US)",
    shippingStreetAddress: "",
    shippingApartment: "",
    shippingCity: "",
    shippingState: "California",
    shippingZipCode: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedShippingOption, setSelectedShippingOption] =
    useState("flatRate");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("netBanking");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [cartItems] = useState([
    {
      productId: "682310b79d75afdbd4f743ed",
      name: "Marketside Fresh Organic Bananas, Bunch",
      quantity: 1,
      price: 0.89,
    },
    {
      productId: "some-other-product-id",
      name: "Organic Avocados, 3 ct",
      quantity: 2,
      price: 3.5,
    },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleShippingChange = (e) => {
    setSelectedShippingOption(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const discount = subtotal * 0.1;
      setDiscountAmount(discount);
      setAppliedCoupon({
        id: "6841233b2bf972387e584102",
        discountValue: discount,
      });
      alert(
        `Coupon "${couponCode}" applied! You got $${discount.toFixed(2)} off.`
      );
    } else if (couponCode === "FREESHIP") {
      setDiscountAmount(0);
      setAppliedCoupon({ id: "freeship-coupon-id", discountValue: 0 });
      setSelectedShippingOption("localPickup");
      alert(
        `Coupon "${couponCode}" applied! Shipping set to Local Pickup (Free).`
      );
    } else {
      setDiscountAmount(0);
      setAppliedCoupon(null);
      alert("Invalid coupon code.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Place order button clicked! Initiating form submission...");
    const newErrors = {};

    const validateField = (fieldName, value, errorMessage) => {
      if (!value || (typeof value === "string" && value.trim() === "")) {
        newErrors[fieldName] = errorMessage;
      }
    };

    // --- Validate Billing Details ---
    validateField("firstName", formData.firstName, "First name is required");
    validateField("lastName", formData.lastName, "Last name is required");

    validateField("phone", formData.phone, "Phone number is required");
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    validateField("email", formData.email, "Email address is required");
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    validateField("country", formData.country, "Country is required");
    validateField(
      "streetAddress",
      formData.streetAddress,
      "Street address is required"
    );
    validateField("city", formData.city, "Town / City is required");
    validateField("state", formData.state, "State is required");

    validateField("zipCode", formData.zipCode, "ZIP Code is required");
    if (formData.zipCode && !/^\d{5,10}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP Code (5-10 digits)";
    }
    // --- End Billing Details Validation ---

    // Validate Shipping Details if "Ship to a different address?" is checked
    if (formData.shipToDifferentAddress) {
      validateField(
        "shippingCountry",
        formData.shippingCountry,
        "Shipping country is required"
      );
      validateField(
        "shippingStreetAddress",
        formData.shippingStreetAddress,
        "Shipping street address is required"
      );
      validateField(
        "shippingCity",
        formData.shippingCity,
        "Shipping town / city is required"
      );
      validateField(
        "shippingState",
        formData.shippingState,
        "Shipping state is required"
      );
      validateField(
        "shippingZipCode",
        formData.shippingZipCode,
        "Shipping ZIP Code is required"
      );
      if (
        formData.shippingZipCode &&
        !/^\d{5,10}$/.test(formData.shippingZipCode)
      ) {
        newErrors.shippingZipCode =
          "Please enter a valid shipping ZIP Code (5-10 digits)";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const submissionData = {
        fname: formData.firstName,
        lname: formData.lastName,
        cartItems: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        ...(appliedCoupon && { couponId: appliedCoupon.id }),
        paymentMethod:
          selectedPaymentMethod === "netBanking" ? "ccavenue" : "cod",
        streetAddress: [formData.streetAddress, formData.apartment].filter(
          Boolean
        ),
        country: formData.country,
        state: formData.state,
        pincode: formData.zipCode,
        ...(formData.shipToDifferentAddress && {
          shippingAddress: [
            formData.shippingStreetAddress,
            formData.shippingApartment,
          ].filter(Boolean),
          shippingCountry: formData.shippingCountry,
          shippingState: formData.shippingState,
          shippingPincode: formData.shippingZipCode,
        }),
        shippingCharge:
          selectedShippingOption === "flatRate" ? "15.00" : "free",
        mobile: formData.phone,
        email: formData.email,
        ...(formData.orderNotes && { orderNote: formData.orderNotes }),
      };
      console.log("Submitting data:", submissionData);
      alert("Order placed! Check console for submission data.");
    } else {
      alert("Please correct the errors in the form before placing the order.");
    }
  };

  return (
    <div className="bg-[#f3f4f6] py-[70px]">
      <div className="bg-white py-[50px]">
        <div className="max-w-[1576px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[100px]">
            <div className="lg:col-span-2">
              <h1 className="font-bold text-xl mb-6">Billing details</h1>
              <form onSubmit={handleSubmit}>
                <AddressFormSection
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                  includeContactFields={true}
                />

                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="createAccount"
                      checked={formData.createAccount}
                      onChange={handleChange}
                      className="hidden peer"
                      id="create-account-checkbox"
                    />
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
                      Create an account?
                    </span>
                  </label>
                </div>

                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="shipToDifferentAddress"
                      checked={formData.shipToDifferentAddress}
                      onChange={handleChange}
                      className="hidden peer"
                      id="ship-to-different-address-checkbox"
                    />
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
                      Ship to a different address?
                    </span>
                  </label>
                </div>

                {formData.shipToDifferentAddress && (
                  <div className="mt-8 pt-8 border-t border-[#D1D5DB]">
                    <AddressFormSection
                      formData={formData}
                      handleChange={handleChange}
                      errors={errors}
                      title="Shipping details"
                      prefix="shipping"
                      includeContactFields={false}
                    />
                  </div>
                )}

                <div className="mt-8">
                  <InputGroup
                    label="Order notes (optional)"
                    type="textarea"
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleChange}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                  />
                </div>
              </form>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
                selectedShippingOption={selectedShippingOption}
                handleShippingChange={handleShippingChange}
                selectedPaymentMethod={selectedPaymentMethod}
                handlePaymentChange={handlePaymentChange}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                handleApplyCoupon={handleApplyCoupon}
                discountAmount={discountAmount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
