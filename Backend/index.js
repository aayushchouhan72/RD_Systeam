import express from "express";
import dotenv, { parse } from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import rdUserRoutes from "./routes/rdUser.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rduser", rdUserRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`server is running at host http://localhost:${PORT}`);
});
