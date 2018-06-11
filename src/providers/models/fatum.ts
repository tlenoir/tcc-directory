
import { Galum } from "./galum";

export interface Fatum {
    id: number;
    name: string;
    logo: string;
    latitude: number;
    longitude: number;
    abus: number;
    skills: Galum[];
}