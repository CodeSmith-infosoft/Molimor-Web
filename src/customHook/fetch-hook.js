import { useState, useCallback } from "react";
import api from "../service/api";

function useAxios(initialConfig) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (overrideConfig = {}) => {
      setLoading(true);
      setError(null);

      const config = {
        method: overrideConfig.method || initialConfig.method,
        url: overrideConfig.url || initialConfig.url,
        data: overrideConfig.data ?? initialConfig.data,
        headers: overrideConfig.headers ?? initialConfig.headers,
        params: overrideConfig.params ?? initialConfig.params,
      };

      try {
        const response = await api(config);
        setData(response.data.data);
        return response.data.data;
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unknown error");
        return err.response?.data;
      } finally {
        setLoading(false);
      }
    },
    [initialConfig]
  );

  return { data, loading, error, fetchData };
}

export default useAxios;
