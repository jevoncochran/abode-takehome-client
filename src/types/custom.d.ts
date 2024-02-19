export type UniqueId = number | string;

export interface User {
  id: UniqueId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type AuthenticatedUser = Omit<User, "password">;
