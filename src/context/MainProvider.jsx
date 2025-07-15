import { useEffect, useState } from "react";
import MainContext from "./MainContext";
const MainProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [categoryChange, setCategoryChange] = useState(true);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    localStorage.setItem("lang", language || "en");
    localStorage.setItem("currency", currency || "USD");
  }, [language, currency]);

  return (
    <MainContext.Provider
      value={{
        cartCount,
        setCartCount,
        categoryChange,
        setCategoryChange,
        language,
        setLanguage,
        currency,
        setCurrency,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
