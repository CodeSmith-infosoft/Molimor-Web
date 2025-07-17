import ProductDetail from "@/pages/ProductDetail";
import SignUp from "../components/signUp-components/SignUp";
import Home from "../pages/Home";
import Products from "../pages/Products";
import SignIn from "../pages/sign-in";
import Wishlist from "../pages/Wishlist";
import Combo from "@/pages/Combo";
import Cart from "@/pages/Cart";
import ForgotPassword from "@/pages/ForgotPassword";
import Order from "@/pages/Order";
import Profile from "@/pages/Profile";
import NewPassword from "@/pages/NewPassword";
import RecentOrder from "@/pages/RecentOrder";
import OrderDetail from "@/pages/OrderDetail";

export const ROUTES = [
  { path: "/", exact: true, component: <Home /> },
  { path: "/products", exact: true, component: <Products /> },
  { path: "/wishlist", exact: true, component: <Wishlist /> },
  { path: "/products/:id", exact: true, component: <ProductDetail /> },
  { path: "/deals", exact: true, component: <Combo /> },
  { path: "/cart", exact: true, component: <Cart /> },
  { path: "/order", exact: true, component: <Order /> },
];

export const REJECT_ROUTES = [
  { path: "/login", exact: true, component: <SignIn /> },
  { path: "/forgot-password", exact: true, component: <ForgotPassword /> },
  { path: "/sign-up", exact: true, component: <SignUp /> },
  { path: "/change-password", exact: true, component: <NewPassword /> },
];

export const REQUIRED_ROUTES = [
  { path: "/profile", exact: true, component: <Profile /> },
  { path: "/recent-order", exact: true, component: <RecentOrder /> },
  { path: "/recent-order/:id", exact: true, component: <OrderDetail /> },
];
