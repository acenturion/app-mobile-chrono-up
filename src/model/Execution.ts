import { Lap } from "./Lap";
import { Location } from "./Location";

export interface Execution {
    id: string;
    date: Date,
    laps: Lap[],
    location?: Location
}