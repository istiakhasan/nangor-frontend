import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCustomer: build.mutation({
      query: (data) => ({
        url: "/customers",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    addAddress: build.mutation({
      query: (data) => ({
        url: "/customers/create-adress",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    editCustomer: build.mutation({
      query: (data) => ({
        url: `/customers/${data?.id}`,
        method: "PATCH",
        data:data?.data,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    getAllCustomers: build.query({
      query: (params) => ({
        url: "/customers",
        method: "GET",
        params
      }),
      providesTags: [tagTypes.customer],
    }),
    getCustomerRetentionReports: build.query({
      query: (params) => ({
        url: "/customers/retention-reports",
        method: "GET",
        params
      }),
      providesTags: [tagTypes.customer],
    }),
    getCustomerById: build.query({
      query: (params) => ({
        url: `/customers/${params.id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customer],
    }),
    topCustomersReports: build.query({
      query: (params) => ({
        url: `/customers/top-customers-reports`,
        method: "GET",
        params
      }),
      providesTags: [tagTypes.customer],
    }),
  }),
});

export const {
    useCreateCustomerMutation,
    useGetAllCustomersQuery,
    useGetCustomerByIdQuery,
    useEditCustomerMutation,
    useGetCustomerRetentionReportsQuery,
    useLazyGetCustomerRetentionReportsQuery,
    useTopCustomersReportsQuery,
    useLazyTopCustomersReportsQuery,
    useAddAddressMutation

} = customerApi;
