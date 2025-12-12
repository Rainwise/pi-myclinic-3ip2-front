"use client";

import { Center, Button, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <Center style={{ height: "100vh" }}>
      <Stack justify="center" align="center" gap={"xl"}>
        <Text mb={"md"} size={"xl"}>
          {"My Clinic - Alpha"}
        </Text>
        <Button
          variant="filled"
          color="violet"
          size="lg"
          radius="md"
          onClick={() => router.push("/dashboard")}
        >
          {"Connect to Admin Dashboard"}
        </Button>
      </Stack>
    </Center>
  );
}
