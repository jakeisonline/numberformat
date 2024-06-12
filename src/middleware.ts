import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const config = {
  matcher: "/:path*",
}

const Middleware = (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl

  // Always lowercase the pathname
  if (pathname === pathname.toLowerCase()) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(origin + pathname.toLowerCase()))
}

export default Middleware
