import Button from "@/components/atoms/Button";
import ScreenLayout from "@/components/layouts/ScreenLayout";
import {signIn} from "@/services/Auth.service";
import {AuthUser} from "@/model/AuthUser";
import {StyleSheet, TextInput} from "react-native";
import {useState} from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("ale@ale.com");
  const [password, setPassword] = useState<string>("Test1234");

  const handleOnPressLogin = async () => {
    const user: AuthUser = {
      email,
      password,
    }
    const result = await signIn(user);
  }

  return (
    <ScreenLayout>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={"Ingresar"}
        onPress={handleOnPressLogin}
        style={{backgroundColor: "green"}}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {

  },

  input: {
    width: "100%",
    height: 40,
    borderColor: 'white',
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    color: "white"
  },
});

export default LoginScreen;


