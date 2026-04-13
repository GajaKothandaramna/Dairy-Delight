
import { useEffect,  useState } from "react"
//import axios from "axios";
import { SearchDairy } from "./SearchDiary";
import { DairyCard } from "./DairyCard";
//import { ErrorMessage } from "./ErrorMessage";
import type { Dairy } from "../types/Dairy";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";

type Props = {
   dairys: Dairy[];
  onEditDairy: (dairy: Dairy) => void;
  onDeleteDairy: (id: string) => void;
};

export function DairyList({ dairys,onEditDairy, onDeleteDairy }: Props) {
    const[sortby, setsortby]=useState("")
    const[searchText, setsearchText]=useState("")
    const [type, setType] = useState("all");
    //const[Dairys,setDairys]=useState<Dairy[]>([]);
    const [loadingMessage,setloadingMessage]=useState(true)
    //const[errMessage, seterrMessage]=useState("")
   

    // useEffect(()=>
    // {
    //     async function getData()
    //     {
    //         try{
    //             // const res=await axios.get("http://localhost:3000/dairy")
    //             // console.log(res.data)
    //             // setDairys(res.data)
    //              const res = await fetch(`${import.meta.env.BASE_URL}dairy.json`);
    //             const data = await res.json();
    //             console.log(data);
    //             setDairys(Array.isArray(data) ? data : data.dairy);
    //         }
    //         catch(err)
    //         {
    //             seterrMessage("Error has occured")
    //         }
    //         finally{setloadingMessage(false)}
    //     }
    //     getData();
    // },[])
    
    useEffect(() => {
      setloadingMessage(false);
    }, []);
    const filteredArray = dairys.filter((dairy: Dairy) => {
    const matchesSearch =
      dairy.name.toLowerCase().includes(searchText.toLowerCase()) ||
      dairy.price.toString().includes(searchText);
      const matchesType =
      type === "all" ||  dairy.type.toLowerCase() === type.toLowerCase();
    return matchesSearch && matchesType;
    })
    const sortedDairys=[...filteredArray].sort((a:Dairy,b:Dairy)=>
    {
        if(sortby==="name")
             return String(a.name).localeCompare(String(b.name))
        if(sortby==="price")
           return a.price-b.price
        return 0;
    })

  
    
  
    return(

         <Box >
        <Box  sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        m: "1rem 2.2rem 1.5rem",
        flexWrap: "wrap",
        }}>

        <SearchDairy
        onChange1={setsearchText}
        type={type}
        setType={setType}/>

        <Select
        value={sortby}
        onChange={(event) => setsortby(event.target.value)}
        displayEmpty
        size="small"
        sx={{ minWidth: 160 }}>

        <MenuItem value="">
          <em>Select</em>
        </MenuItem>
        <MenuItem value="name">Dairy Name</MenuItem>
        <MenuItem value="price">Dairy Price</MenuItem>
      </Select>
      </Box>
      {loadingMessage && (
      <Box display="flex" alignItems="center" gap={1}>
        <CircularProgress size={20} />
        <Typography>Loading...</Typography>
      </Box>
    )}
    {/* {errMessage && <ErrorMessage msg={errMessage} />} */}

    
    {!loadingMessage && dairys.length === 0 && (
      <Typography>No dairy products available right now.</Typography>
    )}

    {!loadingMessage && sortedDairys.length === 0 && dairys.length > 0 && (
      <Typography>No products match your search or filter.</Typography>
    )}

    {sortedDairys.length > 0 && (
      <Box  component="ul"
        sx={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 2,
          mt: 2,
          px: 3,
        }}>
        {sortedDairys.map((dairy: Dairy) => (
          <Box component="li" key={dairy.id}>
             <DairyCard key={dairy.id}
                    dairy1={dairy}
                    onEditDairy={onEditDairy}
                    onDeleteDairy={onDeleteDairy}/>
          </Box>
        ))}

      </Box>
    )}
    </Box>

    
    )
}
