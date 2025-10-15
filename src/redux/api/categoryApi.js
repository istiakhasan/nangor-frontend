import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"; // assuming fetchBaseQuery is exported from baseApi

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMainCategory: build.query({
      query: (arg) => ({
        url: "/category",
        method: "GET",
        params: arg
      }),
      providesTags: ['categories'],
    }),
    getCategoryOptions: build.query({
      query: (arg) => ({
        url: "/category/options",
        method: "GET",
        params: arg
      }),
      providesTags: ['categories'],
    }),
    createMainCategory: build.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        data,
      }),
      invalidatesTags: ['categories'],
    }),
    // updateCategory: build.mutation({
    //   query: (data) => ({
    //     url: `/category/${data?.id}`,
    //     method: "PATCH",
    //     data: data?.data
    //   }),
    //   invalidatesTags: [tagTypes.mainCategory],
    // }),
    deleteCategory: build.mutation({
      query: (data) => ({
        url: `/category/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['categories'],
    }),
    
  }),
});

export const {
    useGetAllMainCategoryQuery,
    useGetCategoryOptionsQuery,
    useCreateMainCategoryMutation,
    // useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi;
