import {AuthUser} from "@/model/AuthUser";
import ScreenLayout from "@/components/layouts/ScreenLayout";
import LoginForm from "@/components/forms/LoginForm";
import {useUser} from "@/context/UserContext";
import Profile from "@/components/organism/Profile";

const LoginScreen = () => {
  const {user, logIn, logOut} = useUser();

  const handleOnPressLogin = async (user: AuthUser) => {
    logIn(user);
  }

  return (
    <ScreenLayout>
      {user
        ? (
          <Profile
            user={user}
            onLogOut={logOut}
          />
        )
        : (<LoginForm
          onSubmit={handleOnPressLogin}
        />)
      }
    </ScreenLayout>
  );
}


export default LoginScreen;


