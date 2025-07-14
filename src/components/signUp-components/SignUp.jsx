import { useEffect, useState } from "react";
import login from "@/assets/image/other/login-bg.png";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signupSchema } from "@/utils/yupSchema";
import {
  getGoogleLogin,
  getGoogleURL,
  register,
} from "@/service/action/register.action";
import { ValidationError } from "yup";
import ErrorComponent from "../ErrorComponent";
import { toast } from "react-toastify";

const initialValue = {
  fname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = await signupSchema.validate(formData, {
        abortEarly: false,
      });
      setErrors({});

      const payload = { ...validatedData };
      delete payload.confirmPassword;

      const res = await register(payload);
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);

      if (res.success) {
        setFormData(initialValue);
        navigate("/login");
      }
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
      await signupSchema.validateAt(name, { ...formData, [name]: value });
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
    getGoogleURL().then((res) => {
      window.location.replace(res.data.url);
    });
  };

  return (
    <section className="login pb-[60px]">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-wrap items-center justify-center gap-y-10 lg:flex-nowrap">
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img src={login} alt="login" className="max-w-full h-auto" />
        </div>
        <div className="w-full lg:w-1/2 px-4">
          <div className="max-w-[500px] w-full mx-auto border-none shadow-md p-6 rounded-md bg-white">
            <p className="text-center text-[#076536] text-sm font-normal">
              LET'S GET YOU STARTED
            </p>
            <h2 className="text-[#076536] text-[26px] font-extrabold mt-2 mb-4">
              Create an Account
            </h2>

            <form className="pt-10">
              <label className="block text-[#424242] text-sm pl-2 pb-2 mt-5">
                Your Name
              </label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="Johnson Doe"
                className={`w-full p-4 rounded-xl border text-base ${
                  errors.fname ? "border-red-500" : "border-[#BDBDBD]"
                }`}
              />
              {errors.fname && <ErrorComponent message={errors.fname} />}

              <label className="block text-[#424242] text-sm pl-2 pb-2 mt-5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Example@email.com"
                className={`w-full p-4 rounded-xl border text-base ${
                  errors.email ? "border-red-500" : "border-[#BDBDBD]"
                }`}
              />
              {errors.email && <ErrorComponent message={errors.email} />}

              <label className="block text-[#424242] text-sm pl-2 pb-2 mt-5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={`w-full p-4 pr-12 rounded-xl border text-base ${
                    errors.password ? "border-red-500" : "border-[#BDBDBD]"
                  }`}
                />
                <span
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePassword}
                >
                  <Icon
                    width={22}
                    height={22}
                    icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                  />
                </span>
              </div>
              {errors.password && <ErrorComponent message={errors.password} />}

              <label className="block text-[#424242] text-sm pl-2 pb-2 mt-5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={`w-full p-4 pr-12 rounded-xl border text-base ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-[#BDBDBD]"
                  }`}
                />
                <span
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleConfirmPassword}
                >
                  <Icon
                    width={22}
                    height={22}
                    icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"}
                  />
                </span>
              </div>
              {errors.confirmPassword && (
                <ErrorComponent message={errors.confirmPassword} />
              )}

              <button
                type="submit"
                className="btn-all w-full rounded-xl bg-[#E31E24] text-white mt-7 font-bold py-3 uppercase"
                disabled={loading}
                onClick={onSubmit}
              >
                {loading ? (
                  <>
                    <span className="spinner inline-block mr-2"></span>Signing
                    Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="orline pt-10 flex items-center">
              <div className="line border-t border-[#CFDFE2] w-1/2"></div>
              <div className="cemter-or px-4">Or</div>
              <div className="line border-t border-[#CFDFE2] w-1/2"></div>
            </div>

            <div className="other-icon pt-5">
              <div
                className="cursor-pointer border border-[#EEEEEE] bg-[#EEEEEE] py-4 px-10 rounded-lg flex items-center justify-center gap-4"
                onClick={handleGoogleLogIn}
              >
                <Icon icon="logos:google-icon" className="w-7 h-7" />
                <span className="text-sm text-[#616161]">
                  Sign up with Google
                </span>
              </div>
            </div>

            <div className="account text-center pt-10 text-sm text-[#000]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#076536] hover:underline"
              >
                LOGIN HERE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
