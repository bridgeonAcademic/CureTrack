import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #333;">Welcome!</h2>
      <p style="font-size: 16px;">Thank you for registering with us. Your One-Time Password (OTP) is:</p>
      <h1 style="font-size: 24px; color: #007bff;">${otp}</h1>
      <p style="font-size: 16px;">This OTP is valid for 5 minutes. Please enter it to verify your account.</p>
      <p style="font-size: 16px;">If you did not request this, please ignore this email.</p>
      <p style="font-size: 14px;">Best regards,<br>Cure Track</p>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log(`OTP sent successfully to ${email}`);
  } catch (error) {
    console.error("Failed to send OTP via email:", error);
    throw new Error("Failed to send OTP via email.");
  }
};
