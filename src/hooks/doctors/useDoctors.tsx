"use client";

//Mantine Related Imports
import { notifications } from "@mantine/notifications";

// Hook Imports
import { useState, useEffect, useCallback } from "react";
import { useApiClient } from "@/hooks/api/useApiClient";

// Type Imports
import { Doctor, DoctorModalValues } from "@/types/doctor/doctor";

interface UseEventsOptions {
  onSuccess?: () => void;
}

export function useDoctor(options?: UseEventsOptions) {
  const api = useApiClient();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const triggerSuccess = useCallback(() => {
    if (options?.onSuccess) options.onSuccess();
  }, [options]);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Doctor[]>("/doctors");
      setDoctors(res.data);
    } catch (err) {
      const e = err as Error;
      setError(e);
      notifications.show({
        title: "Error",
        message: "Failed to load doctors",
        color: "red",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  }, [api]);

  const createDoctor = useCallback(
    async (event: DoctorModalValues) => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.post<Doctor>("/doctors", event);
        setDoctors((prev) => [...prev, res.data]);

        notifications.show({
          title: "Success",
          message: "Doctor created successfully",
          color: "green",
        });

        triggerSuccess();
      } catch (err) {
        const e = err as Error;
        setError(e);
        console.error("Create doctor error:", e);
        notifications.show({
          title: "Error",
          message: "Failed to create doctor",
          color: "red",
          autoClose: 4000,
        });
      } finally {
        setLoading(false);
      }
    },
    [api, triggerSuccess]
  );

  const updateDoctor = useCallback(
    async (updatedData: Partial<DoctorModalValues>) => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.put<Doctor>(
          `/doctors/${updatedData.id}`,
          updatedData
        );
        setDoctors((prev) =>
          prev.map((e) => (e.idDoctor === updatedData.id ? res.data : e))
        );

        notifications.show({
          title: "Success",
          message: "Doctor updated successfully",
          color: "green",
        });

        triggerSuccess();
      } catch (err) {
        const e = err as Error;
        setError(e);
        notifications.show({
          title: "Error",
          message: "Failed to update doctor",
          color: "red",
          autoClose: 4000,
        });
      } finally {
        setLoading(false);
      }
    },
    [api, triggerSuccess]
  );

  const deleteDoctor = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await api.delete(`/doctors/${id}`);
        setDoctors((prev) => prev.filter((e) => e.idDoctor !== id));

        notifications.show({
          title: "Success",
          message: "Doctor deleted successfully",
          color: "green",
        });

        triggerSuccess();
      } catch (err) {
        const e = err as Error;
        setError(e);
        notifications.show({
          title: "Error",
          message: "Failed to delete doctor",
          color: "red",
          autoClose: 4000,
        });
      } finally {
        setLoading(false);
      }
    },
    [api, triggerSuccess]
  );

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctors,
    loading,
    error,
    refetch: fetchDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  };
}
