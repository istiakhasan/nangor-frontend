import { baseApi } from "./baseApi";


export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSimpleProduct: build.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
         data,
      }),
      invalidatesTags: ['products'],
    }),

    // getProductCount: build.query({
    //   query: () => ({
    //     url: "/products/count",
    //     method: "GET"
    //   }),
    //   providesTags: [tagTypes.products],
    // }),
    // updateProduct: build.mutation({
    //   query: (data) => ({
    //     url: `/products/${data?.id}`,
    //     method: "PATCH",
    //     data: data?.data
    //   }),
    //   invalidatesTags: [tagTypes.products],
    // }),
    getAllProduct: build.query({
      query: (arg) => ({
        url: "/products",
        method: "GET",
        params: arg,
      }),
      providesTags: ['products'],
    }),
    getProductById: build.query({
      query: (arg) => ({
        url: `/products/${arg?.id}?type=${arg?.type}`,
        method: "GET",
        
      }),
      providesTags: ['products'],
    }),
    deleteProductById: build.mutation({
      query: (arg) => ({
        url: `/products/${arg?.id}`,
        method: "DELETE",
        
      }),
      invalidatesTags: ['products'],
    }),
    // getAllProductBySearch: build.query({
    //   query: (arg) => ({
    //     url: "/products/search",
    //     method: "GET",
    //     params: arg,
    //   }),
    //   providesTags: [tagTypes.products],
    // }),
    // deleteProductById: build.mutation({
    //   query: (data) => ({
    //     url: `/products/${data?.id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.products],
    // }),
  }),
});

export const {
  useGetAllProductQuery,
  useCreateSimpleProductMutation,
  // useCreateVariantProductMutation,
  // useDeleteProductByIdMutation,
  // useGetAllProductBySearchQuery,
  useGetProductByIdQuery,
  useDeleteProductByIdMutation
  // useUpdateProductMutation,
  // useGetProductCountQuery
} = productApi;
