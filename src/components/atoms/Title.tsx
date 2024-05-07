import React from 'react';
import {StyleSheet, Text, View} from "react-native";

function Title({text}: { text: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    width: "100%"
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  }
});

export default Title;