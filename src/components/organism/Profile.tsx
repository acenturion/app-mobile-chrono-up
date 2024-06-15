import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {User} from "@/model/User";
import Button from "@/components/atoms/Button";

interface ProfileProps {
  user: User,
  onLogOut: () => void,
}

function Profile({user, onLogOut} :ProfileProps) {
  return (
    <View style={styles.container}>
      <Text style={{color: "white"}}>{user.id}</Text>
      <Text style={{color: "white"}}>{user.email}</Text>

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
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  list: {
    width: "100%"
  },
});

export default Profile;