import sql from "../config/db.ts";

export const getCategoryTotals = async (
  user_id: string
) => {

  const result = await sql`

    SELECT
      category,
      SUM(amount) as total

    FROM finance_records

    WHERE
      user_id = ${user_id}
      AND is_deleted = false

    GROUP BY category;

  `;

  return result;

};

export const getMonthlyTrend = async (
  user_id: string
) => {

  const result = await sql`

    SELECT

      DATE_TRUNC('month', date) as month,

      SUM(amount) as total

    FROM finance_record

    WHERE
      user_id = ${user_id}
      AND is_deleted = false

    GROUP BY month

    ORDER BY month;

  `;

  return result;

};