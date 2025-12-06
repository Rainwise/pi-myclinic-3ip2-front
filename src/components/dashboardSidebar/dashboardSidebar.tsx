import { Stack, NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as style from "@/components/dashboardSidebar/dashboardSidebarStyles";
import { IconLayoutDashboard, IconStethoscope } from "@tabler/icons-react";
import { navbarItems, IconOptions } from "@/types/dashboard/dashboard";

const navItems: navbarItems[] = [
  { label: "Dashboard", href: "/dashboard", icon: "home" },
  { label: "Doctors", href: "/dashboard/doctors", icon: "doctor" },
];

export const DashboardSidebar = () => {
  const dashboardStyles = style.dashboardSidebarStyles;
  const pathname = usePathname();
  const isActive = (href: string) => {
    return (
      pathname === href ||
      (pathname.startsWith(`${href}/`) && href !== "/dashboard")
    );
  };

  const getDashboardIcon = (
    icon: navbarItems["icon"],
    options: IconOptions = {}
  ) => {
    const { bold = false, active = false, reduced = false } = options;
    const strokeWidth = bold ? 1.5 : 1;
    const color = reduced
      ? active
        ? "var(--mantine-color-text-4)"
        : "var(--mantine-color-text-0)"
      : undefined;

    switch (icon) {
      case "home":
        return (
          <IconLayoutDashboard
            strokeWidth={strokeWidth}
            color={color}
            size={30}
          />
        );
      case "doctor":
        return (
          <IconStethoscope strokeWidth={strokeWidth} color={color} size={30} />
        );

      default:
        return null;
    }
  };

  return (
    <Stack justify="center" align="center" gap={"xs"}>
      {navItems.map((item) => (
        <NavLink
          fz={"xl"}
          leftSection={getDashboardIcon(item.icon, {
            bold: isActive(item.href),
            active: isActive(item.href),
            reduced: true,
          })}
          fw={isActive(item.href) ? 600 : 400}
          bdrs={"md"}
          href={item.href}
          key={item.label}
          component={Link}
          active={isActive(item.href)}
          label={item.label}
          color={dashboardStyles.activeText}
          style={{
            color: isActive(item.href)
              ? dashboardStyles.activeText
              : dashboardStyles.inactiveText,
          }}
          bg={isActive(item.href) ? dashboardStyles.activeLink : "transparent"}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
              !isActive(item.href)
                ? dashboardStyles.inactiveLinkHoverAlt
                : "none";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
              isActive(item.href) ? dashboardStyles.activeLink : "transparent";
          }}
        />
      ))}
    </Stack>
  );
};
