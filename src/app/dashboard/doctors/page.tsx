"use client";
import { Stack } from "@mantine/core";
import { DoctorsTable } from "@/components/doctorsTable/doctorsTable";
export default function DoctorsPage() {
  return (
    <Stack gap={"md"}>
      <DoctorsTable />
    </Stack>
  );
}
