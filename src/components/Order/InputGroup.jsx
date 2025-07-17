import ErrorComponent from "../Common/ErrorComponent"

const InputGroup = ({ label, type = "text", name, value, onChange, placeholder, error, className = "" }) => {
  const inputClasses = `w-full text-sm px-4 py-[11px] rounded-[8px] border text-base transition-opacity duration-300 outline-none ${
    error ? "border-red-500" : "border-[#E5E7EB]"
  } `

  return (
    <div className={`mb-[22px] group ${className}`}>
      <label
        htmlFor={name}
        className={`block text-sm pb-2 transition-opacity duration-300 `}
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
