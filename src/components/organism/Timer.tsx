import React, {useEffect, useState} from "react";
import {Alert, StyleSheet, Text, Vibration, View} from "react-native";
import Button from "@/components/atoms/Button";
import {formatTime} from "@/utils/timer-utils";

interface TimerState {
  isPaused: boolean;
  isStarted: boolean;
  isReset: boolean;
}

const TIMER_VALUE = 60

const Timer = () => {
  const [time, setTime] = useState(TIMER_VALUE);
  const [timerState, setTimerState] = useState<TimerState>({
    isPaused: false,
    isStarted: false,
    isReset: true,
  });

  const handleOnPressStart = () => {
    console.log("Start press!");
    setTimerState({isStarted: true, isPaused: false, isReset: false});
  };

  const handleOnPressPause = () => {
    console.log("Pause Press!");
    setTimerState({...timerState, isPaused: true, isStarted: false, isReset: false});
  };

  const handleOnPressReset = () => {
    console.log("Reset Press!");
    setTime(10);
    setTimerState({
      ...timerState,
      isReset: true,
      isStarted: false,
      isPaused: true,
    })
  };

  useEffect(() => {
    let interval: any;

    if (timerState.isStarted) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [time, timerState.isStarted]);


  useEffect(() => {
    if (time === 0) {
      Alert.alert('Finalizo', 'Felicidades!')
      Vibration.vibrate(1000)
      setTimerState({isStarted: true, isPaused: false, isReset: false});
    }
  }, [time])

  const showStart = timerState.isPaused || timerState.isReset;

  const showReset = timerState.isPaused || timerState.isStarted;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTime(time)}</Text>
      {showStart ? (
        <Button title="Start" onPress={handleOnPressStart}/>
      ) : (
        <Button title="Pause" onPress={handleOnPressPause}/>
      )}

      {showReset && (
        <Button title="Reset" onPress={handleOnPressReset}/>
      )}

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

export default Timer;
