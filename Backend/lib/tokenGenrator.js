import jwt from "jsonwebtoken";

const generateToken = (user, res) => {
  const token = jwt.sign(
    {
      email: user.email,
      phone: user.phone,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // ✅ cookie set here
  res.cookie("tok", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in production
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // ✅ RESPONSE ONLY HERE
  return res.status(200).json({
    message: "Logged in successfully",
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
};

export default generateToken;
