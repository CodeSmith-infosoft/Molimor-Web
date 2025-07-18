import { useState } from "react";
import ErrorComponent from "../Common/ErrorComponent";
import useAxios from "@/customHook/fetch-hook";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const { fetchData: changePassword } = useAxios({
    method: "PUT",
    url: "/user/changePassword",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePasswords = () => {
    const newErrors = {};

    // Current Password validation
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    // New Password validation
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long";
    }

    // Confirm Password validation
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Check if new password is different from current
    if (
      passwordData.currentPassword &&
      passwordData.newPassword &&
      passwordData.currentPassword === passwordData.newPassword
    ) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    return newErrors;
  };

  const handleChangePassword = () => {
    const newErrors = validatePasswords();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      let payload = {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      };
      changePassword({ data: payload }).then((res) => {
        if (res.success) {
          const toast2 = res.success ? toast.success : toast.error;
          toast2(res.message);
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          toast.error(res.message);
        }
      });

      // Clear form after successful change
    }
  };

  return (
    <div className="rounded-[8px] bg-white border border-[#E6E6E6]">
      <h2 className="max-md:text-lg text-[20px] py-4 px-6 border-b font-medium">
        Change Password
      </h2>

      {/* Current Password */}
      <div className=" max-md:py-5 max-md:px-[15px] py-6 px-[50px]">
        <div className="mb-[22px] group">
          <label className="block max-lg:text-[13px] text-sm pb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword.currentPassword ? "text" : "password"}
              name="currentPassword"
              value={passwordData.currentPassword}
              placeholder="••••••••••••••"
              onChange={handleChange}
              className={`w-full px-4 py-[11px] rounded-[8px] border max-mobile:text-sm text-base transition-opacity duration-300 outline-none ${
                errors.currentPassword ? "border-[#fb2c36]" : "border-[#E5E7EB]"
              }`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("currentPassword")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 "
            >
              {showPassword.currentPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <ErrorComponent message={errors.currentPassword} />
          )}
        </div>

        <div className="flex max-md:block gap-x-[10px] mb-6">
          {/* New Password */}
          <div className="flex-1 max-md:mb-5 group">
            <label className="block max-lg:text-[13px] text-sm pb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                placeholder="Password"
                onChange={handleChange}
                className={`w-full px-4 py-[11px] max-mobile:text-sm rounded-[8px] border text-base transition-opacity duration-300 outline-none ${
                  errors.newPassword ? "border-[#fb2c36]" : "border-[#E5E7EB]"
                }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 "
              >
                {showPassword.newPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.newPassword && (
              <ErrorComponent message={errors.newPassword} />
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex-1 group">
            <label className="block max-lg:text-[13px] text-sm pb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                placeholder="Password"
                onChange={handleChange}
                className={`w-full px-4 py-[11px] max-mobile:text-sm rounded-[8px] border text-base transition-opacity duration-300 outline-none ${
                  errors.confirmPassword
                    ? "border-[#fb2c36]"
                    : "border-[#E5E7EB]"
                }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 "
              >
                {showPassword.confirmPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <ErrorComponent message={errors.confirmPassword} />
            )}
          </div>
        </div>

        {/* Change Password Button */}
        <button
          onClick={handleChangePassword}
          className="bg-green cursor-pointer max-mobile: text-white px-8 py-[14px] rounded-[43px] font-medium transition-colors duration-200"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
