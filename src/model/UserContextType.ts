import {AuthUser} from "@/model/AuthUser";
import {User} from "@/model/User";

export interface UserContextType {
  user: User | null,
  logIn: (user: AuthUser) => {},
  logOut: () => {},
}