import { get } from "@/app/_helper/get";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const [data, err] = await get<{}>(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/post/preview?page=${req.nextUrl.searchParams.get("page")}`,
    false,
    {
      headers: { Authorization: `Bearer ${req.cookies.get("token")?.value}` },
    }
  );
  if (!data) {
    return new NextResponse(null, { status: (err as any).status });
  }
  return NextResponse.json(data);
};
