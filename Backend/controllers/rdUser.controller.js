import pool from "../config/sql_connetdb.js";
import generateAccountNumber from "../lib/rdAccountNumberGenrate.js";
import { rdRegisterUserMail } from "../utils/sendVerificationEmail.js";

//  Register user for RD
export const registerUser = async (req, res) => {
  try {
    const { fullname, adharno, photourl, dob, panno, occupation, email } =
      req.body;

    // ✅ Validation
    if (!fullname || !adharno || !dob || !panno || !occupation || !email) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    // TODO  add funnality for photo url

    // ✅ Check existing user
    const exist = await pool.query("SELECT 1 FROM rdusers WHERE adharno = $1", [
      adharno,
    ]);

    if (exist.rowCount > 0) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    // ✅ Generate account number
    const rdAccountNumber = await generateAccountNumber();

    // ✅ Insert user
    const result = await pool.query(
      `INSERT INTO rdusers
       (fullname, adharno,photourl, dob, panno, account_number, occupation,email)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id, account_number`,
      [
        fullname,
        adharno,
        photourl || null,
        dob,
        panno,
        rdAccountNumber,
        occupation,
        email,
      ]
    );
    rdRegisterUserMail(fullname, rdAccountNumber, email);
    return res.status(201).json({
      message: "User registered for RD successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error in Register User for RD controller:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//  Add nominee
export const addNomine = async (req, res) => {
  try {
    const { name, address, panno, adharno, contact } = req.body;
    const { account_number } = req.params;

    // validation
    if (!name || !address || !panno || !adharno || !contact) {
      return res.status(400).json({
        message: "All nominee fields are required",
      });
    }

    // check user
    const user = await pool.query(
      "SELECT id FROM rdusers WHERE account_number = $1",
      [account_number]
    );

    if (user.rowCount === 0) {
      return res.status(400).json({
        message: "Invalid account number",
      });
    }

    // insert nominee
    const nominee = await pool.query(
      `INSERT INTO nominee (name, address, panno, adharno, contact)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id`,
      [name, address, panno, adharno, contact]
    );

    // update user
    await pool.query(
      `UPDATE rdusers
       SET nominee_id = $1
       WHERE account_number = $2`,
      [nominee.rows[0].id, account_number]
    );

    // ✅ ONE response only
    return res.status(201).json({
      message: "Nominee added successfully",
    });
  } catch (error) {
    console.error("Error in the addNomine controller", error);

    // ⚠️ safety check (important)
    if (!res.headersSent) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

// Start Rd
export const startRd = async (req, res) => {
  //  Get Account number form params
  const { account_number, user } = req.params;
  const { rdamount, rdstartdate, rddepositdate, rdmonth } = req.body;

  //  Check all field Shouldbe feild

  if (!rdamount || !rdstartdate || !rddepositdate || !rdmonth)
    res.status(400).json({ message: "All field should be required" });

  // Insert into DB
  const saveToDb = await pool.query(
    "Insert into rd_passbook  (rdamount,rduserid,rdstartdate, rddepositdate, rdmonth) values ($1,$2,$3,$4,$5) RETURNING id ",
    [rdamount, rduserid, rdstartdate, rddepositdate, rdmonth]
  );

  //  Check data is Inserted or not in db
  if (!(saveToDb.rowCount > 0)) {
    res.status(500).json("Probleam in backend to insert data in db");
  }

  //  final Respone whene all things are fine

  res.status(200).json({ message: "user is register sucesfully rd " });
};

//  Check use
export const checkUser = async (req, res) => {
  try {
    // ✅ Safety check
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing",
      });
    }

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // 🔍 Check user in DB
    const result = await pool.query(
      "SELECT account_number FROM rdusers WHERE email = $1",
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(200).json({
        isRegistered: false,
      });
    }

    // ✅ USER REGISTERED
    const { account_number } = result.rows[0];

    return res.status(200).json({
      isRegistered: true,
      accountNumber: account_number,
    });
  } catch (error) {
    console.error("Error in the checkUser", error.message);

    // ⚠️ important: only ONE response
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
