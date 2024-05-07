import {StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import Button from "@/components/Button";

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const handleOnPressChrono = () => {
    return navigation.navigate("Chrono");
  }

  const handleOnPressTimer = () => {
    return navigation.navigate("Timer");
  }


  return (
    <View style={styles.container}>
      <Text>Aprete el boton para ingresar</Text>
      <Button
        title={"Chronometro"}
        onPress={handleOnPressChrono}
      />
      <Button
        title={"Temporizador"}
        onPress={handleOnPressTimer}
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


