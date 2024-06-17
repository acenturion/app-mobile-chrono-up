import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {UserContextType} from "@/model/UserContextType";
import {AuthUser} from "@/model/AuthUser";
import {signIn} from "@/services/Auth.service";
import {User} from "@/model/User";


const UserContext = createContext<UserContextType | null>(null)

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider.");
  }
  return context;
}

const UserProvider = ({children}: PropsWithChildren) => {

  const [user, setUser] = useState<User | null>(null);

  const logIn = async (user: AuthUser) => {
    const result: User | null = await signIn(user);
    if (!result) console.log("No vino ningun usuario :(")
    setUser(result)
  }

  const logOut = async () => {
    setUser(null)
  }

  const contextValue: UserContextType = {
    user,
    logIn,
    logOut
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;