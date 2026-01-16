import express from "express";
import {
  createOrder,
  verifypayment,
} from "../controllers/payment.controller.js";

const routes = express.Router();

routes.post("/createorder", createOrder);
routes.post("/verify", verifypayment);

export default routes;
