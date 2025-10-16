// helpers/axios/axiosBaseQuery.js
import { instance as axiosInstance } from "./axiosInstance";

export const axiosBaseQuery = ({ baseUrl } = { baseUrl: "" }) => async ({
  url,
  method,
  data,
  params,
  contentType,
}) => {
  try {
    const result = await axiosInstance({
      url: baseUrl + url,
      method,
      data,
      params,
      headers: {
        "Content-Type": contentType || "application/json",
      },
      withCredentials: true,
    });

    // Wrap successful response in { data }
    return { data: result.data };
  } catch (err) {
    // Wrap error in { error } so RTK Query can handle it
    return {
      error: {
        status: err.response?.status || 500,
        data: err.response?.data || err.message,
      },
    };
  }
};
