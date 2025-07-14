import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    const lang = localStorage.getItem("lang") || "en";

    if (config.params) {
      config.params.lang = lang;
    } else {
      config.params = { lang };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - redirecting to login...");
    }
    if (error.response) {
      // optional error handling block
    }
    return Promise.reject(error);
  }
);

export default api;
