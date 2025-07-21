import Loader from "@/components/MainLoader/Loader";
import AddressFormSection from "@/components/Order/AddressFormSection";
import InputGroup from "@/components/Order/InputGroup";
import OrderSummary from "@/components/Order/OrderSummary";
import MainContext from "@/context/MainContext";
import useAxios from "@/customHook/fetch-hook";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    shipToDifferentAddress: false,
    orderNotes: "",
    shippingCountry: "",
    shippingStreetAddress: "",
    shippingApartment: "",
    shippingCity: "",
    shippingState: "",
    shippingZipCode: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [cartData, setCartData] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] =
    useState("flatRate");
  const { setCartCount } = useContext(MainContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("cashOnDelivery");
  const [isCouponActive, setIsCouponActive] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [loader, setLoader] = useState(false);
  const token = localStorage.getItem("token");
  const { fetchData: placeOrder } = useAxios({
    method: "POST",
    url: `/order/placeOrder`,
  });
  const { data: couponData, fetchData: validateCoupon } = useAxios({
    method: "POST",
    url: `/coupon/validateCoupon`,
  });
  const { data, fetchData: getUserCart } = useAxios({
    method: "GET",
    url: "/cart/getUserCart",
  });
  const { fetchData: updateProfile } = useAxios({
    method: "PUT",
    url: "/user/updateProfile",
  });

  const {
    data: userData,
    fetchData: getProfile,
    loading,
  } = useAxios({
    method: "GET",
    url: "/user/profile",
  });

  useEffect(() => {
    if (data?.length) {
      setCartData(data);
    }
  }, [data]);

  useEffect(() => {
    getProfile();
    getCartData();
  }, []);

  useEffect(() => {
    if (userData?.isActive) {
      setFormData((prev) => ({
        ...prev,
        city: userData?.city || "",
        country: userData?.country || "",
        email: userData?.email || "",
        firstName: userData?.fname || "",
        lastName: userData?.fname || "",
        phone: userData?.mobile || "",
        zipCode: userData?.pincode || "",
        state: userData?.state || "",
        streetAddress: userData?.streetAddress?.[0] || "",
        apartment: userData?.streetAddress?.[1] || "",
      }));
    }
  }, [userData]);

  function getCartData() {
    if (token) {
      getUserCart();
    } else {
      const localCartData = JSON.parse(localStorage.getItem("cartData"));
      setCartData(localCartData);
    }
  }

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

  const handleSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    const payload = {
      code: couponCode.toUpperCase(),
      item: cartData.reduce((acc, cur) => {
        let obj = {
          price: Number(cur.price),
          productId: cur.productId._id,
        };

        return [...acc, obj];
      }, []),
    };
    validateCoupon({ data: payload }).then((res) => {
      if (res.success) {
        const couponData = res.data.find((d) => d.isCoupon);
        if (!couponData) return;
        const updatedCart = cartData.map((cart) => {
          const product = { ...cart.productId };
          const productPrice = Number(cart.price);

          if (productPrice >= couponData.minPurchase) {
            product.discountValue = String(couponData.discountValue);
            product.discountType = couponData.discountType;
            product.newPrice =
              couponData.discountType === "percentage"
                ? productPrice - productPrice * (couponData.discountValue / 100)
                : productPrice - couponData.discountValue;

            cart.price =
              couponData.discountType === "percentage"
                ? productPrice - productPrice * (couponData.discountValue / 100)
                : productPrice - couponData.discountValue;
          }

          return { ...cart, productId: product };
        });
        setCartData(updatedCart);
        setIsCouponActive(true);
      } else {
        setIsCouponActive(false);
      }
    });
  };

  const removeCoupon = () => {
    setIsCouponActive(false);
    setCouponCode("");
    getCartData();
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
      setLoader(true);
      const submissionData = {
        fname: formData.firstName,
        lname: formData.lastName,
        cartItems: cartData.map((cart) => {
          const item = {
            productId: cart.productId._id,
            quantity: cart.quantity,
            price: Number(cart.price),
          };

          if (isCouponActive) {
            item.discountType = cart.productId.discountType;
            item.discountValue = cart.productId.discountValue;
          }
          return item;
        }),
        paymentMethod:
          selectedPaymentMethod === "netBanking" ? "ccavenue" : "cod",
        streetAddress: [formData.streetAddress, formData.apartment].filter(
          Boolean
        ),
        country: formData.country,
        state: formData.state,
        city: formData.city,
        pincode: Number(formData.zipCode),
        ...(formData.shipToDifferentAddress && {
          shippingAddress: [
            formData.shippingStreetAddress,
            formData.shippingApartment,
          ].filter(Boolean),
          shippingCountry: formData.shippingCountry,
          shippingState: formData.shippingState,
          shippingPincode: formData.shippingZipCode,
          shippingCity: formData.shippingCity,
        }),
        shippingCharge:
          selectedShippingOption === "flatRate" ? "15.00" : "free",
        mobile: formData.phone,
        email: formData.email,
        ...(formData.orderNotes && { orderNote: formData.orderNotes }),
      };
      if (isCouponActive) {
        submissionData.couponId = couponData?.[0]?._id;
      }

      placeOrder({ data: submissionData })
        .then((res) => {
          if (res.success) {
            setTimeout(() => {
              setCartCount((prev) => prev + 1);
            }, 3000);
            navigate("/products");
          }
        })
        .finally(() => {
          setLoader(false);
        });
      const payloadData = new FormData();
      payloadData.append("streetAddress[0]", formData.streetAddress);
      payloadData.append("streetAddress[1]", formData.apartment);
      payloadData.append("pincode", formData.zipCode);
      payloadData.append("state", formData.state);
      payloadData.append("country", formData.country);
      payloadData.append("city", formData.city);
      updateProfile({ data: payloadData });
    }
  };

  return (
    <div className="bg-[#f3f4f6] max-mobile:py-[30px] max-md:py-[40px] max-lg:py-[50px] py-[70px]">
      <div className="bg-white max-lg:py-[30px] py-[50px]">
        <div className="max-w-[1576px]  px-10 max-lg:px-5 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 max-md:gap-[0px] max-lg:gap-[20px] gap-[100px]">
            <div className="lg:col-span-2">
              <h1 className="max-lg:text-[15px] font-bold max-lg:mb-5 mb-6">
                Billing details
              </h1>
              {loading ? (
                <Loader />
              ) : (
                <form>
                  <AddressFormSection
                    formData={formData}
                    handleChange={handleChange}
                    errors={errors}
                    includeContactFields={true}
                    setFormData={setFormData}
                    handleSelect={handleSelect}
                  />

                  <div className="mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="shipToDifferentAddress"
                        checked={formData.shipToDifferentAddress}
                        onChange={handleChange}
                        className="peer hidden"
                      />
                      <div className="w-4 h-4 rounded-[2.5px] border border-[#333333] flex items-center justify-center peer-checked:bg-[#076536] peer-checked:border-[#076536] transition-colors duration-200">
                        <img
                          src={"/images/login/checked.svg"}
                          className="w-3 h-3"
                        />
                      </div>
                      <span className="text-[#333333] font-bold text-sm">
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
                        setFormData={setFormData}
                        handleSelect={handleSelect}
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
              )}
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartData}
                selectedShippingOption={selectedShippingOption}
                handleShippingChange={handleShippingChange}
                selectedPaymentMethod={selectedPaymentMethod}
                handlePaymentChange={handlePaymentChange}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                handleApplyCoupon={handleApplyCoupon}
                handleSubmit={handleSubmit}
                isCouponActive={isCouponActive}
                removeCoupon={removeCoupon}
                loader={loader}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
