import {AuthUser} from "@/model/AuthUser";
import {useUser} from "@/context/UserContext";
import LoginForm from "@/components/forms/LoginForm";
import ScreenLayout from "@/components/layouts/ScreenLayout";

const LoginScreen = () => {
  const {logIn} = useUser();

  const handleOnPressLogin = async (user: AuthUser) => {
    logIn(user);
  }

  return (
    <ScreenLayout>
      <LoginForm
        onSubmit={handleOnPressLogin}
      />
    </ScreenLayout>
  );
}


export default LoginScreen;


