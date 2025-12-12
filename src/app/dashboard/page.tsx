"use client";
import { Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useBreadcrumbs } from "@/hooks/context/useBreadcrumbsContext";

export default function DashboardPage() {
  const { setBreadcrumbs } = useBreadcrumbs();

  useShallowEffect(() => {
    setBreadcrumbs([{ label: "Dashboard", href: "/dashboard" }]);
  }, []);
  return <Stack gap={"md"}>DASHBOARD WELCOME PAGE</Stack>;
}
