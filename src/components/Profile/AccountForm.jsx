import ErrorComponent from "@/components/Common/ErrorComponent";
import { useState, useRef } from "react";

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
    } else {
      // Remove all non-digit characters for validation
      const digitsOnly = formData.phoneNumber.replace(/\D/g, "");
      if (digitsOnly.length < 10) {
        newErrors.phoneNumber = "Phone number must be at least 10 digits";
      } else if (digitsOnly.length > 15) {
        newErrors.phoneNumber = "Phone number is too long";
      } else if (!/^\+?[\d\s\-()]+$/.test(formData.phoneNumber.trim())) {
        newErrors.phoneNumber = "Please enter a valid phone number";
      }
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
    <div className="p-6 bg-white border border-[#E6E6E6]">
      <h1 className="text-2xl font-semibold mb-8 text-gray-900">
        Your Account
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Form */}
        <div className="w-1/2">
          {/* First Name */}
          <div className="mb-[22px] group">
            <label
              className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                formData.firstName
                  ? "opacity-100"
                  : "opacity-50 group-focus-within:opacity-100"
              }`}
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter your first name"
              onChange={handleChange}
              className={`w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } ${
                formData.firstName
                  ? "opacity-100 !border-[#333333]"
                  : "opacity-50 focus:opacity-100"
              }`}
            />
            {errors.firstName && <ErrorComponent message={errors.firstName} />}
          </div>

          {/* Last Name */}
          <div className="mb-[22px] group">
            <label
              className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                formData.lastName
                  ? "opacity-100"
                  : "opacity-50 group-focus-within:opacity-100"
              }`}
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter your last name"
              onChange={handleChange}
              className={`w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } ${
                formData.lastName
                  ? "opacity-100 !border-[#333333]"
                  : "opacity-50 focus:opacity-100"
              }`}
            />
            {errors.lastName && <ErrorComponent message={errors.lastName} />}
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
              placeholder="Example@email.com"
              onChange={handleChange}
              className={`w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } ${
                formData.email
                  ? "opacity-100 !border-[#333333]"
                  : "opacity-50 focus:opacity-100"
              }`}
            />
            {errors.email && <ErrorComponent message={errors.email} />}
          </div>

          {/* Phone Number */}
          <div className="mb-[22px] group">
            <label
              className={`block text-mid-gray text-sm pb-2 transition-opacity duration-300 ${
                formData.phoneNumber
                  ? "opacity-100"
                  : "opacity-50 group-focus-within:opacity-100"
              }`}
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="(000) 000-0000"
              onChange={handleChange}
              className={`w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } ${
                formData.phoneNumber
                  ? "opacity-100 !border-[#333333]"
                  : "opacity-50 focus:opacity-100"
              }`}
            />
            {errors.phoneNumber && (
              <ErrorComponent message={errors.phoneNumber} />
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveChanges}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>

        {/* Right side - Profile Image */}
        <div className="flex flex-col w-1/2 justify-center items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200 border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200">
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
            className="border-2 border-green-600 text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200"
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
