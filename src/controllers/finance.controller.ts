import type { Request, Response } from "express";

type AuthenticatedRequest = Request & {
  user?: {
    userId?: string;
  };
};

import {
  createRecord,
  deleteRecords,
  getRecords,
  updateRecord,

} from "../service/finance.service.ts";



// CREATE FINANCE RECORD
export const createFinanceRecord = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

if (!req.body) {
  return res.status(400).json({
    message: "Request body missing"
  });
}

const {
  amount,
  type,
  category,
  date,
  notes
} = req.body;

    const user_id = req.user?.userId;

    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validation
    if (!amount || !type || !category || !date) {

      return res.status(400).json({
        message: "Required fields missing"
      });

    }

    const record =
      await createRecord(
        user_id,
        amount,
        type,
        category,
        date,
        notes
      );

    res.status(201).json({

      message: "Record created",

      data: record

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Create record failed"
    });

  }

};



// GET FINANCE RECORDS (WITH FILTERS)
export const getFinanceRecords = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const user_id = req.user?.userId;

    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const filters = req.query;

    const records =
      await getRecords(
        user_id,
        filters
      );

    res.status(200).json({

      message: "Records fetched",

      data: records

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Fetch records failed"
    });

  }

};



// UPDATE RECORD
export const updateFinanceRecord = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Missing record id" });
    }

    const {
      amount,
      category,
      notes
    } = req.body;

    const record =
      await updateRecord(
        id,
        amount,
        category,
        notes
      );

    res.status(200).json({

      message: "Record updated",

      data: record

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Update failed"
    });

  }

};



// DELETE RECORD (SOFT DELETE)
export const deleteFinanceRecord = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Missing record id" });
    }

    await deleteRecords(id);

    res.status(200).json({

      message: "Record deleted"

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Delete failed"
    });

  }

};