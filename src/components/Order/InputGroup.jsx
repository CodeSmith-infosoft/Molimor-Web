import ErrorComponent from "../Common/ErrorComponent"

const InputGroup = ({ label, type = "text", name, value, onChange, placeholder, error, className = "" }) => {
  const inputClasses = `w-full px-4 py-[15px] rounded-lg border text-base transition-opacity duration-300 outline-none ${
    error ? "border-red-500" : "border-[#D1D5DB]"
  } ${value ? "opacity-100 !border-[#333333]" : "opacity-50 focus:opacity-100"}`

  return (
    <div className={`mb-[22px] group ${className}`}>
      <label
        htmlFor={name}
        className={`block text-[#6B7280] text-sm pb-2 transition-opacity duration-300 ${
          value ? "opacity-100" : "opacity-50 group-focus-within:opacity-100"
        }`}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          rows="5"
          className={`${inputClasses} resize-y`}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={inputClasses}
        />
      )}
      {error && <ErrorComponent message={error} />}
    </div>
  )
}

export default InputGroup
