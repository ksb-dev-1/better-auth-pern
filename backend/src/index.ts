// import { toNodeHandler } from "better-auth/node";
// import cors from "cors";
// import express, { Request, Response } from "express";
// import "./env.js";
// import { auth } from "./lib/auth.js";
// const app = express();
// app.set("trust proxy", 1);
// const PORT = process.env.PORT ?? 3000;
// app.use(
//   cors({
//     origin: process.env.FRONT_END_URL,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Specify allowed HTTP methods
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );
// // Cookie parser - REQUIRED for OAuth
// app.use(cookieParser());
// app.all("/api/auth/*splat", toNodeHandler(auth));
// app.use(express.json());
// app.get("/", (req: Request, res: Response) => {
//   res.json({ message: "Hello, world!" });
// });
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
// app.get("/api/me", async (req, res) => {
//   const session = await auth.api.getSession({
//     headers: fromNodeHeaders(req.headers),
//   });
//   if (!session) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
//   return res.json(session);
// });
// ==================================================================
// server.ts or index.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import "./env.js";
import { auth } from "./lib/auth.js";

const app = express();
app.set("trust proxy", 1);

// CORS configuration - CRITICAL for OAuth
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  }),
);

// Auth handler - MUST be before other routes
// app.all("/api/auth/*splat", toNodeHandler(auth));
// 3. Auth handler (Using the greedy wildcard for Express 5)
app.all("/api/auth*", toNodeHandler(auth));

// Parse JSON bodies
app.use(express.json());

// Health check
// app.get("/", (req: Request, res: Response) => {
//   res.json({ message: "Hello, world!" });
// });

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Server error:", err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`Backend URL: ${process.env.BETTER_AUTH_URL}`);
});
