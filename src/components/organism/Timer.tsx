import React from "react";
import {StyleSheet, View} from "react-native";
import {useTimer} from "@/context/TimerContex";
import WatchDisplay from "@/components/molecules/WatchDisplay";
import ControlTimer from "@/components/molecules/ControlTimer";

const Timer = () => {
  const {timer, timerState, onStart, onPause, onReset} = useTimer();
  const showStart = timerState.isPaused || timerState.isReset;
  const showReset = timerState.isPaused || timerState.isStarted;

  return (
    <View style={styles.container}>
      <WatchDisplay timer={timer}/>
      <ControlTimer
        showStart={showStart}
        showReset={showReset}
        onStart={onStart}
        onPause={onPause}
        onReset={onReset}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
});

export default Timer;
