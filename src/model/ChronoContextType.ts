import {ChronoState} from "@/model/ChonoState";
import {Lap} from "@/model/Lap";

export interface ChronoContextType {
  timer: number,
  laps: Lap[];
  chronoState: ChronoState;
  onStart: () => void,
  onPause: () => void,
  onReset: () => void,
  onLap: () => void,
}