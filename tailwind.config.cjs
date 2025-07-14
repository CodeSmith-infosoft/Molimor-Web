const plugin = require("tailwindcss/plugin");

module.exports = {
  theme: {
    extend: {
      colors: {
        green: "#076536",
        "light-gray": "#E5E7EB"
      },
      textColor: {
        green: "#076536",
      },
      screens: {
        "max-main": { max: "1440.9999px" },
        "max-lg": { max: "1024.9999px" },
        "max-md": { max: "768.9999px" },
        "max-mobile": { max: "440.9999px" },
        "max-xs": { max: "320.9999px" },
      },
      borderImage: {
        gradient: "linear-gradient(90.08deg, #29348B 9.33%, #00D9E9 99.9%)",
      },
      keyframes: {
        "swipe-stripe": {
          "0%": { transform: "translateX(-100%)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        "swipe-stripe": "swipe-stripe 2.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
