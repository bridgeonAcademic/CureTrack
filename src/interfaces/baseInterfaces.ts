export interface loginBody {
  email: string;
  password: string;
  role: "user" | "doctor" | "vendor" | "admin";
}
