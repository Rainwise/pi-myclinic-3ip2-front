"use client";
import { Stack, Box, Button } from "@mantine/core";
import { DoctorsTable } from "@/components/doctorsTable/doctorsTable";

// Hook Imports
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { useDoctor } from "@/hooks/doctors/useDoctors";
import { useBreadcrumbs } from "@/hooks/context/useBreadcrumbsContext";

// Type Imports
import { DoctorModalValues } from "@/types/doctor/doctor";

// Icon Imports
import { IconCirclePlus, IconStethoscope } from "@tabler/icons-react";

// Modal Imports
import DoctorCreateOrUpdateModal from "@/components/doctorCreateOrUpdateModal/doctorCreateOrUpdateModal";

export default function DoctorsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { setBreadcrumbs } = useBreadcrumbs();
  const {
    doctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    loading: isLoadingDoctors,
    refetch: refetchDoctors,
  } = useDoctor({
    onSuccess: () => {
      refetchDoctors();
    },
  });

  useShallowEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/dashboard" },
      { label: "Doctors", href: "/dashboard/doctors" },
    ]);
  }, []);

  const handleUpdateDoctor = async (payload: DoctorModalValues) => {
    if (payload.id) {
      await updateDoctor(payload);
    }
  };

  const handleDeleteDoctor = async (id: number) => {
    if (id) {
      await deleteDoctor(id);
    }
  };

  return (
    <Stack gap={"md"}>
      <Box
        style={{ display: "flex", justifyContent: "space-between" }}
        bg={"var(--mantine-color-white)"}
        p={"md"}
        bdrs={"xl"}
      >
        <Button
          c="var(--mantine-color-text-4)"
          fz={"sm"}
          fw={300}
          radius="xl"
          size="md"
          color={"var(--mantine-color-green-2)"}
          leftSection={<IconCirclePlus size={18} />}
          rightSection={<IconStethoscope size={18} />}
          onClick={() => open()}
          loading={false}
          disabled={false}
        >
          {"Create new doctor"}
        </Button>
      </Box>
      <DoctorsTable
        doctorsData={doctors}
        isLoading={isLoadingDoctors}
        updateDoctor={handleUpdateDoctor}
        deleteDoctor={handleDeleteDoctor}
      />
      {opened && (
        <DoctorCreateOrUpdateModal
          modalProps={{
            opened: opened,
            onClose: close,
          }}
          initialValues={undefined}
          onSubmit={createDoctor}
          loading={isLoadingDoctors}
        />
      )}
    </Stack>
  );
}
