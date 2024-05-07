import {useNavigation} from "@react-navigation/core";
import Button from "@/components/atoms/Button";
import ScreenLayout from "@/components/layouts/ScreenLayout";

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const handleOnPressChrono = () => {
    return navigation.navigate("Chrono");
  }

  const handleOnPressTimer = () => {
    return navigation.navigate("Timer");
  }


  return (
    <ScreenLayout>
      <Button
        title={"Chronometro"}
        onPress={handleOnPressChrono}
        style={{backgroundColor: "blue"}}
      />
      <Button
        title={"Temporizador"}
        onPress={handleOnPressTimer}
        style={{backgroundColor: "green"}}
      />
    </ScreenLayout>
  );
}

export default LoginScreen;


