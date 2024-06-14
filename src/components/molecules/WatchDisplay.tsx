import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {formatTimeOfNumber} from "@/utils/timer-utils";

function WatchDisplay({timer}: { timer: number }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTimeOfNumber(timer)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 72*3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

  },
  text: {
    color: "#fff",
    marginBottom: 16,
    fontSize: 82,
    fontWeight: "bold",
  },
});

export default WatchDisplay;