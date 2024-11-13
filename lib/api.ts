"use server";

import axios from "axios";
import { auth } from "./auth";

const api = axios.create({
  baseURL: "https://mature-eminent-treefrog.ngrok-free.app/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const session = await auth();

  if (session?.user.api_token) {
    config.headers["Authorization"] = `Bearer ${session.user.api_token}`;
  }

  config.headers["ngrok-skip-browser-warning"] = "true";
  return config;
});

export default api;
