import pool from "../config/sql_connetdb.js";

export const protectedRoutes = async (req, res, next) => {
  try {
    const account_number = req.params;

    const userCheck = await pool.query(
      "select id  from rdusers where account_number=$1",
      [account_number]
    );

    if (!(userCheck.rowCount > 0)) {
      res.status(400).json({
        message: "User is not register  For RD",
      });
    }
    req.user = userCheck.rows[0];
    next();
  } catch (error) {
    console.log("Error in the protectedRoutes middielware", error.message);
    res(500).json({ message: "Internal server error" });
  }
};
