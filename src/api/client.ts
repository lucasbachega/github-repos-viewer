import axios, { type AxiosInstance } from "axios";
import { API } from "@/api/errorMessages";

const GITHUB_API_BASE = "https://api.github.com";

export const githubClient: AxiosInstance = axios.create({
  baseURL: GITHUB_API_BASE,
  timeout: 15_000,
  headers: {
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export interface GitHubApiError extends Error {
  status?: number;
}

githubClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data as { message?: string } | undefined;
      const message = data?.message ?? error.message ?? API.GENERIC;
      const enhanced = new Error(message) as GitHubApiError;
      enhanced.status = status;
      return Promise.reject(enhanced);
    }
    return Promise.reject(error);
  },
);
