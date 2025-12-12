import Link from "next/link";
import { Breadcrumbs, Text, Flex } from "@mantine/core";
import { useBreadcrumbs } from "@/hooks/context/useBreadcrumbsContext";
import * as style from "./dashboardBreadcrumbsComponentColorPallete";

export const DashboardBreadcrumbsComponent = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const breadcrumbsStyles = style.dashboardBreadcrumbs;

  if (breadcrumbs.length === 0) return null;

  return (
    <Flex gap={"sm"} justify="center" align="center">
      <Breadcrumbs c={breadcrumbsStyles.primaryText} fz="sm">
        {breadcrumbs.map((item, idx) => {
          const isLast = idx === breadcrumbs.length - 1;

          return isLast || !item.href ? (
            <Text key={idx} c={breadcrumbsStyles.secondaryText} size="sm">
              {item.label}
            </Text>
          ) : (
            <Link href={item.href} key={idx}>
              <Text c={breadcrumbsStyles.primaryText} size="sm">
                {item.label}
              </Text>
            </Link>
          );
        })}
      </Breadcrumbs>
    </Flex>
  );
};
