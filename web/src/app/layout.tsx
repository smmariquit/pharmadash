import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Byte Back",
  authors: [
    {
      name: "Waffen Sultan",
      url: "https://github.com/waffensultan",
    },
    {
      name: "Simonee Ezekiel",
      url: "https://github.com/",
    },
    {
      name: "Ostline Casao",
      url: "https://github.com/owostline",
    },
    {
      name: "John Yumul",
      url: "https://github.com/",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
