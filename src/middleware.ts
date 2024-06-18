import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - sitemap.xml (sitemap file)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - icon.png (favicon file)
     */
    "/((?!sitemap.xml|_next/static|_next/image|icon.png).*)",
  ],
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
