import axios from "axios";

const instance = axios.create({
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // Add organization header
    config.headers["x-organization-id"] = "fb751e57-85e2-46e7-8f6d-36dcf6fe19fc";
    // config.headers["x-organization-id"] = "920f1758-af88-4ed7-9339-6ce07d45aff5";
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,            // just return the response
  (error) => Promise.reject(error)   // propagate error for axiosBaseQuery
);

export { instance };
