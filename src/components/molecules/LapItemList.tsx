import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {formatTimeOfNumber} from "@/utils/timer-utils";
import {Lap} from '@/model/Lap';

function LapItemList({position, moment, timer}: Lap) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Vuelta ${position}: ${formatTimeOfNumber(timer)}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: "#fff",
    fontSize: 18,
    paddingBottom: 8,
  },
});

export default LapItemList;