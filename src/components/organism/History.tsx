import React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import Title from "@/components/atoms/Title";
import Button from "@/components/atoms/Button";
import LapHistoryItemList from "@/components/molecules/HistoryLapItemList";
import {useHistoryLap} from "@/context/HistoryLapContext";

function History() {
  const {historyLap, clearHistory} = useHistoryLap();

  const handleOnPressClear = () => {
    clearHistory();
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title text={"Historial"}/>
        <Button
          onPress={handleOnPressClear}
          title={"Limpiar"}
          style={{backgroundColor: "red"}}
        />
      </View>

      <FlatList
        data={historyLap}
        style={styles.list}
        ListEmptyComponent={<Text style={{color: "white"}}>No hay vueltas para mostrar.</Text>}
        renderItem={({item}) => <LapHistoryItemList {...item}/>}
        keyExtractor={(item) => item.date.toString()}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  list: {
    width: "100%"
  },
});

export default History;