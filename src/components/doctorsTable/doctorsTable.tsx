// Mantine Related Imports
import { Stack, Flex, Group, Button } from "@mantine/core";

// Type Imports
import { Doctor, DoctorModalValues } from "@/types/doctor/doctor";

// Hook Imports
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

// Component Imports
import { DataTable } from "@/components/dataTable/dataTable";
import DoctorsCreateOrUpdateModal from "@/components/doctorCreateOrUpdateModal/doctorCreateOrUpdateModal";

// Table Related Imports
import { createDoctorsTableColumns } from "@/components/doctorsTable/doctorsTableColumns";

// Icon Imports
import { IconCirclePlus, IconStethoscope } from "@tabler/icons-react";

export const DoctorsTable = () => {
  const [
    doctorModalOpened,
    { open: openDoctorModal, close: closeDoctorModal },
  ] = useDisclosure(false);
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorModalValues | null>(null);

  const handleOpenDoctorModal = (doctor: DoctorModalValues) => {
    setSelectedDoctor(doctor);
    openDoctorModal();
  };

  const handleCloseDoctorModal = () => {
    closeDoctorModal();
  };

  const doctorsTableColumns = createDoctorsTableColumns({
    editDoctor: handleOpenDoctorModal,
    deleteDoctor: (doctorId: number) => {
      // Delete doctor logic here
    },
  });

  const doctorsMock = [
    {
      id: 1,
      firstName: "Emily",
      lastName: "Stone",
      email: "emily.stone@example.com",
      phoneNumber: "+1-555-101-2020",
      licenseNumber: "LIC-784512",
      specialisation: "Cardiology",
      isActive: true,
    },
    {
      id: 2,
      firstName: "Michael",
      lastName: "Reyes",
      email: "michael.reyes@example.com",
      phoneNumber: "+1-555-303-4040",
      licenseNumber: "LIC-993845",
      specialisation: "Dermatology",
      isActive: true,
    },
    {
      id: 3,
      firstName: "Sophia",
      lastName: "Keller",
      email: "sophia.keller@example.com",
      phoneNumber: "+1-555-505-6060",
      licenseNumber: "LIC-112457",
      specialisation: "Neurology",
      isActive: false,
    },
    {
      id: 4,
      firstName: "Daniel",
      lastName: "Morris",
      email: "daniel.morris@example.com",
      phoneNumber: "+1-555-707-8080",
      licenseNumber: "LIC-667890",
      specialisation: "Pediatrics",
      isActive: true,
    },
    {
      id: 5,
      firstName: "Hannah",
      lastName: "Kim",
      email: "hannah.kim@example.com",
      phoneNumber: "+1-555-909-0101",
      licenseNumber: "LIC-445231",
      specialisation: "Orthopedics",
      isActive: false,
    },
  ];

  return (
    <Stack gap={"lg"}>
      <Flex
        justify={"space-between"}
        align={"center"}
        bg={"var(--mantine-color-bg-1)"}
        p={"md"}
        bdrs={"xl"}
        mih={"60px"}
        wrap={"wrap"}
        gap={"lg"}
      >
        <Group gap={"md"}>
          <Button
            c="var(--mantine-color-text-4)"
            fz={"sm"}
            fw={300}
            radius="xl"
            size="md"
            color={"var(--mantine-color-green-2)"}
            leftSection={<IconCirclePlus size={18} />}
            rightSection={<IconStethoscope size={18} />}
            onClick={() => openDoctorModal()}
            loading={false}
            disabled={false}
          >
            {"Create new doctor"}
          </Button>
        </Group>
      </Flex>

      <Stack
        bg={"var(--mantine-color-bg-1)"}
        p={"md"}
        pt="xl"
        bdrs={"xl"}
        gap={0}
      >
        <DataTable
          tableData={doctorsMock}
          columnDefinitions={doctorsTableColumns}
          isLoading={false}
        />
      </Stack>
      <DoctorsCreateOrUpdateModal
        modalProps={{
          opened: doctorModalOpened,
          onClose: handleCloseDoctorModal,
        }}
        initialValues={selectedDoctor || undefined}
        onSubmit={() => Promise.resolve()}
        loading={false}
      />
    </Stack>
  );
};
