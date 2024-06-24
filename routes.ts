/**
 * An array of routse that are publicly accessible
 * These routes do not require authentication
 * @type{string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/auth/new-verification",
  "/about",
  "/contact-us",
];

/**
 * An array of routse that are publicly accessible
 * These routes will redirect logged in users to /settings
 * @type{string[]}
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication process
 * @type{string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type{string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";
