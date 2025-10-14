
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  function (config) {
    // const accessToken = getFormLocalStorage(authKey);
    // if (accessToken) {
    //   config.headers.Authorization =accessToken;
    // }
    config.headers['x-organization-id'] = 'fb751e57-85e2-46e7-8f6d-36dcf6fe19fc';

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error?.config;

    // if (error?.response?.status === 419 && !config?.sent) {
    //   config.sent = true;
    //   try {
    //     const response = await getNewAccessToken();
    //     const accessToken = response?.data?.data?.token;
    //     if (accessToken) {
    //       config.headers['Authorization'] = accessToken;
    //       setToLocalStorage(authKey, accessToken);
    //       return instance(config);
    //     } else {
    //       handleLogout();
    //     }
    //   } catch (tokenError) {
    //     handleLogout();
    //   }
    // } else {
    
    //   const responseObject = {
    //     statusCode: error?.response?.data?.statusCode || 500,
    //     message: error?.response?.data?.message || "Something went wrong",
    //     errorMessages: error?.response?.data?.errorMessages,
    //   };
    //   return Promise.reject(error);
    // }
  }
);


export { instance };
