// import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase";

export async function middleware(request: NextRequest) {
    // let response = NextResponse.next({
    //     request: {
    //         headers: request.headers,
    //     },
    // });

    const { supabase, response } = updateSession(request);

    // const supabase = createServerClient(
    //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    //     {
    //         cookies: {
    //             getAll() {
    //                 return request.cookies.getAll();
    //             },
    //             setAll(cookiesToSet) {
    //                 cookiesToSet.forEach(({ name, value, options }) =>
    //                     request.cookies.set(name, value)
    //                 );
    //                 response = NextResponse.next({
    //                     request: {
    //                         headers: request.headers,
    //                     },
    //                 });
    //                 cookiesToSet.forEach(({ name, value, options }) =>
    //                     response.cookies.set(name, value, options)
    //                 );
    //             },
    //         },
    //     }
    // );

    // IMPORTANT: Use getUser() instead of getSession()
    // getSession() is unsafe in middleware as it can be spoofed.
    // getUser() verifies the session with the Supabase auth server.
    const { data: { user } } = await supabase.auth.getUser();

    // Protection Logic
    if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    if (user && request.nextUrl.pathname.startsWith("/login")) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};



















// import { createServerClient } from "@supabase/ssr";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//     // 1. Create an unmodified response
//     let res = NextResponse.next({
//         request: {
//             headers: req.headers,
//         },
//     });

//     // 2. Initialize Supabase
//     const supabase = createServerClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL!,
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//         {
//             cookies: {
//                 get(name) {
//                     return req.cookies.get(name)?.value;
//                 },
//                 set(name, value, options) {
//                     // Update both request and response cookies
//                     req.cookies.set({ name, value, ...options });
//                     res = NextResponse.next({
//                         request: {
//                             headers: req.headers,
//                         },
//                     });
//                     res.cookies.set({ name, value, ...options });
//                 },
//                 remove(name, options) {
//                     req.cookies.set({ name, value: "", ...options });
//                     res = NextResponse.next({
//                         request: {
//                             headers: req.headers,
//                         },
//                     });
//                     res.cookies.set({ name, value: "", ...options });
//                 },
//             },
//         }
//     );

//     // 3. Get session
//     const { data: { session } } = await supabase.auth.getSession();

//     // 4. Protection Logic
//     if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
//         const url = req.nextUrl.clone();
//         url.pathname = "/login";
//         return NextResponse.redirect(url);
//     }

//     return res;
// }

// export const config = {
//     matcher: ["/dashboard/:path*"],
// };