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

export { pendingAdmins, pendingVendors };
