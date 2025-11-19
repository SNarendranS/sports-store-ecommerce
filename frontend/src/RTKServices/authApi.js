import { baseApi } from "./baseApi"; // your existing baseApi

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register user
    register: builder.mutation({
      query: (userDetails) => ({
        url: "/auth/register",
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Admin register
    adminRegister: builder.mutation({
      query: (userDetails) => ({
        url: "/auth/admin/register",
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: "/auth",
        method: "GET",
        // attach token headers
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }),
      invalidatesTags: ["Auth", "User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useAdminRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
