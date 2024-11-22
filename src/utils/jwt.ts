import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";
const ACCESS_TOKEN_EXPIRATION = "1h";
const REFRESH_TOKEN_EXPIRATION = "7d";

interface jwtPayload {
  id: string;
}

const generateTokens = (adminId: string) => {
  const payload: jwtPayload = { id: adminId };

  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });

  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });

  return { accessToken, refreshToken };
};

const verifyToken = (token: string): jwtPayload => {
  try {
    const verification = jwt.verify(token, JWT_SECRET) as jwtPayload;
    return verification;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

const refreshToken = (refreshToken: string): string => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as jwtPayload;
    const newAccessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
    return newAccessToken;
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

export { generateTokens, verifyToken, refreshToken };
