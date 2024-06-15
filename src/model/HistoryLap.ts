import {Lap} from "@/model/Lap";
import {Location} from "@/model/Location";

export interface HistoryLap {
  id: string,
  date: Date,
  laps: Lap[],
  location?: Location
}