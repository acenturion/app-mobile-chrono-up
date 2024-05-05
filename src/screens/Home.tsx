import Chronomether from "@/components/Cronomether";
import {StyleSheet, Text, View} from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Chronomether></Chronomether>
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

export default HomeScreen;


