import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKey: string = import.meta.env.VITE_APIKEY
const APIBaseUrl: string = import.meta.env.VITE_API_BASE_URL

export interface UploadData {
  id: string,
  formData: FormData
}

export const excelHrApi = createApi({
  reducerPath: "excelHrApi",
  tagTypes: ['users', 'maintenances', 'logUser', 'accounts'],

  baseQuery: fetchBaseQuery({
    baseUrl: APIBaseUrl,
    prepareHeaders: (headers) => {
      headers.set('APIKey', `${APIKey}`)

      return headers
    },
  }),

  endpoints: () => ({

  }),
});