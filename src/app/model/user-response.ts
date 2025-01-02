import { Role } from "./role";

export interface UserResponse {
  id: number;
  fullName: string;
  address: string;
  is_active: boolean;
  dateOfBirth: Date;
  facebook_account_id: number;
  google_account_id: number;
  role: Role;
}
