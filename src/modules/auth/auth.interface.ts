export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "TECHNICIAN" |"ADMIN";
}