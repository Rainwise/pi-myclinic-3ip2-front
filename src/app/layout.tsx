import type { Metadata } from "next";
import { Ubuntu_Sans } from "next/font/google";
import "./globals.css";
import { MantineProvider, mantineHtmlProps } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { theme } from "@/styles/mantineTheme";

// Hook Imports
import { AuthProvider } from "@/hooks/context/useAuthContext";
import { BreadcrumbProvider } from "@/hooks/context/useBreadcrumbsContext";

const ubuntuSans = Ubuntu_Sans({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "MyClinic",
  description: "PI Project MyClinic Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <body className={ubuntuSans.className}>
        <MantineProvider forceColorScheme="light" theme={theme}>
          <Notifications />
          <AuthProvider>
            <BreadcrumbProvider>{children}</BreadcrumbProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
