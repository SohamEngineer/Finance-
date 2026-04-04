import express from "express";

import {

  createFinanceRecord,
  getFinanceRecords,
  updateFinanceRecord,
  deleteFinanceRecord

} from "../controllers/finance.controller.ts";

import {

  protect

} from "../middleware/auth.middleware.ts";

import {

  authorizeRoles

} from "../middleware/role.middleware.ts";

const financeRouter = express.Router();



// CREATE RECORD
// Admin only
financeRouter.post(

  "/",

  protect,

  authorizeRoles("admin"),

  createFinanceRecord

);



// GET RECORDS
// Viewer, Analyst, Admin
financeRouter.get(

  "/",

  protect,

  authorizeRoles(
    "viewer",
    "analyst",
    "admin"
  ),

  getFinanceRecords

);



// UPDATE RECORD
// Admin only
financeRouter.patch(

  "/:id",

  protect,

  authorizeRoles("admin"),

  updateFinanceRecord

);



// DELETE RECORD
// Admin only
financeRouter.delete(

  "/:id",

  protect,

  authorizeRoles("admin"),

  deleteFinanceRecord

);

export default financeRouter;