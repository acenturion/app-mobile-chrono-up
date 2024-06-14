import React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import LapItemList from "@/components/molecules/LapItemList";
import {formatDateTime} from "@/utils/timer-utils";
import { Execution } from '@/model/Execution';

function LapHistoryItemList({date, laps = [], location, id}: Execution) {
  return (
    <View style={styles.container}>
      {<Text style={styles.text}>{`Ejecucion ${id} - ${formatDateTime(date as Date)} - Ubicacion: [${location?.latitude} - ${location?.longitude}`}</Text>} 
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