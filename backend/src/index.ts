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
app.all("/api/auth/*splat", toNodeHandler(auth));

// Parse JSON bodies
app.use(express.json());

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Server error:", err);
  res.status(500).json({ error: err.message });
});

const PORT = Number(process.env.PORT) || 3000;

console.log("PORT from env:", process.env.PORT);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`Backend URL: ${process.env.BETTER_AUTH_URL}`);
});
