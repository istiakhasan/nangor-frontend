import { baseApi } from "./baseApi";

export const authorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAuthorApiOptions: build.query({
      query: (arg) => ({
        url: "/authors/options",
        method: "GET",
        params: arg
      }),
      providesTags: ['author'],
    }),
    createAuthor: build.mutation({
      query: (data) => ({
        url: "/authors",
        method: "POST",
        data
      }),
      invalidatesTags: ['author'],
    }),
    getAllAuthor: build.query({
      query: (arg) => ({
        url: "/authors",
        method: "GET",
        params: arg
      }),
      providesTags: ['author'],
    }),
  }),
});

export const {
  useGetAuthorApiOptionsQuery,
  useGetAllAuthorQuery,
  useCreateAuthorMutation
} = authorApi;
