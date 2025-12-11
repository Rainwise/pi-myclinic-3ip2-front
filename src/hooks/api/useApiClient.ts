"use client";
import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export function useApiClient(): AxiosInstance {
  const client = useMemo(() => {
    const instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(
      (config) => {
        const storedUser = localStorage.getItem("myClinicUser");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return instance;
  }, []);

  return client;
}
