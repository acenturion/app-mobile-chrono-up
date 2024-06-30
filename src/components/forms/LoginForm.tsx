import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import {AuthUser} from "@/model/AuthUser";
import LoadingButton from "@/components/atoms/LoadingButton";

interface LoginFormProps {
  onSubmit: (value: AuthUser) => void;
}

function LoginForm({onSubmit}: LoginFormProps) {
  const [email, setEmail] = useState<string>("chris@ejemplo.com");
  const [password, setPassword] = useState<string>("123456");

  const handleOnSubmit = () => {
    onSubmit({email, password});
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <LoadingButton
        title={"Ingresar"}
        onPress={handleOnSubmit}
        style={{backgroundColor: "green"}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: 'white',
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    color: "white"
  },
});

export default LoginForm;