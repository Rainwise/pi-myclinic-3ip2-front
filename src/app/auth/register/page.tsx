"use client";
import { useRouter } from "next/navigation";
// Mantine Imports
import {
  Box,
  Flex,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
  em,
} from "@mantine/core";
import { useForm } from "@mantine/form";

// Style Imports
import { IconUserPlus } from "@tabler/icons-react";

// Hook Imports
import { useAuthContext } from "@/hooks/context/useAuthContext";

export default function RegisterFormPage() {
  const router = useRouter();
  const { register, loading } = useAuthContext();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      email: "",
      repeatPassword: "",
    },

    validate: {
      username: (value) => (value.length < 1 ? "Username is required" : null),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
      password: (value) => (value.length < 1 ? "Password is required" : null),
      repeatPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const onRegisterSubmit = async (values: typeof form.values) => {
    await register(values.username, values.password, values.email);
  };
  return (
    <Box>
      <Flex mb={"xl"} align={"center"} direction={"column"}>
        <Text size="28px" fw={700} c="var(--mantine-color-text-0)">
          {"Create new account"}
        </Text>
        <Text size="md" fw={400} c="dimmed" mt={"sm"}>
          {"Enter your details to sign up"}
        </Text>
      </Flex>
      <form onSubmit={form.onSubmit(onRegisterSubmit)}>
        <TextInput
          label="Username"
          placeholder="Please enter your username"
          {...form.getInputProps("username")}
          withAsterisk
          mb="xl"
          size="lg"
        />

        <TextInput
          label="E-Mail"
          placeholder="Please enter your e-mail"
          {...form.getInputProps("email")}
          withAsterisk
          mb="xl"
          size="lg"
        />

        <PasswordInput
          label="Password"
          placeholder="Please enter your password"
          {...form.getInputProps("password")}
          withAsterisk
          size="lg"
        />

        <PasswordInput
          mt="md"
          label="Repeat password"
          placeholder="Please repeat your password"
          {...form.getInputProps("repeatPassword")}
          withAsterisk
          size="lg"
        />

        <Button
          mt={"xl"}
          leftSection={<IconUserPlus size={20} />}
          type="submit"
          size="lg"
          color="var(--mantine-color-violet-8)"
          w={"100%"}
          bdrs={"md"}
          loading={loading}
          disabled={loading}
        >
          {"Register"}
        </Button>
      </form>
      <Flex justify={"center"}>
        <Anchor
          onClick={() => router.push("/auth")}
          display="flex"
          size="md"
          mt={"lg"}
          c="var(--mantine-color-primary-2)"
          fw={500}
        >
          <Text c="var(--mantine-color-text-0)">{`Already have an account?`}</Text>
          <>
            <Text ml={5} c="var(--mantine-color-primary-2)">{`Login`}</Text>
          </>
        </Anchor>
      </Flex>
    </Box>
  );
}
