import React from 'react';
import {StyleSheet, View} from "react-native";

function ScreenLayout({children}: {children: React.ReactNode}) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});

export default ScreenLayout;