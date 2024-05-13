import React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {Lap} from "@/model/Lap";
import LapItemList from "@/components/molecules/LapItemList";
import {formatDate} from "@/utils/timer-utils";

export interface LapHistoryItemInterface {
  date: Date,
  id: number,
  laps: Lap[]
}

function LapHistoryItemList({date, id, laps = []}: LapHistoryItemInterface) {
  console.log(date)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${formatDate(date)}`}</Text>
      <FlatList
        data={laps}
        style={styles.item}
        renderItem={({item}) => <LapItemList {...item}/>}
        keyExtractor={(item) => JSON.stringify(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%"
  },

  item: {
    padding: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%"
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LapHistoryItemList;