import bcrypt from "bcrypt";

const hashedPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password: string, newPassword: string) => {
  return await bcrypt.compare(password, newPassword);
};

export { hashedPassword, comparePassword };
