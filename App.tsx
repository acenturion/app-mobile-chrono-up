import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";


import LoginScreen from "@/screens/Login";
import HomeChronoScreen from "@/screens/HomeChrono";
import HomeTimerScreen from "@/screens/HomeTimer";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Timer" component={HomeTimerScreen} />
        <Stack.Screen name="Chrono" component={HomeChronoScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


