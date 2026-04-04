import sql from "../config/db.ts"

//record create query
export const createRecord = async (
  user_id: string,
  amount: number,
  type: string,
  category: string,
  date: string,
  notes?: string
) => {

  const result = await sql`

    INSERT INTO finance_record (

      user_id,
      amount,
      type,
      category,
      date,
      notes

    )

    VALUES (

      ${user_id},
      ${amount},
      ${type},
      ${category},
      ${date},
      ${notes ?? null}

    )

    RETURNING *;

  `;

  return result[0];

};

//Get Records with filtering

export const getRecords=async(
    user_id:string,
    filters:any
)=>{
    const {
        type,
        category,
        startDate,
        endDate
    }=filters;
    let query=sql`
    SELECT * FROM finance_record
    WHERE user_id=${user_id}
    AND is_deleted=false
    `
    if (type) {
    query = sql`${query}
      AND type = ${type}
    `;
  }

  if (category) {
    query = sql`${query}
      AND category = ${category}
    `;
  }

  if (startDate) {
    query = sql`${query}
      AND date >= ${startDate}
    `;
  }

  if (endDate) {
    query = sql`${query}
      AND date <= ${endDate}
    `;
  }

  const result = await query;

  return result;
}


//update records

export const updateRecord = async (
  id: string, 
  amount: number,
  category: string,
  notes: string
) => {

  const result = await sql`

    UPDATE finance_record

    SET
      amount = ${amount},
      category = ${category},
      notes = ${notes ?? null}

    WHERE id = ${id}

    RETURNING *;

  `;

  return result[0];

};

//Delete record ,not heard deleate
export const deleteRecords=async(
    id:string
)=>{
    await sql `
    UPDATE finance_record
    SET is_deleted=true
    where id=${id}`

}