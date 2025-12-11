import { User } from "@/types/user/user";

export interface IAuthContext {
  user: User | null;
  loading: boolean;
  checkingData: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, email: string) => Promise<void>;
  logout: () => void;
}
