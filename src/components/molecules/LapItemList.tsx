import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {formatTime} from "@/utils/timer-utils";

function LapItemList({id, value}: { id: number, value: number }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Vuelta ${id}: ${formatTime(value)}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LapItemList;