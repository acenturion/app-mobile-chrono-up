import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {formatTime} from "@/utils/timer-utils";
import { Lap } from '@/model/Lap';

function LapItemList({position, moment}: Lap) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Vuelta ${position}: ${formatTime(moment)}` }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LapItemList;