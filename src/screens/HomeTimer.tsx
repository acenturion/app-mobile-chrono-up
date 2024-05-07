import Timer from "@/components/Timer";
import {StyleSheet, View} from "react-native";

const HomeTimerScreen = () => {
  return (
    <View style={styles.container}>
      <Timer></Timer>
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

export default HomeTimerScreen;


