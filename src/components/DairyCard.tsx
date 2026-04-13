
import { useBasket } from "./BasketContext";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import type { Dairy } from "../types/Dairy";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CardActions } from "@mui/material";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import AuthContext from "./AuthContext";
import { useContext } from "react";

type Props = {
  dairy1: Dairy;
  onEditDairy: (dairy: Dairy) => void;
  onDeleteDairy: (id: string) => void;
};


export function DairyCard({ dairy1, onEditDairy, onDeleteDairy }: Props) {

const { basket, addToBasket,removeFromBasket } = useBasket();
const basketItem = basket.find(item => item.id === dairy1.id);
const quantity = basketItem?.quantity || 0;
const { role } = useContext(AuthContext)!;
return (

  <Card
    component="li"
    sx={{
      listStyle: "none",
      border: "1px solid #cfd8dc",
      borderRadius: 2,
      width: 280,
      textAlign: "center",
      p: 1,  backgroundColor: "#fff",
    }}>

    {/* <CardMedia   component="img"
      image={dairy1.image}
      alt={dairy1.name}
      sx={{
        height: 150,
        width: "100%",
        objectFit: "cover",
        borderRadius: 1,
      }}/> */}

    <CardMedia
      component="img"
      image={`${import.meta.env.BASE_URL}${dairy1.image}`}
      alt={dairy1.name}
      sx={{
        height: 150,
        width: "100%",
        objectFit: "cover",
        borderRadius: 1,
      }}
    />
    <CardContent sx={{ p: 1 }}>
      <Typography variant="subtitle1" fontWeight="bold">
        {dairy1.name}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {dairy1.type}
      </Typography>

      <Typography variant="body1" fontWeight="bold">
        ₹{dairy1.price}
      </Typography>

      <Typography variant="body2">
        Fat: {dairy1.fatPercentage}%
      </Typography>
    </CardContent>

      {role === "USER" && (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        pb={1}>

          {quantity === 0 ? (
            <IconButton onClick={() => addToBasket(dairy1)}>
              <AddShoppingCartIcon sx={{ color: "green" }} />
            </IconButton>
          ) : (
              <>
                <IconButton onClick={() => removeFromBasket(dairy1)}>
                  <RemoveShoppingCartIcon sx={{ color: "red" }} />
                </IconButton>

                <Typography fontWeight="bold">{quantity}</Typography>

                <IconButton onClick={() => addToBasket(dairy1)}>
                  <AddShoppingCartIcon sx={{ color: "green" }} />
                </IconButton>
              </>
            )}
        </Box>
      )}
     {role === "ADMIN" && (
  <CardActions sx={{ justifyContent: "center", pb: 1 }}>
    <IconButton onClick={() =>  onEditDairy(dairy1)}>  
      <EditIcon />
    </IconButton>

    <IconButton onClick={() => onDeleteDairy(dairy1.id!)}>
      <DeleteIcon />
    </IconButton>
  </CardActions>
)}
  </Card>

)}






  {/* <li className="dairycard" >
<img className="image" src={dairy1.image} alt={dairy1.name}  width="200"  height="150"/>    
<p className="name">{dairy1.name}</p>
<p className="type">{dairy1.type}</p>
<p className="price">₹{dairy1.price}</p>
<p className="fat">Fat: {dairy1.fatPercentage}%</p> 
 
<div className="cart-controls">
    {quantity === 0 ? (
      <button onClick={() => addToBasket(dairy1)}>
        <AddShoppingCartIcon style={{ color: "green" }} />
      </button>
    ) : (
      <>
        <button onClick={() => removeFromBasket(dairy1)}>
          <RemoveShoppingCartIcon style={{ color: "red" }} />
        </button>

        <span className="qty">{quantity}</span>

        <button onClick={() => addToBasket(dairy1)}>
          <AddShoppingCartIcon style={{ color: "green" }} />
        </button>
      </>
    )}
  </div>
</li> */}
