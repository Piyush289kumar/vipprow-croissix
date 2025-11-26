// api/client.ts

import axios from "axios";
// import { API_URL } from "../config/env";
import { API_URL } from "@/config/.env";
import { getToken } from "../services/storage.service";

export const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

API.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
