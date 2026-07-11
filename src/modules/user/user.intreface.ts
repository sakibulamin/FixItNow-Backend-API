export interface IUserUpdate {
  name?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
}

export interface IUserFilters {
  searchTerm?: string;
  role?: "ADMIN" | "CUSTOMER" | "TECHNICIAN";
  status?: "ACTIVE" | "BLOCKED";
}