import { HeaderType } from "./header-type";
import { Sort } from "./sort";

export interface TableHeader {
    name: string;
    key: string;
    sortable?: boolean;
    sort?: Sort;
    type?: HeaderType;
    format?: string;
    active?: boolean;
}

  