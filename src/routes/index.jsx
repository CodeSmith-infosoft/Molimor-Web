import SignUp from "../components/signUp-components/SignUp";
import Home from "../pages/Home";
import Products from "../pages/Products";
import SignIn from "../pages/sign-in";
// import Wishlist from "../pages/Wishlist";

export const ROUTES = [
  { path: "/", exact: true, component: <Home /> },
  { path: "/products", exact: true, component: <Products /> },
  // { path: "/wishlist", exact: true, component: <Wishlist /> },
];

export const REJECT_ROUTES = [
  { path: "/login", exact: true, component: <SignIn /> },
  { path: "/sign-up", exact: true, component: <SignUp /> },
];

export const REQUIRED_ROUTES = [
  { path: "/", exact: true, component: <Home /> },
];
