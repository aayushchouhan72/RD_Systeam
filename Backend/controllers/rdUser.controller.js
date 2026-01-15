import pool from "../config/sql_connetdb.js";
import generateAccountNumber from "../lib/rdAccountNumberGenrate.js";
import { check } from "./auth.controller.js";

//  Register user for RD
export const registerUser = async (req, res) => {
  try {
    const {
      fullname,
      adharno,
      rdamount,
      photourl,
      dob,
      rdstartdate,
      panno,
      occupation,
    } = req.body;

    // ✅ Validation
    if (
      !fullname ||
      !adharno ||
      !rdamount ||
      !dob ||
      !rdstartdate ||
      !panno ||
      !occupation
    ) {
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
       (fullname, adharno, rdamount, photourl, dob, rdstartdate, panno, account_number, occupation)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING id, account_number`,
      [
        fullname,
        adharno,
        rdamount,
        photourl || null,
        dob,
        rdstartdate,
        panno,
        rdAccountNumber,
        occupation,
      ]
    );

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
    //  Get info from body
    const { name, address, panno, addharno, contact } = req.body;
    const account_number = req.params;

    //  check all fields for nominee Feilds
    if (!name || !address || !panno || !addharno || !contact) {
      res.status(400).json({
        message: "All feilds required ",
      });
      return;
    }

    //  Check account number is valid or not
    const isValidAccount = await pool.query(
      "select  account_number from rdusers where  account_number=$1",
      [account_number]
    );

    //  Send this respone when account not found with given number in db
    if (!(isValidAccount.rowCount > 0)) {
      res.status(400).json({
        message: "Error user account is not valid",
      });
      return;
    }

    //  save nominee to the DB
    const nominee = await pool.query(
      "Insert into nominee (name, address, panno, addharno, contact) values ($1,$2,$3,$4,$5)  RETURNING id ",
      [name, address, panno, addharno, contact]
    );
    if (nominee) {
      const mainUser = await pool.query(
        `UPDATE rdusers
        SET nominee_id = $1
        WHERE account_number = $2`,
        [nominee.rows[0].id, account_number]
      );
    }
    //  ALl test pass then send this response to client
    res.status(400).json({
      message: `Nominee is add for the Account Number${account_number}`,
    });
  } catch (error) {
    console.log("Error in the addNomine controller ", error.message);
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
  }
};
