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
    })
  }),
});

export const {
  useGetAuthorApiOptionsQuery
} = authorApi;
