import pool from "../config/sql_connetdb.js";

export const protectedRoutes = async (req, res, next) => {
  try {
    const { account_number } = req.params;

    const userCheck = await pool.query(
      "SELECT id FROM rdusers WHERE account_number = $1",
      [account_number]
    );

    if (userCheck.rowCount === 0) {
      return res.status(400).json({
        message: "User is not registered for RD",
      });
    }

    // attach user to request
    req.user = userCheck.rows[0];

    // ✅ ONLY success path calls next
    return next();
  } catch (error) {
    console.error("Error in the protectedRoutes middleware", error);

    if (!res.headersSent) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};
