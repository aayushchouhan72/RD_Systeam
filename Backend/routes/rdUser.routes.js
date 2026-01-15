import express from "express";

import {
  addNomine,
  registerUser,
  startRd,
} from "../controllers/rdUser.controller.js";
import { protectedRoutes } from "../middileware/CheckUserRegisterornot.js";

const routes = express.Router();

routes.post("/registeruser", registerUser);
routes.post("/addnominee/:account_number", protectedRoutes, addNomine);
routes.post("/startrd/:account_number", protectedRoutes, startRd);

export default routes;
