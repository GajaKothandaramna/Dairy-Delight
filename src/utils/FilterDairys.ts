import type { Dairy } from "../types/Dairy";


export default function FilterDairyss(dairys:Dairy[], searchText: string) {
    if (!searchText) return dairys;
    else {
        const results = dairys.filter((Dairy) =>
        Dairy.name?.toLowerCase().includes(searchText.toLowerCase())
      );
      return results;
    }
  }