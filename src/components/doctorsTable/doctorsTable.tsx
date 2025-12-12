// Mantine Related Imports
import { Stack, Flex, Group, Button } from "@mantine/core";

// Type Imports
import {
  Doctor,
  DoctorModalValues,
  DoctorTableData,
} from "@/types/doctor/doctor";

// Hook Imports
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

// Component Imports
import { DataTable } from "@/components/dataTable/dataTable";
import DoctorsCreateOrUpdateModal from "@/components/doctorCreateOrUpdateModal/doctorCreateOrUpdateModal";
import DeleteModal from "@/components/deleteModal/DeleteModal";

// Table Related Imports
import { createDoctorsTableColumns } from "@/components/doctorsTable/doctorsTableColumns";

export const DoctorsTable = ({
  doctorsData,
  isLoading,
  updateDoctor,
  deleteDoctor,
}: DoctorTableData) => {
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorModalValues | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [
    updateModalOpened,
    { open: openUpdateModal, close: closeUpdateModal },
  ] = useDisclosure(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);

  // TODO - API Implementacija
  const specializationMap: { [key: string]: number } = {
    "Opca medicina": 1,
    Psihijatrija: 2,
    "Plastisni kirurg": 3,
  };

  // Transform Doctor to DoctorModalValues
  const transformDoctorToModalValues = (doctor: Doctor): DoctorModalValues => {
    return {
      id: doctor.idDoctor,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      email: doctor.email,
      phoneNumber: doctor.phoneNumber,
      licenseNumber: doctor.licenseNumber,
      specializationId:
        specializationMap[doctor.specialization] ??
        specializationMap["Opca medicina"] ??
        1,
      isActive: doctor.isActive,
    };
  };

  const doctorsTableColumns = createDoctorsTableColumns({
    editDoctor: (doctor: Doctor) => {
      const modalValues = transformDoctorToModalValues(doctor);
      setSelectedDoctor(modalValues);
      openUpdateModal();
    },
    deleteDoctor: (doctor: Doctor) => {
      const modalValues = transformDoctorToModalValues(doctor);
      setSelectedDoctor(modalValues);
      setSelectedDoctorId(doctor.idDoctor);
      openDeleteModal();
    },
  });

  const handleCloseUpdateModal = () => {
    closeUpdateModal();
    setSelectedDoctor(null);
  };

  const handleUpdateDoctor = async (values: DoctorModalValues) => {
    await updateDoctor?.(values);
    setSelectedDoctor(null);
  };

  return (
    <Stack gap={"lg"}>
      <Stack
        bg={"var(--mantine-color-bg-1)"}
        p={"md"}
        pt="xl"
        bdrs={"xl"}
        gap={0}
      >
        <DataTable
          tableData={doctorsData}
          columnDefinitions={doctorsTableColumns}
          isLoading={isLoading}
        />
      </Stack>
      <DoctorsCreateOrUpdateModal
        modalProps={{
          opened: updateModalOpened,
          onClose: handleCloseUpdateModal,
        }}
        initialValues={selectedDoctor || undefined}
        onSubmit={handleUpdateDoctor}
        loading={isLoading}
      />
      <DeleteModal
        modalTitle="Delete Doctor"
        modalDescription="Are you sure you want to delete this doctor?"
        onSubmit={deleteDoctor}
        loading={isLoading}
        modalProps={{
          opened: deleteModalOpened,
          onClose: closeDeleteModal,
        }}
        objectId={selectedDoctorId ?? undefined}
      />
    </Stack>
  );
};
