import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ValidationError } from "yup";
import { forgotSchema, loginSchema } from "@/utils/yupSchema";
import useAxios from "../../customHook/fetch-hook";
import ErrorComponent from "@/components/Common/ErrorComponent";

const initialValue = {
  email: "",
};

const ForgotPassword = () => {
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchData: forgetEmail } = useAxios({
    method: "POST",
    url: "/user/forgetEmail",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = await forgotSchema.validate(formData, {
        abortEarly: false,
      });

      setErrors({});
      const payload = { ...validatedData };
      await forgetEmail({ data: payload }).then(async (res) => {
        const toast2 = res.data.token ? toast.success : toast.success;
        toast2(res.message);
        if (res.success) {
          setFormData(initialValue);
          navigate("/login");
        }
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorObj = {};
        error.inner.forEach((err) => {
          if (err.path) errorObj[err.path] = err.message;
        });
        setErrors(errorObj);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    try {
      await loginSchema.validateAt(name, { ...formData, [name]: value });
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    }
  };

  return (
    <section className="login py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 flex justify-center items-center">
          <img
            src={"/images/login/loginBanner.svg"}
            alt="login"
            className="max-w-full h-auto"
          />
        </div>
        <div className="flex-1">
          <div className="max-w-[500px] w-full mx-auto border-none px-5">
            <h2 className="text-green text-center text-[26px] font-extrabold mb-[25px]">
              Forgot Password
            </h2>
            <p className="mb-[25px] capitalize">
              Enter the email address associated with your molimor account.
            </p>
            <form onSubmit={onSubmit} className="">
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
                    errors.email ? "border-red-500" : "border-light-gray"
                  } ${
                    formData.email
                      ? "opacity-100 !border-[#333333]"
                      : "opacity-50 focus:opacity-100"
                  }`}
                />
                {errors.email && <ErrorComponent message={errors.email} />}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-[25px] py-3 bg-green text-white font-bold rounded-lg text-sm uppercase"
              >
                {loading ? "Loading..." : "Continue"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
