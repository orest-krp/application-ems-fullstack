import axios, { type Method } from "axios";
import { authApi, api } from "./axios";
import type { FetchError } from "@ems-fullstack/types";

export const authfetcher = async <T>(
  url: string,
  data: T | FetchError,
  method: Method = "GET"
) => {
  try {
    const response = await authApi.request<T>({
      url,
      method,
      data
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data;
    } else {
      throw {
        statusCode: 500,
        error: "Uknown error",
        message: "Uknown error occured"
      };
    }
  }
};

export const fetcher = async <T>(
  url: string,
  data: T,
  method: Method = "GET"
) => {
  try {
    const response = await api.request<T>({
      url,
      method,
      data
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data;
    } else {
      throw {
        statusCode: 500,
        error: "Uknown error",
        message: "Uknown error occured"
      };
    }
  }
};
