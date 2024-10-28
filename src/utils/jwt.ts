import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";
const TOKEN_EXPIRATION = "1h";

interface jwtPayload {
  id: string;
}

const generateToken = (adminId: string): string => {
  const payload: jwtPayload = { id: adminId };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
  return token;
};

const verifyToken = (token: string): jwtPayload => {
  try {
    const verification = jwt.verify(token, JWT_SECRET) as jwtPayload;
    return verification;
  } catch (error) {
    throw new Error("invalid or expired token");
  }
};

export { generateToken, verifyToken };
