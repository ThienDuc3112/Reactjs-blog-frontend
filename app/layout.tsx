import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/navbar";
import { ContextProvider } from "./_context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duc's place",
  description: "Written by sweat and blood, and a lot of stackoverflow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <Navbar />
          <div className="page-container">{children}</div>
        </ContextProvider>
      </body>
    </html>
  );
}
