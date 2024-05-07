import React from 'react';
import {StyleSheet, View} from "react-native";
import Button from "@/components/atoms/Button";

interface ControlType {
  showStart: boolean,
  showReset: boolean,
  onStart: () => void,
  onPause: () => void,
  onReset: () => void,
}

function ControlTimer(
  {
    showStart,
    showReset,
    onStart,
    onPause,
    onReset,
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