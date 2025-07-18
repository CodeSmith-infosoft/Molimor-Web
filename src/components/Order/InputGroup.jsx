import ErrorComponent from "../Common/ErrorComponent"

const InputGroup = ({ label, type = "text", name, value, onChange, placeholder, error, className = "" }) => {
  const inputClasses = `w-full px-4 max-mobile:text-sm py-[11px] rounded-[8px] border text-base transition-opacity duration-300 outline-none ${
    error ? "border-[#fb2c36]" : "border-[#E5E7EB]"
  } `

  return (
    <div className={`max-lg:mb-[20px] mb-[22px] group ${className}`}>
      <label
        htmlFor={name}
        className={`block max-lg:text-[13px] text-sm pb-2 transition-opacity duration-300 `}
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
