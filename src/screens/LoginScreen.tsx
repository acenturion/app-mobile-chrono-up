import {AuthUser} from "@/model/AuthUser";
import {useUser} from "@/context/UserContext";
import LoginForm from "@/components/forms/LoginForm";
import ScreenLayout from "@/components/layouts/ScreenLayout";
import {StyleSheet, Text} from "react-native";

const LoginScreen = () => {
  const {logIn} = useUser();

  const handleOnPressLogin = async (user: AuthUser) => {
    logIn(user);
  }

  return (
    <ScreenLayout>
      <Text style={styles.logo}>Timer Tracker</Text>
      <LoginForm
        onSubmit={handleOnPressLogin}
      />
    </ScreenLayout>
  );
}
const styles = StyleSheet.create({
  logo: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 16 * 2,
    fontSize: 32 * 1.5,
    fontStyle: "italic"
  },
});


export default LoginScreen;


