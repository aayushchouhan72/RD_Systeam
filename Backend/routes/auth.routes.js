import express from "express";

import {
  check,
  login,
  logout,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";
const routes = express.Router();

routes.post("/login", login);
routes.post("/signup", signup);
routes.get("/verify/:token", verifyEmail);
routes.get("/logout", logout);
routes.get("/check", check);

export default routes;
