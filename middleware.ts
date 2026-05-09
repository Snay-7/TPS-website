import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: refreshes the session if expired
  const { data: { user } } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const isLoginPage = path === "/admin/login";

  // If not logged in and trying to access admin (except login), redirect to login
  if (isAdminRoute && !isLoginPage && !user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // If logged in and on login page, redirect to dashboard
  if (isLoginPage && user) {
    // Check user is admin first
    const { data: admin } = await supabase
      .from("admins")
      .select("email")
      .eq("user_id", user.id)
      .single();
    
    if (admin) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};