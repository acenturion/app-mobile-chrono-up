import {StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import Button from "@/components/Button";

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const handleOnPressLogin = () => {
    return navigation.navigate("Home");
  }
  return (
    <View style={styles.container}>
      <Text>Aprete el boton para ingresar</Text>
      <Button
        title={"Chronometro"}
        onPress={handleOnPressLogin}
      />
      <Button
        title={"Temporizador"}
        onPress={handleOnPressLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 16,
  }
});

export default LoginScreen;


