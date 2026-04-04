import sql from "../config/db";

// ===============================
// Get total income
// ===============================
export const getTotalIncome = async (
  user_id: string
) => {

  const result = await sql`

    SELECT
      COALESCE(SUM(amount), 0) AS total_income

    FROM finance_record

    WHERE
      user_id = ${user_id}
      AND type = 'income'
      AND is_deleted = false

  `;

  return result[0];

};


// ===============================
// Get total expense
// ===============================
export const getTotalExpense = async (
  user_id: string
) => {

  const result = await sql`

    SELECT
      COALESCE(SUM(amount), 0) AS total_expense

    FROM finance_record

    WHERE
      user_id = ${user_id}
      AND type = 'expense'
      AND is_deleted = false

  `;

  return result[0];

};


// ===============================
// Get net balance
// ===============================
export const getNetBalance = async (
  user_id: string
) => {

  const result = await sql`

    SELECT

      COALESCE(

        SUM(
          CASE
            WHEN type = 'income'
            THEN amount
            ELSE -amount
          END

        ), 0

      ) AS net_balance

    FROM finance_record

    WHERE
      user_id = ${user_id}
      AND is_deleted = false

  `;

  return result[0];

};