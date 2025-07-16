import ErrorComponent from "../Common/ErrorComponent";
import InputGroup from "./InputGroup";

const AddressFormSection = ({
  formData,
  handleChange,
  errors,
  title,
  prefix = "",
  includeContactFields = true,
}) => {
  const getFieldName = (fieldName) =>
    `${prefix}${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`;

  const renderSelect = (label, name, value, options, error) => (
    <div className="mb-[22px] group relative">
      <label
        htmlFor={name}
        className={`block text-[#6B7280] text-sm pb-2 transition-opacity duration-300 ${
          value ? "opacity-100" : "opacity-50 group-focus-within:opacity-100"
        }`}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className={`w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 outline-none appearance-none bg-white pr-10 ${
          error ? "border-red-500" : "border-[#D1D5DB]"
        } ${
          value
            ? "opacity-100 !border-[#333333]"
            : "opacity-50 focus:opacity-100"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 top-[40px]">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
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
        formData[getFieldName("country")] || "United States (US)",
        [
          { label: "United States (US)", value: "United States (US)" },
          { label: "Canada", value: "Canada" },
          { label: "India", value: "India" },
          { label: "Mexico", value: "Mexico" },
        ],
        errors[getFieldName("country")]
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {renderSelect(
          "State*",
          getFieldName("state"),
          formData[getFieldName("state")] || "California",
          [
            { label: "California", value: "California" },
            { label: "New York", value: "New York" },
            { label: "Texas", value: "Texas" },
            { label: "Maharashtra", value: "Maharashtra" },
          ],
          errors[getFieldName("state")]
        )}
        <InputGroup
          label="ZIP Code*"
          name={getFieldName("zipCode")}
          value={formData[getFieldName("zipCode")] || ""}
          onChange={handleChange}
          error={errors[getFieldName("zipCode")]}
        />
      </div>
    </>
  );
};

export default AddressFormSection;
