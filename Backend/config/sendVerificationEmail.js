import nodemailer from "nodemailer";

import { verificationEmailTemplate } from "../utils/verificationpage.js";

export const sendMail = async (link, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // ✅ use 587
    secure: false, // ✅ false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mail = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    html: verificationEmailTemplate(email, link),
  });
};
