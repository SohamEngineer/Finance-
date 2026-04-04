import express from "express";



import {

  protect

} from "../middleware/auth.middleware.ts";

import {

  authorizeRoles

} from "../middleware/role.middleware.ts";
import { getDashboardSummary } from "../controllers/summary.controller.ts";

const summaryRouter = express.Router();



// DASHBOARD SUMMARY
// Viewer + Analyst + Admin
summaryRouter.get(

  "/summary",

  protect,

  authorizeRoles(
    "viewer",
    "analyst",
    "admin"
  ),

  getDashboardSummary

);

export default summaryRouter;