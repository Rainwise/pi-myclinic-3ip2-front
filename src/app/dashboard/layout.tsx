"use client";
import {
  AppShell,
  ScrollArea,
  Image,
  Stack,
  NavLink,
  LoadingOverlay,
} from "@mantine/core";

// Hook Imports
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/context/useAuthContext";
import { useMediaQuery, useLocalStorage, useDisclosure } from "@mantine/hooks";

// Util imports
import { GetBreakpoints } from "@/utils/getBreakpoints";

// Component Imports
import { DashboardSidebar } from "@/components/dashboardSidebar/dashboardSidebar";
import { DashboardHeader } from "@/components/dashboardHeader/dashboardHeader";

// Style Imports
import * as style from "@/components/dashboardSidebar/dashboardSidebarStyles";

// Icon Imports
import {
  IconLogout2,
  IconLayoutSidebarLeftExpandFilled,
  IconLayoutSidebarRightExpandFilled,
} from "@tabler/icons-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, checkingData, logout, loading } = useAuthContext();
  const [opened] = useDisclosure(false);
  const breakpoints = GetBreakpoints();
  const isSmallScreen = useMediaQuery(`(max-width: ${breakpoints.lg}px`);
  const sidebarStyles = style.dashboardSidebarStyles;

  const [sidebarOpened, setSidebarOpened] = useLocalStorage<boolean>({
    key: "lobby-sidebar-opened",
    defaultValue: true,
  });

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, checkingData, router]);

  if (!user) {
    return (
      <LoadingOverlay
        visible
        zIndex={1000}
        loaderProps={{ color: "var(--mantine-color-primary-1)", type: "oval" }}
      />
    );
  }

  const handleSidebarToggle = () => {
    setSidebarOpened((prev) => !prev);
  };

  return (
    <AppShell
      layout="alt"
      withBorder={true}
      navbar={{
        width: {
          base: "80px",
          sm: "80px",
          md: "80px",
          lg: isSmallScreen ? "80px" : sidebarOpened ? "80px" : "180px",
          xl: isSmallScreen ? "80px" : sidebarOpened ? "80px" : "180px",
        },
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
      header={{ height: 70 }}
      footer={{ height: 80 }}
      padding={"sm"}
    >
      <AppShell.Navbar p={"sm"} bg={"var(--mantine-color-bg-1)"}>
        <AppShell.Section mb={"xl"}>
          <Image
            src={"/assets/redCross.png"}
            alt="eventImage"
            fit="contain"
            h={"70px"}
            onClick={() => router.push("/dashboard")}
            style={{ cursor: "pointer" }}
          />
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <DashboardSidebar />
        </AppShell.Section>
        <AppShell.Section>
          <Stack>
            {!isSmallScreen && (
              <NavLink
                active={false}
                label="Sidebar"
                fw={600}
                leftSection={
                  sidebarOpened ? (
                    <IconLayoutSidebarLeftExpandFilled size={30} stroke={1.5} />
                  ) : (
                    <IconLayoutSidebarRightExpandFilled
                      size={30}
                      stroke={1.5}
                    />
                  )
                }
                bdrs={"md"}
                bg={sidebarStyles.secondaryAction}
                style={{ color: sidebarStyles.activeText }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    sidebarStyles.secondaryInactiveLinkHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    sidebarStyles.secondaryAction;
                }}
                onClick={() => handleSidebarToggle()}
              />
            )}

            <NavLink
              active={false}
              label="Logout"
              fw={600}
              disabled={false}
              leftSection={<IconLogout2 size={30} stroke={1.5} />}
              bdrs={"md"}
              bg={sidebarStyles.secondaryAction}
              style={{ color: sidebarStyles.activeText }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  sidebarStyles.secondaryInactiveLinkHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  sidebarStyles.secondaryAction;
              }}
              onClick={() => {
                localStorage.removeItem("myClinicUser");
                logout();
                router.push("/auth");
              }}
            />
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Header bg={"var(--mantine-color-bg-1"}>
        <DashboardHeader />
      </AppShell.Header>

      <AppShell.Main bg={"var(--mantine-color-bg-2)"}>
        <Stack mt={"sm"} display={"flex"} p="xs">
          {children}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
