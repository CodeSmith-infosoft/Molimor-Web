import ErrorComponent from "@/components/Common/ErrorComponent";
import useAxios from "@/customHook/fetch-hook";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/style.css";

export default function AccountForm({ userData, getProfile }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const { fetchData: updateProfile } = useAxios({
    method: "PUT",
    url: "/user/updateProfile",
  });

  useEffect(() => {
    if (userData?.isActive) {
      setFormData({
        email: userData?.email || "",
        firstName: userData?.fname || "",
        lastName: userData?.lname || "",
        phoneNumber: userData?.mobile || "",
      });
      setProfileImage(userData?.profilePhoto || "");
    }
  }, [userData]);

  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState("");
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
      const payloadData = new FormData();
      payloadData.append("fname", formData.firstName);
      payloadData.append("lname", formData.lastName);
      payloadData.append("mobile", formData.phoneNumber);
      updateProfile({ data: payloadData }).then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        getProfile();
      });
    }
  };

  const handleImageChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]; // Get the first file from the FileList
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePhoto", file);
    updateProfile({ data: formData }).then((res) => {
      const toast2 = res.success ? toast.success : toast.error;
      toast2(res.message);
      getProfile();
    });
  };

  return (
    <div className=" rounded-[8px] bg-white border border-[#E6E6E6]">
      <h1 className="max-mobile:text-lg text-[20px] py-4 px-6 border-b font-medium">
        Your Account
      </h1>

      <div className="flex max-md:flex-col-reverse max-md:py-5 max-md:px-[15px] py-6 px-[50px] gap-8">
        {/* Left side - Form */}
        <div className="max-md:w-full w-1/2">
          {/* First Name */}
          <div className="max-lg:mb-[20px] mb-[22px] group">
            <label
              className={`block max-lg:text-[13px] text-sm pb-2 transition-opacity duration-300  `}
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter your first name"
              onChange={handleChange}
              className={`w-full px-4  max-mobile:text-sm py-[11px] rounded-[8px] border text-base transition-opacity duration-300 outline-none ${
                errors.firstName ? "border-[#fb2c36]" : "border-[#E5E7EB]"
              }`}
            />
            {errors.firstName && <ErrorComponent message={errors.firstName} />}
          </div>

          {/* Last Name */}
          <div className="max-lg:mb-[20px] mb-[22px] group">
            <label
              className={`block max-lg:text-[13px] text-sm pb-2 transition-opacity duration-300 `}
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter your last name"
              onChange={handleChange}
              className={`w-full px-4 py-[11px]  max-mobile:text-sm rounded-[8px] border text-base transition-opacity duration-300 outline-none ${
                errors.lastName ? "border-[#fb2c36]" : "border-[#E5E7EB]"
              }`}
            />
            {errors.lastName && <ErrorComponent message={errors.lastName} />}
          </div>

          {/* Email */}
          <div className="mb-[22px] group">
            <label
              className={`block max-lg:text-[13px] text-sm pb-2 transition-opacity duration-300`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              placeholder="Example@email.com"
              onChange={handleChange}
              className={`w-full px-4 py-[11px]  max-mobile:text-sm rounded-[8px] border text-base transition-opacity duration-300 outline-none ${
                errors.email ? "border-[#fb2c36]" : "border-[#E5E7EB]"
              }`}
            />
            {errors.email && <ErrorComponent message={errors.email} />}
          </div>

          {/* Phone Number */}
          <div className="mb-[22px] group form-phone">
            <label
              className={`block max-lg:text-[13px] text-sm pb-2 transition-opacity duration-300 `}
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="Enter your phone number"
              onChange={handleChange}
              className={`w-full px-4 py-[11px]  max-mobile:text-sm rounded-[8px] border text-base transition-opacity duration-300 outline-none ${
                errors.phoneNumber ? "border-[#fb2c36]" : "border-[#E5E7EB]"
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
        <div className="flex flex-col max-md:w-full w-1/2 justify-center items-center">
          <div className="max-md:w-[150px] max-md:h-[150px] w-[224px] h-[224px] rounded-full overflow-hidden mb-4 bg-gray-200 border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200">
            <img
              src={profileImage || "/images/common/user.svg"}
              alt="Profile"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/128x128/cccccc/666666?text=No+Image";
              }}
            />
          </div>
          <button
            onClick={handleImageChange}
            className="border-2 border-green text-green max-md:px-4 max-md:py-2 px-8 py-[14px] rounded-[43px] cursor-pointer font-medium hover:bg-green-50 transition-colors duration-200"
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
