"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Mantine Imports
import { Container, Paper, Image, LoadingOverlay } from "@mantine/core";

// Hook Imports
import { useAuthContext } from "@/hooks/context/useAuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, checkingData } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, checkingData, router]);

  if (checkingData || user) {
    return (
      <LoadingOverlay
        visible
        zIndex={1000}
        loaderProps={{ color: "#351A75", type: "oval" }}
      />
    );
  }

  return (
    <Container
      fluid
      mih={"100vh"}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        shadow="xs"
        p="xl"
        radius="md"
        withBorder
        maw={"500px"}
        w={"100%"}
        mah={"1024px"}
        h={"100%"}
      >
        <Image
          src={"/assets/redCross.png"}
          h={"150px"}
          alt="logoImage"
          fit="contain"
          mb={"xl"}
        />
        {children}
      </Paper>
    </Container>
  );
}
