import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Country, State } from "country-state-city";
import InputGroup from "../Order/InputGroup";
import ErrorComponent from "../Common/ErrorComponent";

const AddressFormSection = ({
  formData,
  handleChange,
  errors,
  title,
  prefix = "",
  includeContactFields = true,
  setFormData,
}) => {
  const getFieldName = (fieldName) =>
    prefix
      ? `${prefix}${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
      : fieldName;

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchState, setSearchState] = useState("");

  const selectedCountryRef = useRef("");
  const countryDropdownRef = useRef(null);
  const stateDropdownRef = useRef(null);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
    setFilteredCountries(allCountries);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setIsCountryOpen(false);
      }
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(event.target)
      ) {
        setIsStateOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredCountries(
      countries.filter((country) => country.name.toLowerCase().includes(value))
    );
  };

  const handleStateSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchState(value);
    setFilteredStates(
      states.filter((state) => state.name.toLowerCase().includes(value))
    );
  };

  const handleCountrySelect = (country) => {
    selectedCountryRef.current = country.isoCode;

    // Set country and reset state
    setFormData((prev) => ({
      ...prev,
      [getFieldName("country")]: country.name,
      [getFieldName("state")]: "",
    }));

    // Get states of the selected country
    const countryStates = State.getStatesOfCountry(country.isoCode);
    setStates(countryStates);
    setFilteredStates(countryStates);

    setIsCountryOpen(false);
    setSearchTerm("");
  };

  const handleStateSelect = (state) => {
    setFormData((prev) => ({
      ...prev,
      [getFieldName("state")]: state.name,
    }));
    setIsStateOpen(false);
    setSearchState("");
  };

  const renderSelect = (
    label,
    name,
    value,
    options,
    error,
    handleSelect,
    setOpen,
    isOpen,
    handleSearch,
    search,
    placeholder,
    dropdownRef
  ) => (
    <div className="mb-[22px] group relative">
      <label className="block text-sm pb-2 transition-opacity duration-300">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen(!isOpen)}
          className="w-full px-3 py-2 text-left bg-white border rounded-lg border-gray-300 flex items-center justify-between"
        >
          <span className={value ? "" : "text-gray-400"}>
            {value || placeholder}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
            <div className="p-2">
              <input
                type="text"
                placeholder={`Search ${label.toLowerCase()}...`}
                value={search}
                onChange={handleSearch}
                className="w-full px-2 py-1 border border-gray-300 text-sm"
              />
            </div>
            {options.map((option) => (
              <button
                key={option.isoCode}
                onClick={() => handleSelect(option)}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm"
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <ErrorComponent message={error} />}
    </div>
  );

  return (
    <>
      {title && (
        <h2 className="text-[20px] py-4 px-6 border-b font-medium">{title}</h2>
      )}
      <div className=" pt-6 px-[50px]">
        {includeContactFields && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <InputGroup
              label="First name*"
              name={getFieldName("firstName")}
              value={formData[getFieldName("firstName")] || ""}
              onChange={handleChange}
              error={errors[getFieldName("firstName")]}
            />
            <InputGroup
              label="Last name*"
              name={getFieldName("lastName")}
              value={formData[getFieldName("lastName")] || ""}
              onChange={handleChange}
              error={errors[getFieldName("lastName")]}
            />
            <InputGroup
              label="Phone*"
              type="tel"
              name={getFieldName("phone")}
              value={formData[getFieldName("phone")] || ""}
              onChange={handleChange}
              error={errors[getFieldName("phone")]}
            />
            <InputGroup
              label="Email address*"
              type="email"
              name={getFieldName("email")}
              value={formData[getFieldName("email")] || ""}
              onChange={handleChange}
              placeholder="Example@email.com"
              error={errors[getFieldName("email")]}
            />
          </div>
        )}

        {renderSelect(
          "Country / Region*",
          getFieldName("country"),
          formData[getFieldName("country")] || "",
          filteredCountries,
          errors[getFieldName("country")],
          handleCountrySelect,
          setIsCountryOpen,
          isCountryOpen,
          handleCountrySearch,
          searchTerm,
          "Select Country",
          countryDropdownRef
        )}

        <InputGroup
          label="Street address*"
          name={getFieldName("streetAddress")}
          value={formData[getFieldName("streetAddress")] || ""}
          onChange={handleChange}
          placeholder="House number and street name"
          error={errors[getFieldName("streetAddress")]}
        />

        <InputGroup
          label="Apartment, suite, unit, etc. (optional)"
          name={getFieldName("apartment")}
          value={formData[getFieldName("apartment")] || ""}
          onChange={handleChange}
          error={errors[getFieldName("apartment")]}
        />

        <InputGroup
          label="Town / City*"
          name={getFieldName("city")}
          value={formData[getFieldName("city")] || ""}
          onChange={handleChange}
          error={errors[getFieldName("city")]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[10px]">
          {renderSelect(
            "State*",
            getFieldName("state"),
            formData[getFieldName("state")] || "",
            filteredStates,
            errors[getFieldName("state")],
            handleStateSelect,
            setIsStateOpen,
            isStateOpen,
            handleStateSearch,
            searchState,
            "Select State",
            stateDropdownRef
          )}
          <InputGroup
            label="ZIP Code*"
            name={getFieldName("zipCode")}
            value={formData[getFieldName("zipCode")] || ""}
            onChange={handleChange}
            error={errors[getFieldName("zipCode")]}
          />
        </div>
      </div>
    </>
  );
};

export default function Address() {
  const [formData, setFormData] = useState({
    country: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});

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

    // Address validation only
    if (!formData.country) {
      newErrors.country = "Country/Region is required";
    }
    if (!formData.streetAddress?.trim()) {
      newErrors.streetAddress = "Street address is required";
    }
    if (!formData.city?.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state) {
      newErrors.state = "State is required";
    }
    if (!formData.zipCode?.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }

    return newErrors;
  };

  const handleSaveChanges = () => {
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Address details saved successfully!");
      console.log("Form data:", formData);
    }
  };

  return (
    <div className="rounded-[8px] bg-white border border-[#E6E6E6]">
      <AddressFormSection
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        title="Address Details"
        prefix=""
        includeContactFields={false}
        setFormData={setFormData}
      />
      <div className=" pb-6 px-[50px]">
        <button
          onClick={handleSaveChanges}
          className="bg-green cursor-pointer text-white px-8 py-[14px] rounded-[43px] font-medium transition-colors duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
