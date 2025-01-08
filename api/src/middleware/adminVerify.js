import jwt from "jsonwebtoken";

export const adminVerify = (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: "You are not authenticated" });

  jwt.verify(token, process.env.JWT_SECRET1, async (error, payload) => {
    // console.log(payload);
    if (error) return res.status(403).json({ message: "Token is invalid" });

    req.userId = payload.id;
    // console.log(req.userId);
    next();
  });
};
