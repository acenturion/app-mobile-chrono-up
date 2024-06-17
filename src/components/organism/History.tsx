import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import Title from "@/components/atoms/Title";
import Button from "@/components/atoms/Button";
import LapHistoryItemList from "@/components/molecules/HistoryLapItemList";
import {useHistoryLap} from "@/context/HistoryLapContext";
import {useFocusEffect} from "@react-navigation/core";
import {useUser} from "@/context/UserContext";

function History() {
  const {historyLap, clearHistory, fetchHistory} = useHistoryLap();
  const {user} = useUser();
  useFocusEffect(
    useCallback(() => {
      fetchHistory(user.id);
    }, [user.id])
  );

  const handleOnPressClear = () => {
    clearHistory(user.id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title text={""}/>
        <Button
          onPress={handleOnPressClear}
          title={"Limpiar"}
          style={{backgroundColor: "red"}}
        />
      </View>

      {historyLap.length > 0
        ? (
          <FlatList
            data={historyLap}
            style={styles.list}
            ListEmptyComponent={<Text style={{color: "white"}}>No hay vueltas para mostrar.</Text>}
            renderItem={({item}) => <LapHistoryItemList {...item}/>}
            keyExtractor={(item) => item.date.toString()}
          />
        )
        : (<Text style={{color: "white"}}>Cargando...</Text>)
      }
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