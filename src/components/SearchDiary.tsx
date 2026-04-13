import { Box, TextField, Select, MenuItem } from "@mui/material";

type myType=
{
  onChange1: (value: string) => void;
  type: string;
  setType: (value: string) => void;
   
}

export function SearchDairy({onChange1,type,setType,}: myType) {


return (    
    <Box  display="flex"  alignItems="center"
        gap={2}   className="search-align">
    
    <TextField
      size="small"
      placeholder="Search..."
      onChange={(e) => onChange1(e.target.value)}
      sx={{  height: 30,   "& .MuiInputBase-root": {
          height: 30,
        },
      }}/>

    <Select
      value={type}
      size="small"
      onChange={(e) => setType(e.target.value)}
      sx={{ height: 30, minWidth: 120 }}>

      <MenuItem value="all">All</MenuItem>
      <MenuItem value="milk">Milk</MenuItem>
      <MenuItem value="curd">Curd</MenuItem>
      <MenuItem value="yogurt">Yogurt</MenuItem>
      <MenuItem value="cheese">Cheese</MenuItem>
      <MenuItem value="butter">Butter</MenuItem>
      <MenuItem value="paneer">Paneer</MenuItem>
    </Select>
  </Box>
       
       
       
       
       
       
       
       
       
    //    <div className="search-align">
    //         <input type="text" style={{height:30}}  onChange={(e) => onChange1(e.currentTarget.value)}/>
    //         <Select    value={type}  size="small"
    //                     onChange={e => setType(e.target.value)}>
    //             <MenuItem value="all">All</MenuItem>
    //             <MenuItem value="milk">Milk</MenuItem>
    //             <MenuItem value="curd">Curd</MenuItem>
    //             <MenuItem value="yogurt">Yogurt</MenuItem>
    //             <MenuItem value="cheese">Cheese</MenuItem>
    //             <MenuItem value="butter">Butter</MenuItem>
    //             <MenuItem value="paneer">Paneer</MenuItem>
    //         </Select>
    //     </div>


   
   
);
}