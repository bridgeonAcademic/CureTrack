import crypto from "crypto";

export const generateOTP = (): string => {
  const otp = crypto.randomInt(100000, 999999).toString();
  return otp;
};

const OTP_EXPIRATION_TIME = 5 * 60 * 1000;

const otpStore: Record<string, { otp: string; expiresAt: number }> = {};

export const storeOTP = (identifier: string, otp: string) => {
  otpStore[identifier] = { otp, expiresAt: Date.now() + OTP_EXPIRATION_TIME };
};

export const verifyOTP = (identifier: string, otp: string): boolean => {
  const otpData = otpStore[identifier];

  if (!otpData) return false;
  if (otpData.expiresAt < Date.now()) return false;

  return otpData.otp === otp;
};
