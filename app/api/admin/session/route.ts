import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const user = await getAdminUser(request);
  return NextResponse.json({ admin: Boolean(user) });
}
