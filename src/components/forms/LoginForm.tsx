import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from "react-native";
import {AuthUser} from "@/model/AuthUser";
import LoadingButton from "@/components/atoms/LoadingButton";
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

WebBrowser.maybeCompleteAuthSession()
interface LoginFormProps {
  onSubmit: (value: AuthUser) => void;
}

function LoginForm({onSubmit}: LoginFormProps) {
  const [email, setEmail] = useState<string>("ale@ale.com");
  const [password, setPassword] = useState<string>("Test1234");

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "420976665829-k1n7fqrb9sg9pg2jmuh01i2kfi0vdt95.apps.googleusercontent.com",
    iosClientId: "420976665829-mrosiggipd48ajutfflr1c65pja1d3b0.apps.googleusercontent.com"
  });
  const [user, setUser] = useState()

  React.useEffect(() => {
    if(response?.type === 'success') {
      console.log(response)
      fetchUserInfo(response.authentication?.accessToken)
    }
  }, [])

  const fetchUserInfo = async (token: string | undefined) => {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }});
      const userInfo = await response.json() 
      console.log(userInfo)
      setUser(userInfo)
    }
  

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
      <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
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