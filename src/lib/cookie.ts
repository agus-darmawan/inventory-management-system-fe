import {
  deleteCookie as destroy,
  getCookie as get,
  setCookie as set,
} from "cookies-next";

export const setCookie = (
  key: string,
  value: string,
  args = {
    maxAge: 31536000,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  }
) => {
  set(key, value, args);
};

interface CookieOptions {
  maxAge?: number;
  path?: string;
  secure?: boolean;
}

export const getCookie = (key: string, options?: CookieOptions) => {
  return get(key, options);
};

export const deleteCookie = (key: string, options?: CookieOptions) => {
  return destroy(key, options);
};
