import React, {useCallback, useRef, useState} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import Title from "@/components/atoms/Title";
import Button from "@/components/atoms/Button";
import LapHistoryItemList from "@/components/molecules/HistoryLapItemList";
import {useHistoryLap} from "@/context/HistoryLapContext";
import {useFocusEffect} from "@react-navigation/core";
import {useUser} from "@/context/UserContext";
import MapLocation from "@/components/organism/MapLocation";


function History() {
  const {width} = Dimensions.get('window');
  const {historyLap, loading, clearHistory, fetchHistory} = useHistoryLap();
  const [location, setLocation] = useState<any>();
  const {user} = useUser();

  useFocusEffect(
    useCallback(() => {
      fetchHistory(user.id);
    }, [user.id])
  );

  const handleOnPressClear = () => {
    clearHistory(user.id);
  }

  const onViewableItemsChanged = useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setLocation(viewableItems[0].item.location);
    }
  }).current;

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title text={"Mis vueltas"}/>
        <Button
          onPress={handleOnPressClear}
          title={"Limpiar"}
          style={{backgroundColor: "red"}}
        />
      </View>

      {loading
        ? (<Text style={{color: "white"}}>Cargando...</Text>)
        : (
          <>
            {(historyLap.length > 0 && location) && (
              <MapLocation
                longitude={location.longitude}
                latitude={location.latitude}
              />
            )}
            <ScrollView>
              <FlatList
                data={historyLap}
                horizontal
                ListEmptyComponent={<Text style={{color: "white"}}>No hay vueltas para mostrar.</Text>}
                renderItem={({item}) => <LapHistoryItemList {...item}/>}
                keyExtractor={(item) => item.id}
                snapToInterval={width}
                snapToAlignment="center"
                decelerationRate="fast"
                onViewableItemsChanged={onViewableItemsChanged}
                showsHorizontalScrollIndicator={false}
              />
            </ScrollView>
          </>
        )
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
});

export default History;