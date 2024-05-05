import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from "react-native";
import Button from "@/components/Button";

function Home() {
  const [timer, setTimer] = React.useState(0);
  const [laps, setLaps] = React.useState([]);

  const handleOnPressStart = () => {
    console.log("You press the button!")
  }

  const handleOnPressPause = () => {
    console.log("You press the button!")
  }

  const handleOnPressReset = () => {
    console.log("You press the button!")
  }

  useEffect(() => {
    setTimeout(() => {
      setTimer((prev => prev + 1))
    }, 1000)
  }, [timer])

  /* Mostrar un cronometro por pantalla, que tenga la siguiente funcionalidad: Inicio, Pausa, Resumir la pausa, Lapso y Reiniciar.*/

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{timer}</Text>
      <Button
        title='Start'
        onPress={handleOnPressStart}
      />
      <Button
        title='Pause'
        onPress={handleOnPressPause}
      />
      <Button
        title='Reset'
        onPress={handleOnPressReset}
      />


      <Text>Laps: </Text>

      {/*Show laps*/}
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

export default Home;


