import ErrorComponent from "@/components/Common/ErrorComponent";
import { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function AccountForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  );
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = "First name can only contain letters and spaces";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Last name can only contain letters and spaces";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.trim().length > 254) {
      newErrors.email = "Email address is too long";
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    return newErrors;
  };

  const handleSaveChanges = () => {
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      alert("Changes saved successfully!");
      console.log("Form data:", formData);
      console.log("Profile image:", profileImage);
    }
  };

  const handleImageChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" rounded-[8px] bg-white border border-[#E6E6E6]">
      <h1 className="text-[20px] py-4 px-6 border-b font-medium">
        Your Account
      </h1>

      <div className="flex flex-col py-6 px-[50px] lg:flex-row gap-8">
        {/* Left side - Form */}
        <div className="w-1/2">
          {/* First Name */}
          <div className="mb-[22px] group">
            <label
              className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 `}
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter your first name"
              onChange={handleChange}
              className={`w-full px-4 py-[9px] rounded-lg border text-base transition-opacity duration-300 ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && <ErrorComponent message={errors.firstName} />}
          </div>

          {/* Last Name */}
          <div className="mb-[22px] group">
            <label
              className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 `}
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter your last name"
              onChange={handleChange}
              className={`w-full px-4 py-[9px] rounded-lg border text-base transition-opacity duration-300 ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } `}
            />
            {errors.lastName && <ErrorComponent message={errors.lastName} />}
          </div>

          {/* Email */}
          <div className="mb-[22px] group">
            <label
              className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Example@email.com"
              onChange={handleChange}
              className={`w-full px-4 py-[9px] rounded-lg border text-base transition-opacity duration-300 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <ErrorComponent message={errors.email} />}
          </div>

          {/* Phone Number */}
          <div className="mb-[22px] group form-phone">
            <label
              className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 `}
            >
              Phone Number
            </label>
            <PhoneInput
              country={"in"}
              value={formData.phoneNumber}
              onChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  phoneNumber: value,
                }));

                if (errors.phoneNumber) {
                  setErrors((prev) => ({
                    ...prev,
                    phoneNumber: "",
                  }));
                }
              }}
              inputClass="!w-full !py-[15px] !px-4 !text-base !border-none focus:!outline-none"
              containerClass={`w-full border rounded-lg transition-opacity duration-300 ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.phoneNumber && (
              <ErrorComponent message={errors.phoneNumber} />
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveChanges}
            className="bg-green cursor-pointer text-white px-8 py-[14px] rounded-[43px] font-medium transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>

        {/* Right side - Profile Image */}
        <div className="flex flex-col w-1/2 justify-center items-center">
          <div className="w-[224px] h-[224px] rounded-full overflow-hidden mb-4 bg-gray-200 border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/128x128/cccccc/666666?text=No+Image";
              }}
            />
          </div>
          <button
            onClick={handleImageChange}
            className="border-2 border-green text-green px-8 py-[14px] rounded-[43px] cursor-pointer font-medium hover:bg-green-50 transition-colors duration-200"
          >
            Choose Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
