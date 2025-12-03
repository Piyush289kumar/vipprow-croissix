// api/client.ts

import axios from "axios";
import { API_URL } from "@/config/.env";
import { clearToken, getToken } from "@/services/auth.util";
import { store } from "@/store";
import { logout } from "@/store/slices/auth.slice";

// ----------------------------------
// Create Axios Instance
// ----------------------------------
export const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// ----------------------------------
// Attach Token to All Requests
// ----------------------------------
API.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ----------------------------------
// Handle Global Response Errors
// ----------------------------------
API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error?.response?.status;

    // Token invalid or expired -> auto logout
    if (status === 401 || status === 403) {
      await clearToken();
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);
