import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ThemeProvider from "./providers/theme-provider";
import ReactQueryClientProvider from "./providers/ReactQueryClientProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `AI Detector, AI Checker, & AI Humanizer | Undetectable AI`,
  description: "AI Detector, AI Checker, & AI Humanizer | Undetectable AI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ReactQueryClientProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </ReactQueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
