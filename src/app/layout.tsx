import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClientManager",
  description: "App for client management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
