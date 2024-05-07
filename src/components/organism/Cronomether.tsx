import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {useChrono} from "@/context/ChronoContext";
import WatchDisplay from "@/components/molecules/WatchDisplay";
import LapItemList from "@/components/molecules/LapItemList";
import Title from "@/components/atoms/Title";
import ControlChrono from "@/components/molecules/ControlChrono";


const Chronometer = () => {
  const {
    chronoState,
    laps,
    timer,
    onStart,
    onPause,
    onReset,
    onLap,
  } = useChrono();

  const showStart = chronoState.isPaused || chronoState.isReset;
  const showReset = chronoState.isPaused && !chronoState.isReset;

  return (
    <View style={styles.container}>
      <WatchDisplay timer={timer}/>

      <ControlChrono
        showStart={showStart}
        showReset={showReset}
        onStart={onStart}
        onPause={onPause}
        onReset={onReset}
        onLap={onLap}
      />

      <Title text={"Vueltas"}/>
      <FlatList
        data={laps}
        style={styles.list}
        renderItem={({item}) => <LapItemList {...item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  list: {
    width: "100%"
  },
});

export default Chronometer;
