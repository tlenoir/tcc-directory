

import { Fatum } from "./fatum";


export interface RootObjectBusinesses {
        current_page: number;
        data: Fatum[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        next_page_url: string;
        path: string;
        per_page: number;
        prev_page_url?: any;
        to: number;
        total: number;
    }

