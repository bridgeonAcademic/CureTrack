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


export const pendingDoctors: Record<
  string,
  {
    fullName: string;
    IMAId: string;
    specialization: string;
    email: string;
    phoneNumber: string;
    password: string;
  }
> = {};

