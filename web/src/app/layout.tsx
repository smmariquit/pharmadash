import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
  UserButton,
  SignInButton,
  SignUpButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

const NavBar = () => {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};
