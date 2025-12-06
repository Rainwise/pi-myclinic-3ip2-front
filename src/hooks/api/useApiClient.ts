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

    // TODO : Ubaciti interceptore za auth token!

    return instance;
  }, []);

  return client;
}
