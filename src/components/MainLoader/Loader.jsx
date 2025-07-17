import React from "react";
import logo from "/images/logo.png";
const Loader = () => {
  return (
    <div className="main-loader">
      <img src={logo} className="logo-loader" alt="Loading..." />
    </div>
  );
};

export default Loader;
