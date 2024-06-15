import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {useChrono} from "@/context/ChronoContext";
import WatchDisplay from "@/components/molecules/WatchDisplay";
import LapItemList from "@/components/molecules/LapItemList";
import Title from "@/components/atoms/Title";
import ControlChrono from "@/components/molecules/ControlChrono";
import {useUser} from "@/context/UserContext";


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

  const {
    user
  } = useUser();

  const showStart = chronoState.isPaused || chronoState.isReset;
  const showReset = chronoState.isPaused && !chronoState.isReset;

  const handleOnReset = () => {
    onReset(user.id);
  }

  return (
    <View style={styles.container}>
      <WatchDisplay
        timer={timer}
        format
      />
      <ControlChrono
        showStart={showStart}
        showReset={showReset}
        onStart={onStart}
        onPause={onPause}
        onReset={handleOnReset}
        onLap={onLap}
      />

      <Title text={"Vueltas"}/>
      <FlatList
        data={laps}
        style={styles.list}
        renderItem={({item}) => <LapItemList {...item} />}
        keyExtractor={(item) => item?.id?.toString()}
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
