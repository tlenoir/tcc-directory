
import { Skill } from "./skill";
export interface RootObject {
        id: number;
        name: string;
        logo: string;
        latitude: number;
        longitude: number;
        abus: number;
        skills: Skill[];
    }


