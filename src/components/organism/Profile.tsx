import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {User} from "@/model/User";
import Button from "@/components/atoms/Button";

interface ProfileProps {
  user: User,
  onLogOut: () => void,
}

function Profile({user, onLogOut}: ProfileProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>ID: {user.id}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
      </View>

      <Button
        title={"Salir"}
        onPress={onLogOut}
        style={{backgroundColor: "green"}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    gap: 16
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 10,
  },
  list: {
    width: "100%"
  },
});

export default Profile;