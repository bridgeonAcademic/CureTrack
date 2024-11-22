export interface SignUpBody {
  name: string;
  email: string;
  phoneNumber: string;
  vendorRole: "hospital" | "lab" | "pharmacy";
  license: string;
  password: string;
}
