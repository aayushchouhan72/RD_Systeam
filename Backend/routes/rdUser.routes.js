import express from "express";

import { addNomine, registerUser } from "../controllers/rdUser.controller.js";
const routes = express.Router();
routes.post("/registeruser", registerUser);
routes.post("/addnominee/:account_number", addNomine);

export default routes;
