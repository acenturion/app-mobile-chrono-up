import Button from '@/components/Button';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  const handleOnPress = () => {
    console.log("You press the button!")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      <Button
        title='Start time'
        onPress={handleOnPress}
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
