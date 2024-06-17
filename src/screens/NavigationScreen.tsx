import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import LoginScreen from "@/screens/LoginScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import HomeTimerScreen from "@/screens/HomeTimer";
import HomeChronoScreen from "@/screens/HomeChrono";
import HistoryChronoScreen from "@/screens/HistoryChrono";

import {useUser} from "@/context/UserContext";

import Ionicons from "@expo/vector-icons/Ionicons";
import {AntDesign} from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function NavigationScreen() {
  const {user} = useUser()
  return (
    <NavigationContainer>
      {user ? (
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
              component={ProfileScreen}
              name="Profile"
              options={{
                title: "Perfil",
                tabBarIcon: ({color}) => <AntDesign size={24} name="user" color={color}/>
              }}
            />
          </Tab.Navigator>
        )
        : (
          <Stack.Navigator>
            <Stack.Screen
              component={LoginScreen}
              name="Login"
              options={{
                headerShown: false,
                title: "Log in",
              }}
            />
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}

export default NavigationScreen;