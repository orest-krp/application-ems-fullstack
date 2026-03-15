import { api, authApi } from "@/lib/axios";
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type Method
} from "axios";

const makeFetcher =
  (client: AxiosInstance) =>
  async <Req = unknown, Res = unknown>(
    url: string,
    data?: Req,
    method: Method = "GET"
  ): Promise<Res> => {
    try {
      const response = await client.request<Res, AxiosResponse<Res>>({
        url,
        method,
        data
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw error.response.data;
      }

      throw {
        statusCode: 500,
        error: "Unknown error",
        message: "Unknown error occurred"
      };
    }
  };

export const fetcher = makeFetcher(api);
export const authfetcher = makeFetcher(authApi);
