import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/chats")) {
    const isBot = userAgent(request)?.isBot;
    if (isBot) {
      return NextResponse.rewrite(new URL("/enter", request.url));
    }
  }
  if (
    !request.nextUrl.pathname.includes("/_next") &&
    !request.url.includes("/api")
  ) {
    if (
      !request.cookies.get("session") &&
      !request.nextUrl.pathname.includes("/enter")
    ) {
      return NextResponse.redirect(new URL("/enter", request.url));
    }
  }
  console.log(request.geo?.country);
}
