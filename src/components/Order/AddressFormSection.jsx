import { useEffect, useRef, useState } from "react";
import ErrorComponent from "../Common/ErrorComponent";
import InputGroup from "./InputGroup";
import { Country, State } from "country-state-city";
import { ChevronDown } from "lucide-react";

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
    setFormData((prev) => ({ ...prev, [getFieldName("country")]: country.name, [getFieldName("state")]: "" }));

    const countryStates = State.getStatesOfCountry(country.isoCode);
    setStates(countryStates);
    setFilteredStates(countryStates);

    setIsCountryOpen(false);
    setSearchTerm("");
  };

  const handleStateSelect = (state) => {
    setFormData((prev) => ({ ...prev, [getFieldName("state")]: state.name }));
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
    setSearch,
    search,
    placeholder,
    dropdownRef
  ) => (
    <div className="mb-[22px] group relative" ref={dropdownRef}>
      <label
        htmlFor={name}
        className={`block text-sm pb-2 transition-opacity duration-300 `}
      >
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!isOpen)}
          className={`w-full px-3 py-[11px] text-sm font-normal text-left bg-white border rounded-[8px] border-gray-300 flex items-center justify-between ${
            error ? "border-red-500" : "border-[#E5E7EB]"
          }`}
        >
          <span className={value ? "" : "text-[#9f9f9f] "}>
            {value || placeholder || "Select Country"}
          </span>
          <ChevronDown className="h-4 w-4 text-[#9f9f9f]" />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={setSearch}
                className="w-full px-2 py-1 border border-gray-300 text-sm"
              />
            </div>
            {options.map((country) => (
              <button
                key={country.isoCode}
                onClick={() => handleSelect(country)}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm"
              >
                {country.name}
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
      {title && <h2 className="font-bold text-xl mb-6">{title}</h2>}
      {includeContactFields && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <InputGroup
            label="First name*"
            name={getFieldName("firstName")}
            value={formData[getFieldName("firstName")] || ""}
            onChange={handleChange}
            error={errors[getFieldName("firstName")]}
            placeholder={"Your first name"}
          />
          <InputGroup
            label="Last name*"
            name={getFieldName("lastName")}
            value={formData[getFieldName("lastName")] || ""}
            onChange={handleChange}
            error={errors[getFieldName("lastName")]}
            placeholder={"Your last name"}
          />
          <InputGroup
            label="Phone*"
            type="tel"
            name={getFieldName("phone")}
            value={formData[getFieldName("phone")] || ""}
            onChange={handleChange}
            error={errors[getFieldName("phone")]}
            placeholder={"Your phone number"}
          />
          <InputGroup
            label="Email address*"
            type="email"
            name={getFieldName("email")}
            value={formData[getFieldName("email")] || ""}
            onChange={handleChange}
            placeholder="Your email address"
            error={errors[getFieldName("email")]}
          />
        </div>
      )}

      {renderSelect(
        "Country / Region*",
        getFieldName("country"),
        formData[getFieldName("country")],
        filteredCountries,
        errors[getFieldName("country")],
        handleCountrySelect,
        setIsCountryOpen,
        isCountryOpen,
        handleCountrySearch,
        searchTerm,
        "Select your country",
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
        placeholder={"Apartment, suite, unit, etc. (optional)"}
      />
      <InputGroup
        label="Town / City*"
        name={getFieldName("city")}
        value={formData[getFieldName("city")] || ""}
        onChange={handleChange}
        error={errors[getFieldName("city")]}
        placeholder={"Your City"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {renderSelect(
          "State*",
          getFieldName("state"),
          formData[getFieldName("state")],
          filteredStates,
          errors[getFieldName("state")],
          handleStateSelect,
          setIsStateOpen,
          isStateOpen,
          handleStateSearch,
          searchState,
          "Select your state",
          stateDropdownRef
        )}
        <InputGroup
          label="ZIP Code*"
          name={getFieldName("zipCode")}
          value={formData[getFieldName("zipCode")] || ""}
          onChange={handleChange}
          error={errors["zipCode"]}
          placeholder={"Your Zip Code"}
        />
      </div>
    </>
  );
};

export default AddressFormSection;
