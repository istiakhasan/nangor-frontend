import { baseApi } from "./baseApi"; 

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (data) => ({
        url: "/auth/log-in",
        method: "POST",
        data,
      }),
      invalidatesTags: ['auth'],
    }),
    getProfileInfo: build.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET"
      }),
      providesTags: ['auth'],
    }),
   
  }),
});

export const {
 useSignInMutation,
 useGetProfileInfoQuery
} = authApi;
