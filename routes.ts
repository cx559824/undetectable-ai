/**
 * An array of routse that are publicly accessible
 * These routes do not require authentication
 * @type{sting[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * An array of routse that are publicly accessible
 * These routes will redirect logged in users to /settings
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication process
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
