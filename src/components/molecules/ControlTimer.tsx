import React from 'react';
import {StyleSheet, View} from "react-native";
import Button from "@/components/atoms/Button";

interface ControlType {
  showStart: boolean,
  showReset: boolean,
  showSet?: boolean,
  onStart: () => void,
  onPause: () => void,
  onReset: () => void,
  onSet?: (a: number) => void,
}

function ControlTimer(
  {
    showStart,
    showReset,
    showSet,
    onStart,
    onPause,
    onReset,
    onSet = (a) => {},
  }: ControlType) {
  return (
    <View style={styles.container}>
      {showStart
        ? (<Button
          title="Inicio"
          onPress={onStart}
          style={{backgroundColor: "red"}}
        />)
        : (<Button
            title="Pausa"
            onPress={onPause}
            style={{backgroundColor: "blue"}}
          />
        )}
      {showReset && (
        <Button
          title="Reiniciar"
          onPress={onReset}
          style={{backgroundColor: "grey"}}
        />
      )}
      {showSet && (
        <Button
          title="Set"
          onPress={onSet}
          style={{backgroundColor: "blue"}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16
  },
});

export default ControlTimer;