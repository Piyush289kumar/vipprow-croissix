// api/auth.api.ts

import { API } from "@/api/client";

export const loginApi = (data) => API.post("/auth/login", data);
export const registerApi = (data) => API.post("/auth/register", data);
