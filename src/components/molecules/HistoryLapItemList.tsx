import React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import LapItemList from "@/components/molecules/LapItemList";
import {formatDateTime} from "@/utils/timer-utils";
import {HistoryLap} from "@/model/HistoryLap";

function LapHistoryItemList({date, laps = [], location}: HistoryLap) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Ubicacion: [{location?.latitude} {location?.longitude}]
      </Text>
      <Text style={styles.text}>
        {`${formatDateTime(date as Date)}`}
      </Text>
      <FlatList
        data={laps}
        style={styles.item}
        renderItem={({item}: any) => <LapItemList {...item}/>}
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
    width: "100%",
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