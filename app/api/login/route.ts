import { post } from "@/app/_helper/post";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const json = await req.json();
  const [data, err] = await post<{
    success: boolean;
    role: number[];
    token: string;
  }>(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, json);
  if (data == null)
    return new NextResponse(undefined, { status: (err as any).status });
  const res = NextResponse.json({ role: data.role });
  res.cookies.set("token", data.token, {
    httpOnly: true,
    sameSite: "none",
    maxAge: 6 * 3600 * 1000,
    secure: process.env.DEVELOPMENT != "TRUE",
  });
  return res;
};
