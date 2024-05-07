import Chronometer from "@/components/Cronomether";
import {StyleSheet, View} from "react-native";

const HomeChronoScreen = () => {
  return (
    <View style={styles.container}>
      <Chronometer></Chronometer>
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

export default HomeChronoScreen;


