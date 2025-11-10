import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/messages.route.js";
import { connectDB } from "../lib/db.js";
import {ENV} from '../lib/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = ENV.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start server after optional DB connection
(async () => {
  try {
    if (ENV.MONGO_URI) {
      await connectDB();
    } else {
      console.log("MONGO_URI not set; skipping DB connection (development mode)");
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

export default app;