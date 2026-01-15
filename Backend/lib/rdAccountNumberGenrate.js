import crypto from "crypto";
import pool from "../config/sql_connetdb.js";

const generateAccountNumber = async () => {
  const year = new Date().getFullYear();

  // 5 bytes = 10 hex characters
  const randomPart = crypto.randomBytes(5).toString("hex").toUpperCase();

  const accountNumber = `RD-${year}-${randomPart}`;

  const result = await pool.query(
    "SELECT 1 FROM rdusers WHERE  account_number = $1",
    [accountNumber]
  );

  // If duplicate found → retry
  if (result.rowCount > 0) {
    return generateAccountNumber();
  }

  return accountNumber;
};

export default generateAccountNumber;
