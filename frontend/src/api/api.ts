import axios, { AxiosError, AxiosResponse } from "axios";

export interface ApiReseponse<T> extends AxiosResponse {
  data: T;
  status: number;
  message?: string;
  error?: string;
}

export type Response<T> = Promise<ApiReseponse<T> | undefined>;


const api = axios.create({
  baseURL: "/api", // Relative path to match same origin (frontend & backend)
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  validateStatus: (status: number) => {
    // Treat everything EXCEPT 5xx as a success
    return status < 500 ? true : false;
  },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const parseAxiosError = (error: Error | unknown) => {
  console.log("error happened", error);

  if (error instanceof AxiosError) {
    const ae = error as AxiosError;
    const responseObject: string | unknown = ae.response && ae.response.data;
    console.error("axioserror", responseObject, typeof responseObject);
    if (typeof (responseObject) === "string") {
      throw new Error(responseObject.toString());
    }
  }
  throw error;
};

export default api;
