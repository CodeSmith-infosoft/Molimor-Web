import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ValidationError } from "yup";
import { loginSchema } from "@/utils/yupSchema";
import ErrorComponent from "../Common/ErrorComponent";
import { addToCart } from "@/service/action/cart.action";
import {
  removeCartFromLocalstorage,
  removeWishlistFromLocalstorage,
} from "@/utils";
import { addWishlist } from "@/service/action/wishlist.action";
import MainContext from "../../context/MainContext";
import useAxios from "../../customHook/fetch-hook";

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
  const { fetchData: loginUser } = useAxios({
    method: "POST",
    url: "/user/login",
  });
  const { fetchData: getGoogleLogin } = useAxios({
    method: "POST",
    url: "/user/googleOAuthLogin",
  });
  const { fetchData: getGoogleURL } = useAxios({
    method: "GET",
    url: "/user/getGoogleOAuthUrl",
  });

  useEffect(() => {
    if (location.search.includes("code")) {
      const params = new URL(window.location.href).searchParams;
      const code = params.get("code");
      if (code) {
        getGoogleLogin({ data: code }).then((res) => {
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
      await loginUser({ data: payload }).then(async (res) => {
        console.log(res);
        const toast2 = res.data.token ? toast.success : toast.error;
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
    getGoogleURL().then((res) => window.location.replace(res.url));
  };

  return (
    <section className="login max-mobile:py-[30px] max-md:py-[40px] max-lg:py-[50px] py-[70px]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="flex-1 max-md:hidden flex justify-center items-center">
          <img
            src={"/images/login/loginBanner.svg"}
            alt="login"
            className="max-w-full h-auto"
          />
        </div>
        <div className="flex-1">
          <div className="max-w-[500px] w-full mx-auto border-none px-5">
            <p className="text-center text-green text-xs">WELCOME BACK</p>
            <h2 className="text-green text-center text-[26px] font-extrabold mb-[25px]">
              Login your Account
            </h2>
            <form onSubmit={onSubmit} className="">
              {/* Email */}
              <div className="mb-[22px] group">
                <label
                  className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                    formData.email
                      ? "opacity-100"
                      : "opacity-50 group-focus-within:opacity-100"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Example@email.com"
                  onChange={handleChange}
                  className={`w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 ${
                    errors.email ? "border-red-500" : "border-light-gray"
                  } ${
                    formData.email
                      ? "opacity-100 !border-[#333333]"
                      : "opacity-50 focus:opacity-100"
                  }`}
                />
                {errors.email && <ErrorComponent message={errors.email} />}
              </div>

              {/* Password */}
              <div className="mb-[22px] group">
                <label
                  className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                    formData.password
                      ? "opacity-100"
                      : "opacity-50 group-focus-within:opacity-100"
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    placeholder="At least 6 characters"
                    onChange={handleChange}
                    className={`w-full px-4 py-[15px] pr-12 rounded-lg border text-base transition-opacity duration-300 ${
                      errors.password ? "border-red-500" : "border-light-gray"
                    } ${
                      formData.password
                        ? "opacity-100 !border-[#333333]"
                        : "opacity-50 focus:opacity-100"
                    }`}
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
                {errors.password && (
                  <ErrorComponent message={errors.password} />
                )}
              </div>
              <div className="flex justify-between items-center mt-[25px]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer hidden"
                  />
                  <div className="w-[22px] h-[22px] rounded-[2px] border border-[#E5E7EB] flex items-center justify-center peer-checked:bg-[#076536] peer-checked:border-[#076536] transition-colors duration-200">
                    <img src={"/images/login/checked.svg"} />
                  </div>
                  <span className="text-[#333333] text-sm">Remember me</span>
                </label>
                <Link to={"/forgot-password"} className="text-sm font-medium">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-[25px] py-3 bg-green text-white font-bold rounded-lg text-sm uppercase"
              >
                {loading ? "Loading..." : "Continue"}
              </button>
            </form>

            <div className="pt-[25px] flex items-center">
              <div className="line border-t border-light-gray w-1/2"></div>
              <div className="px-[10px] text-xs font-bold">Or</div>
              <div className="line border-t border-light-gray w-1/2"></div>
            </div>

            <div className="other-icon pt-[25px]">
              <div
                className="cursor-pointer border border-[#E5E7EB] bg-[#FAFAFA] py-[15px] px-10 rounded-lg flex items-center justify-center gap-4"
                onClick={handleGoogleLogIn}
              >
                <img src={"/images/login/google.svg"} />
                <span className="text-sm opacity-50">Sign up with Google</span>
              </div>
            </div>

            <div className="text-center pt-10 text-sm text-[#000]">
              New User?{" "}
              <Link
                to="/sign-up"
                className="font-bold text-green hover:underline"
              >
                SIGN UP HERE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
