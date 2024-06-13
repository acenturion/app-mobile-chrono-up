import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import Title from "@/components/atoms/Title";
import {clearData, getByUserId} from "@/services/Storage.service";
import Button from "@/components/atoms/Button";
import LapHistoryItemList from "@/components/molecules/HistoryLapItemList";
import {Lap} from "@/model/Lap";
import {useNavigation} from "@react-navigation/core";

export interface HistoryLap {
  date: string;
  id: number;
  laps: Lap[]
}

function History() {
  const navigation = useNavigation();
  // TODO hacer contexto historial :D
  const [historyLap, setHistoryLap] = useState<HistoryLap[]>([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getHistoryRecord();
    });
  }, []);

  const getHistoryRecord = async () => {
    const result: HistoryLap[]  = await getByUserId('') as unknown as HistoryLap[]; //TODO: UserID
    setHistoryLap(result)
  }


  const handleOnPressClear = () => {
    console.log("Limpiando chache...")
    clearData()
    getHistoryRecord();
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title text={"Historial"}/>
        <Button onPress={handleOnPressClear} title={"Limpiar"} style={{backgroundColor: "red"}}/>
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
  title:{
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