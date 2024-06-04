import {NavigationContainer} from "@react-navigation/native";


import HomeChronoScreen from "@/screens/HomeChrono";
import HomeTimerScreen from "@/screens/HomeTimer";
import ChronoProvider from "@/context/ChronoContext";
import TimerProvider from "@/context/TimerContex";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HistoryChronoScreen from "@/screens/HistoryChrono";

const Tab = createBottomTabNavigator();


export default function App() {
  console.log(process.env.EXPO_PUBLIC_VERSION_APP)
  return (
    <NavigationContainer>
      <TimerProvider>
        <ChronoProvider>
          <Tab.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "black"
              },
              tabBarActiveTintColor: "white",
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                backgroundColor: "black"
              },
            }}
          >
            <Tab.Screen name="Timer" options={{title: "Temporizador"}} component={HomeTimerScreen}/>
            <Tab.Screen name="Chrono" options={{title: "Cronometro"}} component={HomeChronoScreen}/>
            <Tab.Screen name="History" options={{title: "Historial"}} component={HistoryChronoScreen}/>
          </Tab.Navigator>
        </ChronoProvider>
      </TimerProvider>
    </NavigationContainer>
  )
    ;
}


