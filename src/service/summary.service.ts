import sql from "../config/db.ts"

//get total income
export const getTotalIncome=async(
    user_id:string)=>{
        const result=await sql`
        SELECT COALESCE(SUM(amount),0)as total_income
        FROM finance_record
        WHERE user_id=${user_id},
        AND type='income'
        AND is_deleted=false;
        `
        return result[0];
        
    }

export const getTotalExpense=async(
    user_id:string
)=>{
    const result=await sql`
    SELECT COLESCE(SUM(amount),0) as total_expense
    FROM finance_record
    WHERE 
    user_id=${user_id}
    AND type='expense'
    AND is_delete=false`;

    return result[0];
} 

export const getNetBalance=async(
    user_id:string
)=>{
    const result=await sql`
    SELECT COALESCE(SUM(CASE
    WHEN type='income
    Then amount
    Else -amount
    END),0
    )as net_balance
    FROM finance_record
    WHERE user_id=${user_id}
    AND is_delete=false`;
    
    return result[0];

}