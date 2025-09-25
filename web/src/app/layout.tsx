import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Byte Back | Byte Forward 2025",
  description:
    "Welcome to Byte Back, the official website for Byte Forward 2025 hackathon. Join us in creating innovative solutions and pushing the boundaries of technology.",
  keywords: [
    "hackathon",
    "byte forward",
    "2025",
    "technology",
    "innovation",
    "coding",
    "programming",
  ],
  authors: [
    {
      url: "https://github.com/owostline",
      name: "Ostline Casao",
    },
    {
      url: "https://github.com/0002F16",
      name: "John Yumul",
    },
    {
      url: "https://github.com/waffensultan",
      name: "Waffen Sultan",
    },
    {
      url: "https://github.com/smmariquit/",
      name: "Simonee Ezeiel",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.facebook.com/p/Byte-Forward-Hackathon-61576244888531/",
    title: "Byte Back | Byte Forward 2025",
    description:
      "Welcome to Byte Back, a team participant for Byte Forward 2025",
    siteName: "Byte Back",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Byte Forward 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Byte Back | Byte Forward 2025",
    description:
      "Welcome to Byte Back, a team participant for Byte Forward 2025",
    images: ["/og-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  themeColor: "#000000",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
