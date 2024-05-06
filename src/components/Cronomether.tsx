import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import Button from "@/components/Button";
import {formatTime} from "@/utils/timer-utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ChronoState {
  isPaused: boolean;
  isStarted: boolean;
  isReset: boolean;
}

interface Lap {
  id: number,
  value: number,
}

interface Execution {
  id: number;
  date: Date,
  laps: Lap[]
}

const Chronomether = () => {
  const [timer, setTimer] = useState(0);
  const [chronoState, setChronoState] = useState<ChronoState>({
    isPaused: false,
    isStarted: false,
    isReset: true,
  });
  const [laps, setLaps] = useState<Lap[]>([]);

  const handleOnPressStart = () => {
    console.log("Start press!");
    setChronoState({isStarted: true, isPaused: false, isReset: false});
  };

  const handleOnPressPause = () => {
    console.log("Pause Press!");
    setChronoState({...chronoState, isPaused: true, isStarted: false, isReset: false});
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
    if (laps.length > 0) {
      const execution: Execution = {
        id: Math.random(),
        date: new Date(),
        laps: laps,
      }

      storeData(execution);
    }
    setLaps([]);
  };

  const handleOnPressLap = () => {
    console.log("Lap Press!");
    const newLap: Lap = {
      id: laps.length + 1,
      value: timer,
    }
    setLaps([...laps, newLap]);
  };

  const handlePressGetData = async () => {
    console.log("Obteniendo data del storage");
    const result = await getData();
    console.log(result);
  };


  const storeData = (value: Execution) => {
    const jsonValue = JSON.stringify(value);
    AsyncStorage.setItem('executions', jsonValue).then(r =>
      console.log("guardado exitosamente")
    );
  };

  const getData = async (): Promise<Execution[] | undefined> => {
    try {
      const jsonValue = await AsyncStorage.getItem('executions');
      return jsonValue != null ? JSON.parse(jsonValue) as Execution[] : undefined;
    } catch (e) {
      // error reading value
    }
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
        <Button title="Start" onPress={handleOnPressStart}/>
      ) : (
        <Button title="Pause" onPress={handleOnPressPause}/>
      )}

      {showResetAndLap && (
        <Button title="Reset" onPress={handleOnPressReset}/>
      )}

      <Button title="Lap" onPress={handleOnPressLap}/>
      <Button title="Mostrar laps" onPress={handlePressGetData}/>

      {showResetAndLap && <Text>Laps: </Text>}

      <FlatList
        data={laps}
        renderItem={({item}) => (
          <Text>{`Lapso ${item.id}: ${formatTime(
            item.value
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
    marginTop: 16
  },
  text: {
    marginBottom: 16,
  },
});

export default Chronomether;
