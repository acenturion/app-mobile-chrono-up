import React from 'react';
import {StyleSheet, View} from "react-native";
import Button from "@/components/atoms/Button";

interface ControlType {
  showStart: boolean,
  showReset: boolean,
  onStart: () => void,
  onPause: () => void,
  onReset: () => void,
  onLap: () => void,
}

function ControlChrono(
  {
    showStart,
    showReset,
    onStart,
    onPause,
    onReset,
    onLap,
  }: ControlType) {
  return (
    <View style={styles.container}>
      {showReset
        ? (<Button
          title="Reiniciar"
          onPress={onReset}
          style={{backgroundColor: "grey"}}
        />)
        : (
          <Button
            title="Vuelta"
            onPress={onLap}
            style={{backgroundColor: "grey"}}
          />
        )}

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

export default ControlChrono;