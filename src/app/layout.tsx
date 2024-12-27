import { ThemeProvider } from "@/app/_common/providers/theme-provider";
import { PropsWithChildren } from "react";

import "@/styles/globals.css";

export const metadata = {
  title: "React Flow",
  description: "A React Flow",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            themes={["light", "dark"]}
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
