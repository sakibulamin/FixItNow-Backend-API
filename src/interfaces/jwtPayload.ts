export type TJwtPayload = {
  id: string;
  email: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
};