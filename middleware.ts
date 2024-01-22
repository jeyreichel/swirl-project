import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export async function middleware(req: NextRequest) {
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = "";

  const requestHeaders = new Headers(req.headers);

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  res.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);
  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();

  res.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

  return res;
}
