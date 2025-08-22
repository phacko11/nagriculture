import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/api")) {
        // Handle API requests
        const res = NextResponse.next();

        res.headers.set("Access-Control-Allow-Origin", "*");
        res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if (request.method === "OPTIONS") {
            return new NextResponse(null, { headers: res.headers });
        }
        return res;
    }

    // Handle other requests
    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*'
}