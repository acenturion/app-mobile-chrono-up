import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {Lap} from "@/model/Lap";
import {Execution} from "@/model/Execution";
import {ChronoState} from "@/model/ChonoState";
import {ChronoContextType} from "@/model/ChronoContextType";
import * as Geolocation from "expo-location";
import {Location} from "@/model/Location";
import uuid from 'react-native-uuid';
import {saveByUserId} from "@/services/RemoteStorage.service";

const ChronoContext = createContext<ChronoContextType | null>(null);

export function useChrono(): ChronoContextType {
  const context = useContext(ChronoContext);
  if (!context) {
    throw new Error("useChrono must be used within an ChronoProvider.");
  }
  return context;
}

const ChronoProvider = ({children}: PropsWithChildren) => {
  const [timer, setTimer] = useState<number>(0);
  const [chronoState, setChronoState] = useState<ChronoState>({
    isPaused: false,
    isStarted: false,
    isReset: true,
  });
  const [laps, setLaps] = useState<Lap[]>([]);
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    (async () => {
      let {status} = await Geolocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let geolocation = await Geolocation.getCurrentPositionAsync({});
      setLocation({
        latitude: geolocation.coords.latitude,
        longitude: geolocation.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    let interval: any;

    if (chronoState.isStarted) {
      interval = setInterval(() => {
        setTimer((time) => time + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [timer, chronoState.isStarted]);

  const onReset = (userId: string) => {
    setTimer(0);
    setChronoState({
      isReset: true,
      isStarted: false,
      isPaused: true,
    });
    if (laps.length > 0) {
      const execution: Execution = {
        id: uuid.v4().toString(),
        date: new Date(),
        laps: laps,
        location: location
      };

      saveByUserId(userId, execution);
    }
    setLaps([]);
  };

  const onLap = () => {
    if (chronoState.isReset || chronoState.isPaused) return;
    const newLap: Lap = {
      id: uuid.v4().toString(),
      position: laps.length + 1 ?? 0,
      timer: timer,
      moment: new Date()
    }

    setLaps([...laps, newLap]);
  };

  const onPause = () => {
    setChronoState({isPaused: true, isStarted: false, isReset: false});
  };

  const onStart = () => {
    setChronoState({isStarted: true, isPaused: false, isReset: false});
  };

  const contextValue: ChronoContextType = {
    timer,
    laps,
    chronoState,
    onStart,
    onPause,
    onReset,
    onLap,
  };

  return (
    <ChronoContext.Provider value={contextValue}>
      {children}
    </ChronoContext.Provider>
  );
};

export default ChronoProvider;
