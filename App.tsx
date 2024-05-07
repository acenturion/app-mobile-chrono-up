import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";


import LoginScreen from "@/screens/Login";
import HomeChronoScreen from "@/screens/HomeChrono";
import HomeTimerScreen from "@/screens/HomeTimer";
import ChronoProvider from "@/context/ChronoContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ChronoProvider>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2d2d2d'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Timer" options={{title: "Temporizador"}} component={HomeTimerScreen}/>
          <Stack.Screen name="Chrono" options={{title: "Cronometro"}} component={HomeChronoScreen}/>
          <Stack.Screen name="Login" options={{title: "Inicio"}} component={LoginScreen}/>
        </Stack.Navigator>
      </ChronoProvider>
    </NavigationContainer>
  );
}


