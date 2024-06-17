import UserProvider from "@/context/UserContext";
import TimerProvider from "@/context/TimerContex";
import ChronoProvider from "@/context/ChronoContext";
import HistoryLapProvider from "@/context/HistoryLapContext";

import NavigationScreen from "@/screens/NavigationScreen";

export default function App() {
  return (
    <UserProvider>
      <TimerProvider>
        <ChronoProvider>
          <HistoryLapProvider>
            <NavigationScreen/>
          </HistoryLapProvider>
        </ChronoProvider>
      </TimerProvider>
    </UserProvider>
  )
    ;
}


