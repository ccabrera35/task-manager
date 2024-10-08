import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager",
  description:
    "Efficiently organize, prioritize, and track to-do lists, deadlines, and productivity goals."
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-sm text-zinc-900 bg-[#708d3e] min-h-dvh`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
