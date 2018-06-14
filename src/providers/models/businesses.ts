
import { Skill } from "./skill";
export interface RootObjectBusinesses {
        id: number;
        name: string;
        logo: string;
        latitude: number;
        longitude: number;
        abus: number;
        skills: Skill[];
    }


