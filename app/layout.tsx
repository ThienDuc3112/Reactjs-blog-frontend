import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/navbar";
import { ContextProvider } from "./_context/context";
import { cookies } from "next/headers";
import { get } from "./_helper/get";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duc's place",
  description: "Written with sweat and blood, and a lot of stackoverflow",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token");
  const option = token && {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  };
  const [data, err] = await get<{
    success: boolean;
    data: { username: string; role: number[] };
  }>(`${process.env.NEXT_PUBLIC_API_URL}/auth`, false, option);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider {...data?.data}>
          <Navbar />
          <div className="page-container">{children}</div>
        </ContextProvider>
      </body>
    </html>
  );
}
