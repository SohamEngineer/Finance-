import express from "express";

import {

  protect

} from "../middleware/auth.middleware";

import {

  authorizeRoles

} from "../middleware/role.middleware";

import {

  getDashboardSummary

} from "../controllers/summary.controller";

const summaryRouter = express.Router();



/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     description: Returns aggregated financial data.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: number
 *                   example: 50000
 *                 totalExpense:
 *                   type: number
 *                   example: 30000
 *                 netBalance:
 *                   type: number
 *                   example: 20000
 *                 categoryTotals:
 *                   type: array
 *                 monthlyTrend:
 *                   type: array
 *       401:
 *         description: Unauthorized
 */
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