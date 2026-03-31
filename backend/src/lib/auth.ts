// import { betterAuth } from "better-auth";
// import { drizzleAdapter } from "better-auth/adapters/drizzle";
// import { db } from "../db/index.js";
// import * as schema from "../db/schema.js";
// import { sendResetPasswordEmail } from "../emails/_lib/send-reset-password-email.js";
// import { sendEmailVerify } from "../emails/_lib/send-verification-email.js";
// export const ALLOWED_ORIGINS = [process.env.FRONT_END_URL!];
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
//     defaultCookieAttributes: {
//       secure: true,
//       httpOnly: true,
//       sameSite: "none", // 🔑 Required for cross-origin cookies
//       partitioned: true, // CHIPS support
//     },
//   },
// });
// =========================================================
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db/index.js";
import * as schema from "../db/schema.js";
import { sendResetPasswordEmail } from "../emails/_lib/send-reset-password-email.js";
import { sendEmailVerify } from "../emails/_lib/send-verification-email.js";

export const ALLOWED_ORIGINS = [process.env.FRONT_END_URL!];

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
        `${process.env.FRONT_END_URL}/reset-password`,
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
        `${process.env.FRONT_END_URL}/dashboard`,
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
      // redirectURI: `${process.env.FRONT_END_URL}/api/auth/callback/google`,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      redirectURI:
        "https://better-auth-backend.onrender.com/api/auth/callback/github",
    },
  },
  trustedOrigins: [process.env.FRONT_END_URL!, process.env.BACKEND_URL!],
  baseURL: process.env.BETTER_AUTH_URL,
  advanced: {
    // crossSubdomainCookies: {
    //   enabled: true,
    // },
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      partitioned: true,
    },
  },
});
