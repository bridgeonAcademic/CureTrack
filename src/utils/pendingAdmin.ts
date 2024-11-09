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

export default pendingAdmins;
