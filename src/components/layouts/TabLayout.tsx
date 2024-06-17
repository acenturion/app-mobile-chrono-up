import React from 'react';
import {StyleSheet, View} from "react-native";

function TabLayout({children}: {children: React.ReactNode}) {
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
    justifyContent: 'flex-start',
    padding: 16,
  },
});

export default TabLayout;