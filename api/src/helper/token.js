import jwt from "jsonwebtoken";

const GenerateToken = (id, email) => {
  return jwt.sign(
    { userId: id, email: email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
export default GenerateToken;

