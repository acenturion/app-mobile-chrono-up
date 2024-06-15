import {AuthUser} from "@/model/AuthUser";
import {User} from "@/model/User";

export interface UserContextType {
  user: User,
  logIn: (user: AuthUser) => {},
  logOut: () => {},
}