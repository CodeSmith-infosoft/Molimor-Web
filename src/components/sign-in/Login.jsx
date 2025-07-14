import {
  getGoogleLogin,
  getGoogleURL,
  login as loginUser,
} from "@/service/action/register.action";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ValidationError } from "yup";
import { loginSchema } from "@/utils/yupSchema";
import ErrorComponent from "../ErrorComponent";
import { addToCart } from "@/service/action/cart.action";
import {
  removeCartFromLocalstorage,
  removeWishlistFromLocalstorage,
} from "@/utils";
import { addWishlist } from "@/service/action/wishlist.action";
import MainContext from "../../context/MainContext";

const initialValue = {
  email: "",
  password: "",
};

const Login = () => {
  const { setCartCount } = useContext(MainContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (location.search.includes("code")) {
      const params = new URL(window.location.href).searchParams;
      const code = params.get("code");
      if (code) {
        getGoogleLogin(code).then((res) => {
          const toast2 = res.success ? toast.success : toast.error;
          toast2(res.message);
          if (res.success) {
            localStorage.setItem("token", res.data.token);
            navigate("/");
          }
        });
      }
    }
  }, [location, navigate]);

  useEffect(() => {
    const data = localStorage.getItem("login");
    if (data) {
      setFormData(JSON.parse(data));
      setRememberMe(true);
    }
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = await loginSchema.validate(formData, {
        abortEarly: false,
      });
      setErrors({});
      const payload = { ...validatedData };
      await loginUser(payload).then(async (res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        if (res.success) {
          rememberMe
            ? localStorage.setItem("login", JSON.stringify(payload))
            : localStorage.removeItem("login");

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("_id", res.data._id);

          const cartData = JSON.parse(localStorage.getItem("cartData"));
          const cartPayload = cartData?.map((data) => ({
            productId: data.productId._id,
            quantity: 1,
            weight: data.weight,
            price: data.price,
            mrp: data.mrp,
          }));

          const wishlistData = JSON.parse(localStorage.getItem("wishlistData"));
          const promises =
            wishlistData?.map((item) => addWishlist(item.productId._id)) || [];

          await Promise.all([...promises, addToCart({ items: cartPayload })]);
          setCartCount((prev) => prev + 1);
          removeCartFromLocalstorage();
          removeWishlistFromLocalstorage();

          setFormData(initialValue);
          navigate("/");
        }
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorObj = {};
        error.inner.forEach((err) => {
          if (err.path) errorObj[err.path] = err.message;
        });
        setErrors(errorObj);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    try {
      await loginSchema.validateAt(name, { ...formData, [name]: value });
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    }
  };

  const handleGoogleLogIn = (e) => {
    e.preventDefault();
    getGoogleURL().then((res) => window.location.replace(res.data.url));
  };

  return (
    <section className="login py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex justify-center items-center">
          <img
            src={"/images/login/loginBanner.svg"}
            alt="login"
            className="max-w-full h-auto"
          />
        </div>
        <div className="flex-1">
          <div className="max-w-md mx-auto border-none">
            <p className="text-center text-green-900 text-xs font-normal">
              WELCOME BACK
            </p>
            <h2 className="text-2xl font-extrabold text-green-900 mb-4">
              Login your Account
            </h2>
            <form onSubmit={onSubmit} className="pt-10">
              <label className="block text-sm text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Example@email.com"
                onChange={handleChange}
                className={`w-full p-4 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <ErrorComponent message={errors.email} />}

              <label className="block text-sm text-gray-700 mb-2 mt-5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="At least 8 characters"
                  onChange={handleChange}
                  className={`w-full p-4 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } pr-12`}
                />
                <span
                  onClick={togglePassword}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <img
                    src={
                      showPassword
                        ? "/images/login/eyeCrossed.svg"
                        : "/images/login/eyeOpen.svg"
                    }
                  />
                </span>
              </div>
              {errors.password && <ErrorComponent message={errors.password} />}

              <div className="flex justify-between items-center mt-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4"
                  />
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3 bg-red-600 text-white font-bold rounded-lg text-sm uppercase"
              >
                {loading ? "Loading..." : "Continue"}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t"></div>
              <span className="px-4 text-sm text-gray-500">Or</span>
              <div className="flex-1 border-t"></div>
            </div>

            <div className="space-y-2">
              <div
                onClick={handleGoogleLogIn}
                className="flex items-center justify-center gap-4 bg-gray-200 py-3 rounded-lg cursor-pointer"
              >
                <img src={"/images/login/google.svg"} />
                <span className="text-gray-700 text-sm">
                  Sign in with Google
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-gray-700 mt-6">
              New User?{" "}
              <Link to="/sign-up" className="font-bold text-green-800">
                Sign Up Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
