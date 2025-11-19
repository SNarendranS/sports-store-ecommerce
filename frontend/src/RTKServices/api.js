import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthHeaders } from '../Utils/headerToken';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const headerToken = getAuthHeaders();
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Auth", "User", "Product", "Cart", "UserAddress", "Favorite"],
  endpoints: () => ({}), // extended in other files
});
