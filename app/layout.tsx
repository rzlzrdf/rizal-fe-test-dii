import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PatientProvider } from "@/provider/patient-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rumah Sakit",
  description: "Rumah Sakit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  bg-neutral-100 max-w-full grid place-items-center min-h-screen antialiased`}
      >
        <main className="container">
          <PatientProvider>{children}</PatientProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
