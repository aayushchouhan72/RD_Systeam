import express from "express";

import {
  addNomine,
  registerUser,
  startRd,
  checkUser,
} from "../controllers/rdUser.controller.js";
import { protectedRoutes } from "../middleware/CheckUserRegisterornot.js";

const routes = express.Router();

routes.post("/registeruser", registerUser);
routes.post("/check", checkUser);
routes.post("/addnominee/:account_number", protectedRoutes, addNomine);
routes.post("/startrd/:account_number", protectedRoutes, startRd);

export default routes;
