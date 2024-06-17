import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import LapItemList from "@/components/molecules/LapItemList";
import {formatDateTime} from "@/utils/timer-utils";
import {HistoryLap} from "@/model/HistoryLap";

function LapHistoryItemList({date, laps = [], location}: HistoryLap) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {`${formatDateTime(date as Date)}`}
      </Text>
      <FlatList
        data={laps}
        renderItem={({item}: any) => <LapItemList {...item}/>}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: Dimensions.get('window').width,
    padding: 16,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 8
  },
});

export default LapHistoryItemList;