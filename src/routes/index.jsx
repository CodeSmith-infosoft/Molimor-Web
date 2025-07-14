import SignUp from "../components/signUp-components/SignUp";
import Home from "../pages/Home";
import SignIn from "../pages/sign-in";

export const ROUTES = [{ path: "/", exact: true, component: <Home /> }];

export const REJECT_ROUTES = [
  // { path: "/login", exact: true, component: <SignIn /> },
  { path: "/sign-up", exact: true, component: <SignUp /> },
];

export const REQUIRED_ROUTES = [
  { path: "/", exact: true, component: <Home /> },
];
