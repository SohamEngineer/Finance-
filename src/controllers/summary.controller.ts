import type { Request, Response } from "express";
import { getNetBalance, getTotalExpense, getTotalIncome } from "../service/summary.service.ts";
import { getCategoryTotals, getMonthlyTrend } from "../service/catagory.service.ts";

type AuthenticatedRequest = Request & {
  user?: {
    userId: string;
  };
};

// DASHBOARD SUMMARY
export const getDashboardSummary = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const user_id = req.user?.userId;
    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const income =
      await getTotalIncome(user_id);

    const expense =
      await getTotalExpense(user_id);

    const balance =
      await getNetBalance(user_id);

    const categories =
      await getCategoryTotals(user_id);

    const monthly =
      await getMonthlyTrend(user_id);

    res.status(200).json({

      message: "Dashboard data fetched",

      data: {

        totalIncome:
          income.total_income,

        totalExpense:
          expense.total_expense,

        netBalance:
          balance.net_balance,

        categoryTotals:
          categories,

        monthlyTrend:
          monthly

      }

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Dashboard fetch failed"
    });

  }

};