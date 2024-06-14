import {useNavigation} from "@react-navigation/core";
import Button from "@/components/atoms/Button";
import ScreenLayout from "@/components/layouts/ScreenLayout";
import {signIn} from "@/services/Auth.service";
import {AuthUser} from "@/model/AuthUser";

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const handleOnPressChrono = async () => {
    const user: AuthUser = {
      email: "ale@ale.com",
      password: "Test1234"
    }
    const result = await signIn(user);
  }

  return (
    <ScreenLayout>
      <Button
        title={"Chronometro"}
        onPress={handleOnPressChrono}
        style={{backgroundColor: "blue"}}
      />
    </ScreenLayout>
  );
}

export default LoginScreen;


