// import { betterAuth } from "better-auth";
// import { drizzleAdapter } from "better-auth/adapters/drizzle";
// import { db } from "../db/index.js";
// import * as schema from "../db/schema.js";
// import { sendResetPasswordEmail } from "../emails/_lib/send-reset-password-email.js";
// import { sendEmailVerify } from "../emails/_lib/send-verification-email.js";
// export const ALLOWED_ORIGINS = [process.env.FRONT_END_URL!];
// const backendUrl = process.env.BACKEND_URL || process.env.BETTER_AUTH_URL;
// if (!backendUrl) {
//   throw new Error("BACKEND_URL or BETTER_AUTH_URL env var is not set!");
// }
// export const auth = betterAuth({
//   database: drizzleAdapter(db, {
//     provider: "pg",
//     schema,
//   }),
//   emailAndPassword: {
//     enabled: true,
//     sendResetPassword: async ({ user, url }) => {
//       const urlWithCallback = new URL(url);
//       urlWithCallback.searchParams.set(
//         "callbackURL",
//         `${process.env.FRONT_END_URL}/reset-password`,
//       );
//       void sendResetPasswordEmail({
//         from: process.env.EMAIL_FROM!,
//         to: user.email,
//         name: user.name,
//         url: urlWithCallback.toString(),
//       });
//     },
//   },
//   emailVerification: {
//     sendOnSignUp: true,
//     autoSignInAfterVerification: true,
//     sendVerificationEmail: async ({ user, url }) => {
//       const urlWithCallback = new URL(url);
//       urlWithCallback.searchParams.set(
//         "callbackURL",
//         `${process.env.FRONT_END_URL}/dashboard`,
//       );
//       void sendEmailVerify({
//         from: process.env.EMAIL_FROM!,
//         to: user.email,
//         name: user.name,
//         url: urlWithCallback.toString(),
//       });
//     },
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// redirectURI: `${process.env.BACKEND_URL}/api/auth/callback/github`,
// redirectURI:
//   "https://better-auth-backend.onrender.com/api/auth/callback/github",
//     },
//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     },
//   },
//   trustedOrigins: [process.env.FRONT_END_URL!, process.env.BETTER_AUTH_URL!],
//   baseURL: process.env.BETTER_AUTH_URL, // e.g. backend url
//   advanced: {
//     crossSubdomainCookies: {
//       enabled: true,
//     },
//     //Critical: Store state in database instead of cookies
//     state: {
//       storeInCookie: false,
//       storeInDatabase: true,
//     },
//     //Or if you must use cookies, configure them properly
//     defaultCookieAttributes: {
//       secure: true,
//       httpOnly: true,
//       sameSite: "none", // 🔑 Required for cross-origin cookies
//       partitioned: true, // CHIPS support
//       maxAge: 60 * 10, // 10 minutes
//     },
//   },
//   logger: {
//     level: "debug",
//   },
// });
// =========================================================
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db/index.js";
import * as schema from "../db/schema.js";
import { sendResetPasswordEmail } from "../emails/_lib/send-reset-password-email.js";
import { sendEmailVerify } from "../emails/_lib/send-verification-email.js";

export const ALLOWED_ORIGINS = [process.env.FRONTEND_URL!];

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const urlWithCallback = new URL(url);
      urlWithCallback.searchParams.set(
        "callbackURL",
        `${process.env.FRONTEND_URL}/reset-password`,
      );
      void sendResetPasswordEmail({
        from: process.env.EMAIL_FROM!,
        to: user.email,
        name: user.name,
        url: urlWithCallback.toString(),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const urlWithCallback = new URL(url);
      urlWithCallback.searchParams.set(
        "callbackURL",
        `${process.env.FRONTEND_URL}/dashboard`,
      );
      void sendEmailVerify({
        from: process.env.EMAIL_FROM!,
        to: user.email,
        name: user.name,
        url: urlWithCallback.toString(),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      // redirectURI: `${process.env.BACKEND_URL}/api/auth/callback/github`,
    },
  },
  trustedOrigins: [process.env.FRONTEND_URL!, process.env.BACKEND_URL!],
  baseURL: process.env.BETTER_AUTH_URL,
  account: {
    // This tells Better Auth to skip the cookie check entirely for OAuth state.
    // This is the strongest way to bypass the 'state_mismatch' on Render subdomains.
    skipStateCookieCheck: true,
    storeStateStrategy: "database", // Optional: Stores state in DB instead of cookie
  },
  advanced: {
    useSecureCookies: true,
    crossSubDomainCookies: {
      enabled: true,
    },
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 60 * 10,
    },
  },
});
