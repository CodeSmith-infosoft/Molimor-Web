import { object, string, number, ref, boolean } from "yup";

export let userSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  address: string().required("Address is required"),
  country: string().required("Country is required"),
  state: string().required("State is required"),
  pinCode: number().required("Pincode is required"),
  phone: number().required("Phone is required"),
  email: string().email("Email is required").required("Email is required"),
});

export let inquirySchema = object({
  name: string().required("Name is required"),
  email: string().email("Email is required").required("Email is required"),
  message: string()
    .required("Message is required")
    .min(5, "Message must be at least 5 characters long"),
  inquiryType: string().default("Inquiry"),
  moq: string().test(
    "moq-required-based-on-inquiryType",
    "MOQ is required",
    function (value) {
      const { inquiryType } = this.parent;
      if (inquiryType !== "Inquiry" && inquiryType !== "Customer") {
        return !!value; // Must be non-empty
      }
      return true; // Not required
    }
  ),
});

export const signupSchema = object().shape({
  fname: string().required("First name is required"),
  email: string().email("Invalid email format").required("Email is required"),
  password: string()
    .min(6, "Password must contain minimum 6 latters.")
    .required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = object().shape({
  email: string().email("Invalid email format").required("Email is required"),
  password: string()
    .min(6, "Password must contain minimum 6 latters.")
    .required("Password is required"),
});
export const forgotSchema = object().shape({
  email: string().email("Invalid email format").required("Email is required"),
});

export const billingSchema = object().shape({
  fname: string().required("First name is required"),
  lname: string().required("Last name is required"),
  address1: string().required("Address is required"),
  address2: string(), // Optional
  country: string().required("Country is required"),
  state: string().required("State is required"),
  pincode: string()
    .matches(/^\d{5,6}$/, "Pincode must be 5 to 6 digits")
    .required("Pincode is required"),
  email: string().email("Invalid email format").required("Email is required"),
  mobile: string()
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10 to 15 digits")
    .required("Phone number is required"),
  diffrentAddress: boolean().optional(),
  shippingAddress1: string().when("diffrentAddress", {
    is: true,
    then: (schema) => schema.required("Shipping address is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  shippingAddress2: string(), // Optional regardless
  shippingCountry: string().when("diffrentAddress", {
    is: true,
    then: (schema) => schema.required("Shipping country is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  shippingState: string().when("diffrentAddress", {
    is: true,
    then: (schema) => schema.required("Shipping state is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  shippingPincode: string().when("diffrentAddress", {
    is: true,
    then: (schema) =>
      schema
        .matches(/^\d{5,6}$/, "Shipping pincode must be 5 to 6 digits")
        .required("Shipping pincode is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  orderNote: string(), // Optional
  paymentType: string().required("Payment type is required"),
});

export const reviewSchema = object().shape({
  email: string().email("Invalid email format").required("Email is required"),
  name: string().required("Name is required"),
  comment: string().required("Review is required"),
});
