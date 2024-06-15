import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


import UserProvider from "@/context/UserContext";
import TimerProvider from "@/context/TimerContex";
import ChronoProvider from "@/context/ChronoContext";
import HistoryLapProvider from "@/context/HistoryLapContext";

import Login from "@/screens/Login";
import HomeTimerScreen from "@/screens/HomeTimer";
import HomeChronoScreen from "@/screens/HomeChrono";
import HistoryChronoScreen from "@/screens/HistoryChrono";

import {AntDesign} from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <TimerProvider>
          <ChronoProvider>
            <HistoryLapProvider>
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
                <Tab.Screen
                  component={HomeTimerScreen}
                  name="Timer"
                  options={{
                    title: "Temporizador",
                    tabBarIcon: ({color}) => <Ionicons name="timer-outline" size={24} color={color}/>,
                  }}
                />
                <Tab.Screen
                  component={HomeChronoScreen}
                  name="Chrono"
                  options={{
                    title: "Cronometro",
                    tabBarIcon: ({color}) => <Octicons name="stopwatch" size={24} color={color}/>,
                  }}
                />
                <Tab.Screen
                  component={HistoryChronoScreen}
                  name="History"
                  options={{
                    title: "Historial",
                    tabBarIcon: ({color}) => <AntDesign name="calendar" size={24} color={color}/>,
                  }}
                />
                <Tab.Screen
                  component={Login}
                  name="Login"
                  options={{
                    title: "Perfil",
                    tabBarIcon: ({color}) => <AntDesign size={24} name="user" color={color}/>
                  }}
                />
              </Tab.Navigator>
            </HistoryLapProvider>
          </ChronoProvider>
        </TimerProvider>
      </UserProvider>
    </NavigationContainer>
  )
    ;
}


