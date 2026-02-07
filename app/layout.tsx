import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FormFiller AI",
  description: "Auto-fill forms with AI using your profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
