// Mantine Imports
import { Button, Group } from "@mantine/core";

// Type Imports
import { DoctorModalValues } from "@/types/doctor/doctor";
import { ColumnDefinition } from "@/types/dataTable/dataTable";

import { IconX, IconEdit } from "@tabler/icons-react";

export const createDoctorsTableColumns = (actions: {
  editDoctor: (doctor: DoctorModalValues) => void;
  deleteDoctor: (doctorId: number) => void;
}): ColumnDefinition<DoctorModalValues>[] => [
  {
    key: "firstName",
    label: "First Name",
    align: "left",
    render: (_, row) => {
      return row.firstName;
    },
  },
  {
    key: "lastName",
    label: "Last Name",
    align: "left",
    render: (_, row) => {
      return row.lastName;
    },
  },
  {
    key: "email",
    label: "Email",
    align: "left",
    width: 250,
    render: (_, row) => {
      return row.email;
    },
  },
  {
    key: "phoneNumber",
    label: "Phone Number",
    align: "left",
    render: (_, row) => {
      return row.phoneNumber;
    },
  },
  {
    key: "licenseNumber",
    label: "License Number",
    align: "left",
    render: (_, row) => {
      return row.licenseNumber;
    },
  },
  {
    key: "specialisation",
    label: "Specialisation",
    align: "left",
    render: (_, row) => {
      return row.specialisation;
    },
  },
  {
    key: "actions",
    label: "Actions",
    align: "center",
    render: (_, row) => {
      return (
        <Group gap="xs" justify="center">
          <Button
            color="var(--mantine-color-secondary-1)"
            variant="light"
            miw={"100px"}
            leftSection={<IconEdit size={20} />}
            radius={"lg"}
            onClick={() => actions.editDoctor(row as DoctorModalValues)}
          >
            Edit
          </Button>
          <Button
            color="var(--mantine-color-red-9)"
            variant="light"
            miw={"100px"}
            leftSection={<IconX size={20} />}
            radius={"lg"}
            onClick={() => actions.deleteDoctor(row.id as number)}
          >
            Delete
          </Button>
        </Group>
      );
    },
  },
];
