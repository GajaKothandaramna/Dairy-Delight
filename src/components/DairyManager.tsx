
import { useContext } from "react";

import AuthContext from "./AuthContext";
import { DairyList } from "./DairyList";
import AddDairyForm from "./AddDairyForm";
import type { Dairy } from "../types/Dairy";


type Props = {
   dairys: Dairy[];
  onAddDairy: (dairy: Dairy) => void;
  onEditDairy: (dairy: Dairy) => void;
  onDeleteDairy: (id: string) => void;
};


export default function DairyManager({ dairys, onAddDairy,onEditDairy, onDeleteDairy, }: Props) {
const { role } = useContext(AuthContext)!;

return (    
        <div>
            <p className="title"> Search Your Diary Products....</p>
            {role === "ADMIN" &&    <AddDairyForm onAddDairy={onAddDairy}/> }       
              
              <DairyList   dairys={dairys} 
                          onEditDairy={onEditDairy}
                          onDeleteDairy={onDeleteDairy} />
                       
        </div>
 
);
}