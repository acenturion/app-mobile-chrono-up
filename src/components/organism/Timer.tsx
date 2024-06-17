import React, {useRef} from "react";
import {Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View} from "react-native";
import {useTimer} from "@/context/TimerContex";
import WatchDisplay from "@/components/molecules/WatchDisplay";
import ControlTimer from "@/components/molecules/ControlTimer";

const Timer = () => {
  const inputRef = useRef<TextInput>(null);

  const [newTimer, setNewTimer] = React.useState("");

  const {timer, timerState, onStart, onPause, onReset, onSet} = useTimer();
  const showStart = timerState.isPaused || timerState.isReset && !timerState.isStarted;
  const showSet = (!timerState.isPaused || timerState.isReset) && !timerState.isStarted;
  const showReset = (timerState.isPaused || !timerState.isStarted) && !timerState.isReset;


  const handlePressSet = () => {
    inputRef.current?.focus();
    setNewTimer("")
    onSet("0");
  };

  const handleOnStart = () => {
    Keyboard.dismiss()
    onStart();
  };

  const handleChangeText = (text: string) => {
    if (text === ',' || text === '.') return;
    if (text.length > 4) return;
    if (text.length === 0) {
      setNewTimer("")
      onSet("0");
      return;
    }

    setNewTimer(text)
    onSet(text);
  }

  return (
    <View style={styles.container}>
      <WatchDisplay timer={timer}/>
      <ControlTimer
        showStart={showStart}
        showReset={showReset}
        showSet={showSet}
        onStart={handleOnStart}
        onPause={onPause}
        onReset={onReset}
        onSet={handlePressSet}
      />
      <View>
        <TextInput
          style={styles.test}
          ref={inputRef}
          value={newTimer}
          onChangeText={handleChangeText}
          keyboardType="number-pad"
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  test: {
    borderWidth: 1,
    borderColor: "white",
    color: "white",
    display: "none"
  }
});

export default Timer;
