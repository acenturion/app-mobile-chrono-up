import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Button from "@/components/Button";
import { formatTime } from "@/utils/timer-utils";

interface ChronoState {
  isPaused: boolean;
  isStarted: boolean;
  isReset: boolean;
}

type Lap = number[];

const Chronomether = () => {
  const [timer, setTimer] = useState(0);
  const [chronoState, setChronoState] = useState<ChronoState>({
    isPaused: false,
    isStarted: false,
    isReset: true,
  });
  const [laps, setLaps] = useState<Lap>([]);

  const handleOnPressStart = () => {
    console.log("Start press!");
    setChronoState({ isStarted: true, isPaused: false, isReset: false });
  };

  const handleOnPressPause = () => {
    console.log("Pause Press!");
    setChronoState({ ...chronoState, isPaused: true, isStarted: false, isReset: false });
  };

  const handleOnPressReset = () => {
    console.log("Reset Press!");
    setTimer(0);
    setChronoState({
      ...chronoState,
      isReset: true,
      isStarted: false,
      isPaused: true,
    });
    setLaps([]);
  };

  const handleOnPressLap = () => {
    console.log("Lap Press!");
    setLaps([...laps, timer]);
  };

  useEffect(() => {
    let interval: any;

    if (chronoState.isStarted) {
      interval = setInterval(() => {
        setTimer((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, chronoState.isStarted]);

  /* Mostrar un cronometro por pantalla, que tenga la siguiente funcionalidad: Inicio, Pausa, Resumir la pausa, Lapso y Reiniciar.*/
  const showStart = chronoState.isPaused || chronoState.isReset;

  const showResetAndLap = chronoState.isPaused || chronoState.isStarted;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTime(timer)}</Text>
      {showStart ? (
        <Button title="Start" onPress={handleOnPressStart} />
      ) : (
        <Button title="Pause" onPress={handleOnPressPause} />
      )}

      {showResetAndLap && (
          <Button title="Reset" onPress={handleOnPressReset} />
        )}

        <Button title="Lap" onPress={handleOnPressLap} />

        {showResetAndLap && <Text>Laps: </Text> }

        <FlatList
          data={laps}
          renderItem={({ item, index }) => (
            <Text>{`Lapso ${index + 1}: ${formatTime(
              item
            )}`}</Text>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 16,
  },
});

export default Chronomether;
