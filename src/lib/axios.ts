import Axios from "axios";
import { env } from "./env";

import { getCookie } from "@/lib/cookie";

const isServer = typeof window === "undefined";

const axios = Axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
});

axios.interceptors.request.use(async (config) => {
  if (isServer) {
    const token = await getCookie("auth.__token", {});

    if (token) {
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
  } else {
    const token = getCookie("auth.__token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

export default axios;
