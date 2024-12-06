const pendingAdmins: Record<
  string,
  {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }
> = {};

const pendingVendors: Record<
  string,
  {
    name: string;
    email: string;
    phoneNumber: string;
    vendorRole: string;
    license: string;
    password: string;
  }
> = {};
const pendingUsers: Record<
  string,
  {
    fullName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    gender: string;
    password: string;
    aadhaar: string;
  }
> = {};

export { pendingAdmins, pendingVendors, pendingUsers };
