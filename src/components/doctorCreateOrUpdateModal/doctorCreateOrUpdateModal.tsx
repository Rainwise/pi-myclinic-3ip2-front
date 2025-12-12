"use client";

import {
  Modal,
  TextInput,
  Checkbox,
  Group,
  Button,
  Stack,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { CustomModalProps, DoctorModalValues } from "@/types/doctor/doctor";
import { IconChecks, IconX } from "@tabler/icons-react";

export default function DoctorsCreateOrUpdateModal({
  modalProps,
  initialValues,
  onSubmit,
  loading = false,
}: CustomModalProps) {
  const form = useForm<DoctorModalValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      licenseNumber: "",
      specializationId: initialValues?.specializationId ?? 1,
      isActive: true,
      ...initialValues,
    },
    validate: {
      firstName: (value) =>
        value.trim().length <= 2 ? "First must be at least 2 characters" : null,
      lastName: (value) =>
        value.trim().length <= 2
          ? "Last name must be at least 2 characters"
          : null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
      phoneNumber: (value) =>
        value.trim().length < 5
          ? "Phone number must be at least 5 digits"
          : null,
      licenseNumber: (value) =>
        value.trim().length === 0 ? "License number is required" : null,
    },
  });

  const handleSubmit = async (values: DoctorModalValues) => {
    try {
      if (!onSubmit) {
        console.error("No onSubmit handler provided");
        return;
      }
      await onSubmit(values);
      modalProps.onClose();
      form.reset();
    } catch (error) {
      console.error("Failed to create/update doctor:", error);
    }
  };

  useEffect(() => {
    if (modalProps.opened) {
      if (initialValues) {
        form.setValues({
          ...initialValues,
          id: initialValues.id,
        });
      } else {
        form.reset();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalProps.opened]);

  // TODO - Implmentirati api
  const specializations = [
    { id: 1, fullname: "Opca medicina" },
    { id: 2, fullname: "Psihijatrija" },
    { id: 3, fullname: "Plastisni kirurg" },
  ];

  return (
    <Modal
      opened={modalProps.opened}
      onClose={() => {
        modalProps.onClose();
        form.reset();
      }}
      centered
      title={initialValues ? "Edit Doctor" : "Create New Doctor"}
      closeOnEscape={false}
      closeOnClickOutside={false}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="First Name"
            placeholder="First name"
            {...form.getInputProps("firstName")}
          />

          <TextInput
            label="Last Name"
            placeholder="Last name"
            {...form.getInputProps("lastName")}
          />

          <Select
            label="Specialization"
            placeholder="Select specialization"
            data={
              specializations?.map((specialization) => ({
                value:
                  specialization.id != null ? specialization.id.toString() : "",
                label: specialization.fullname,
              })) || []
            }
            value={
              form.values.specializationId
                ? form.values.specializationId.toString()
                : ""
            }
            onChange={(value) =>
              form.setFieldValue(
                "specializationId",
                value ? parseInt(value) : 0
              )
            }
          />

          <TextInput
            label="Email"
            placeholder="Email address"
            {...form.getInputProps("email")}
          />

          <TextInput
            label="Phone Number"
            placeholder="Phone number"
            {...form.getInputProps("phoneNumber")}
          />

          <TextInput
            label="Licence Number"
            placeholder="Licence number"
            {...form.getInputProps("licenseNumber")}
          />

          <Checkbox
            label="Doctor Active"
            {...form.getInputProps("isActive", { type: "checkbox" })}
          ></Checkbox>

          <Group mt="md" justify="flex-end">
            <Button
              leftSection={<IconX size={20} />}
              color="var(--mantine-color-red-7)"
              onClick={() => {
                modalProps.onClose();
                form.reset();
              }}
            >
              {"Cancel"}
            </Button>
            <Button
              leftSection={<IconChecks size={20} />}
              type="submit"
              color="var(--mantine-color-primary-2)"
              loading={loading}
              disabled={loading}
            >
              {"Submit"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
