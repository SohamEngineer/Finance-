import sql from "../config/db";

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role_id: number
) => {

  const result = await sql`

    INSERT INTO users (
      name,
      email,
      password,
      role_id
    )

    VALUES (
      ${name},
      ${email},
      ${password},
      ${role_id}
    )

    RETURNING id, name, email;

  `;

  return result[0];

};
export const findUserByEmail = async (
  email: string
) => {

  const result = await sql`

    SELECT 
      users.id,
      users.name,
      users.email,
      users.password,
      roles.name as role

    FROM users

    JOIN roles
    ON users.role_id = roles.id

    WHERE users.email = ${email};

  `;

  return result[0];

};