import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {formatTimeOfNumber, formatTimer} from "@/utils/timer-utils";

interface WatchDisplayProps {
  timer: number,
  format?: boolean
}

function WatchDisplay({timer, format = false}: WatchDisplayProps) {
  return (
    <View style={styles.container}>
      {format
        ? (<Text style={styles.text}>{formatTimeOfNumber(timer)}</Text>)
        : (<Text style={styles.text}>{formatTimer(timer)}</Text>)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 72 * 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

  },
  text: {
    color: "#fff",
    marginBottom: 16,
    fontSize: 74,
    fontWeight: "bold",
  },
});

export default WatchDisplay;