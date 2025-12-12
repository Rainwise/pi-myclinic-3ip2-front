"use client";
import {
  Box,
  Group,
  ThemeIcon,
  Flex,
  Image,
  Avatar,
  Stack,
  Text,
  Drawer,
  Divider,
  NavLink,
} from "@mantine/core";

// Hooks Imports
import { useViewportSize, useDisclosure } from "@mantine/hooks";
import { useAuthContext } from "@/hooks/context/useAuthContext";

// Utils
import { GetBreakpoints } from "@/utils/getBreakpoints";

// Component Imports
import { DashboardSidebar } from "@/components/dashboardSidebar/dashboardSidebar";

// Icon Imports
import { IconMenu2, IconLogout2 } from "@tabler/icons-react";

//Type Imports
import { User } from "@/types/user/user";

const UserInfoBlock = ({ user }: { user: User | null }) => {
  return (
    <Group align="center" gap={"md"}>
      <Avatar size={"md"} src="" alt="it's me" />
      <Stack gap={0}>
        <Text fw={500} size="lg">
          {user?.username || ""}
        </Text>
        <Text c={"dimmed"} size="sm">
          {user?.role || ""}
        </Text>
      </Stack>
    </Group>
  );
};

export const DashboardHeader = () => {
  const { user, logout } = useAuthContext();
  const { width: screenWidth } = useViewportSize();
  const breakpoints = GetBreakpoints();
  const [
    mobileSidebarOpened,
    { open: openMobileSidebar, close: closeMobileSidebar },
  ] = useDisclosure(false);
  return (
    <Box
      p={"xl"}
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Flex
        w={"100%"}
        justify={"space-between"}
        align="center"
        direction="row"
        wrap="nowrap"
        gap={"md"}
      >
        {screenWidth < breakpoints.md && (
          <Flex align={"center"} gap={"md"}>
            <Image
              src={"/assets/authFormLogo.png"}
              alt="eventImage"
              fit="contain"
              h={"50px"}
              style={{ cursor: "pointer" }}
            />
          </Flex>
        )}
        {screenWidth >= breakpoints.md && (
          <Group ml={"auto"}>
            <UserInfoBlock user={user} />
          </Group>
        )}
        {screenWidth < breakpoints.md && (
          <ThemeIcon
            component="div"
            radius="xl"
            size="lg"
            color="var(--mantine-color-primary-1)"
            onClick={openMobileSidebar}
          >
            <IconMenu2 strokeWidth={1} />
          </ThemeIcon>
        )}
      </Flex>
      <Drawer
        size={screenWidth >= breakpoints.md ? "40%" : "100%"}
        opened={mobileSidebarOpened}
        onClose={closeMobileSidebar}
        title={<UserInfoBlock user={user} />}
        position="right"
      >
        <Divider mt={"lg"} mb={"lg"} />
        <DashboardSidebar />

        <Divider my={"lg"} />
        <NavLink
          label="Logout"
          fw={600}
          leftSection={<IconLogout2 size={30} stroke={1.5} />}
          bdrs="md"
          bg="var(--mantine-color-secondary-1)"
          style={{ color: "var(--mantine-color-text-4)" }}
          onClick={logout}
        />
      </Drawer>
    </Box>
  );
};
