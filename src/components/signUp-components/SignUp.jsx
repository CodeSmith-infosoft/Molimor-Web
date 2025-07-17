import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signupSchema } from "@/utils/yupSchema";
import { ValidationError } from "yup";
import ErrorComponent from "../Common/ErrorComponent";
import toast from "react-hot-toast";
import useAxios from "../../customHook/fetch-hook";

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
  const { fetchData: register } = useAxios({
    method: "POST",
    url: "/user/register",
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
      const name = validatedData.fname.split(" ");
      const payload = {
        ...validatedData,
        fname: name[0],
        lname: name?.[1] || "",
      };
      delete payload.confirmPassword;

      const res = await register({ data: payload });
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
      window.location.replace(res.url);
    });
  };

  return (
    <section className="login pb-[60px]">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-wrap items-center justify-center gap-y-10 lg:flex-nowrap">
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src={"/images/login/loginBanner.svg"}
            alt="login"
            className="max-w-full h-auto"
          />
        </div>
        <div className="w-full lg:w-1/2 px-4">
          <div className="max-w-[500px] w-full mx-auto border-none px-5">
            <p className="text-center text-green text-xs">
              LET'S GET YOU STARTED
            </p>
            <h2 className="text-green text-center text-[26px] font-extrabold mb-[25px] ">
              Create an Account
            </h2>

            <form className="">
              {/* Name */}
              <div className="mb-[22px] group">
                <label
                  className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                    formData.fname
                      ? "opacity-100"
                      : "opacity-50 group-focus-within:opacity-100"
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="Johnson Doe"
                  className={`w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 ${
                    errors.fname ? "border-red-500" : "border-light-gray"
                  } ${
                    formData.fname
                      ? "opacity-100 !border-[#333333] "
                      : "opacity-50 focus:opacity-100"
                  }`}
                />
                {errors.fname && <ErrorComponent message={errors.fname} />}
              </div>

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
                  onChange={handleChange}
                  placeholder="Example@email.com"
                  className={`w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 ${
                    errors.email ? "border-red-500" : "border-light-gray"
                  } ${
                    formData.email
                      ? "opacity-100 !border-[#333333] "
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
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    className={`w-full px-4 py-[15px] pr-12 rounded-lg border text-base transition-opacity duration-300 ${
                      errors.password ? "border-red-500" : "border-light-gray"
                    } ${
                      formData.password
                        ? "opacity-100 !border-[#333333] "
                        : "opacity-50 focus:opacity-100"
                    }`}
                  />
                  <span
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePassword}
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

              {/* Confirm Password */}
              <div className="mb-[25px] group">
                <label
                  className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                    formData.confirmPassword
                      ? "opacity-100"
                      : "opacity-50 group-focus-within:opacity-100"
                  }`}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    className={`w-full px-4 py-[15px] pr-12 rounded-lg border text-base transition-opacity duration-300 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-light-gray"
                    } ${
                      formData.confirmPassword
                        ? "opacity-100 !border-[#333333] "
                        : "opacity-50 focus:opacity-100"
                    }`}
                  />
                  <span
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleConfirmPassword}
                  >
                    <img
                      src={
                        showConfirmPassword
                          ? "/images/login/eyeCrossed.svg"
                          : "/images/login/eyeOpen.svg"
                      }
                    />
                  </span>
                </div>
                {errors.confirmPassword && (
                  <ErrorComponent message={errors.confirmPassword} />
                )}
              </div>

              <button
                type="submit"
                className="btn-all w-full rounded-lg bg-green text-white font-bold py-3 uppercase"
                disabled={loading}
                onClick={onSubmit}
              >
                {loading ? (
                  <>
                    <span className="spinner inline-block mr-2"></span>Signing
                    Up...
                  </>
                ) : (
                  "GET STARTED"
                )}
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-green hover:underline"
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
