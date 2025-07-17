import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ValidationError } from "yup";
import { forgotSchema } from "@/utils/yupSchema";
import useAxios from "../../customHook/fetch-hook";
import ErrorComponent from "@/components/Common/ErrorComponent";

const initialValue = {
  password: "",
  confirmPassword: "",
};

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchData: resetPassword } = useAxios({
    method: "POST",
    url: "/user/reset-password", // Changed from login to reset-password
  });

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Custom validation function for password matching
  const validatePasswords = (data) => {
    const validationErrors = {};

    // Password validation
    if (!data.password) {
      validationErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }

    // Confirm password validation
    if (!data.confirmPassword) {
      validationErrors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    return validationErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Custom validation
      const validationErrors = validatePasswords(formData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // If using yup schema, validate with it as well
      const validatedData = await forgotSchema.validate(formData, {
        abortEarly: false,
      });

      setErrors({});
      const payload = { password: validatedData.password };

      await resetPassword({ data: payload }).then(async (res) => {
        const toast2 = res.data.success ? toast.success : toast.error;
        toast2(res.message || "Password reset successfully");
        if (res.success) {
          setFormData(initialValue);
          navigate("/login");
        }
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorObj = {};
        error.inner.forEach((err) => {
          if (err.path) errorObj[err.path] = err.message;
        });
        setErrors(errorObj);
      } else {
        toast.error("An error occurred while resetting password");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    const updatedData = { ...formData, [name]: value };
    const validationErrors = validatePasswords(updatedData);

    setErrors((prev) => {
      const updated = { ...prev };

      // Clear error for current field if it's now valid
      if (!validationErrors[name]) {
        delete updated[name];
      } else {
        updated[name] = validationErrors[name];
      }

      // Special handling for password confirmation
      if (name === "password" && formData.confirmPassword) {
        if (value === formData.confirmPassword) {
          delete updated.confirmPassword;
        } else {
          updated.confirmPassword = "Passwords do not match";
        }
      }

      if (name === "confirmPassword" && formData.password) {
        if (value === formData.password) {
          delete updated.confirmPassword;
        } else {
          updated.confirmPassword = "Passwords do not match";
        }
      }

      return updated;
    });
  };

  return (
    <section className="login py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 flex justify-center items-center">
          <img
            src={"/images/login/loginBanner.svg"}
            alt="login"
            className="max-w-full h-auto"
          />
        </div>
        <div className="flex-1">
          <div className="max-w-[500px] w-full mx-auto border-none px-5">
            <h2 className="text-green text-center text-[26px] font-extrabold mb-[25px]">
              Forgot Password
            </h2>
            <form onSubmit={onSubmit} className="">
              <div className="mb-[22px] group">
                <label
                  className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                    formData.password
                      ? "opacity-100"
                      : "opacity-50 group-focus-within:opacity-100"
                  }`}
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
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
                      alt={showPassword ? "Hide password" : "Show password"}
                    />
                  </span>
                </div>
                {errors.password && (
                  <ErrorComponent message={errors.password} />
                )}
              </div>

              {/* Confirm Password */}
              <div className="group">
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
                    placeholder="Confirm your password"
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
                      alt={
                        showConfirmPassword ? "Hide password" : "Show password"
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
                disabled={loading || Object.keys(errors).length > 0}
                className="w-full mt-[25px] py-3 cursor-pointer bg-green text-white font-bold rounded-lg text-sm uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewPassword;
