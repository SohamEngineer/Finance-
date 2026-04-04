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



/**
 * @swagger
 * /api/finance:
 *   post:
 *     summary: Create financial record
 *     tags: [Finance]
 *     description: Admin users can create financial records.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type
 *               - category
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               type:
 *                 type: string
 *                 example: income
 *               category:
 *                 type: string
 *                 example: Salary
 *               date:
 *                 type: string
 *                 example: 2026-04-04
 *               notes:
 *                 type: string
 *                 example: Monthly salary
 *     responses:
 *       201:
 *         description: Record created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
financeRouter.post(

  "/",

  protect,

  authorizeRoles("admin"),

  createFinanceRecord

);



/**
 * @swagger
 * /api/finance:
 *   get:
 *     summary: Get financial records
 *     tags: [Finance]
 *     description: Retrieve financial records with optional filtering.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         example: income
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         example: Food
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         example: 2026-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         example: 2026-12-31
 *     responses:
 *       200:
 *         description: Records fetched successfully
 *       401:
 *         description: Unauthorized
 */
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



/**
 * @swagger
 * /api/finance/{id}:
 *   patch:
 *     summary: Update financial record
 *     tags: [Finance]
 *     description: Admin users can update financial records.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 8b0f2e8d-2b4c-4d9a-bc7c-123456789abc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 2000
 *               category:
 *                 type: string
 *                 example: Transport
 *               notes:
 *                 type: string
 *                 example: Updated entry
 *     responses:
 *       200:
 *         description: Record updated
 *       403:
 *         description: Forbidden
 */
financeRouter.patch(

  "/:id",

  protect,

  authorizeRoles("admin"),

  updateFinanceRecord

);



/**
 * @swagger
 * /api/finance/{id}:
 *   delete:
 *     summary: Delete financial record
 *     tags: [Finance]
 *     description: Admin users can delete records (soft delete).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 8b0f2e8d-2b4c-4d9a-bc7c-123456789abc
 *     responses:
 *       200:
 *         description: Record deleted
 *       403:
 *         description: Forbidden
 */
financeRouter.delete(

  "/:id",

  protect,

  authorizeRoles("admin"),

  deleteFinanceRecord

);

export default financeRouter;