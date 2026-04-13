
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext, type JSX } from "react";

import { Link } from "react-router-dom";
import { useBasket } from "./BasketContext";
import AuthContext from "./AuthContext";

export function Header(): JSX.Element {
  const { basket } = useBasket();
  const { isLoggedIn, logout, role } = useContext(AuthContext)!;

  return (
     
     <AppBar position="static">
      <Toolbar sx={{backgroundColor:" #08c29a",position: "relative" }}>
      
         <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={"/dairyproduct/dairylogo.png"}
            alt="Dairy Delights Logo"
            style={{ height: 60, marginRight: 8 }}
          />
        </Box>
         
         <Typography variant="h6"
          sx={{
                position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
            }}>
         <h1> Welcome to Dairy Delights</h1>
        </Typography>

        {/* Navigation Buttons */}
        <Box sx={{ marginLeft: "auto" }}>
          <Button   color="inherit"    component={Link} 
            to="/">     Home
          </Button>

        {role === "USER" && (
            <Button   color="inherit"  component={Link}
                  to="/basket">  My Basket
            <Box  sx={{ ml: 1,   px: 1,   borderRadius: "12px",
                          backgroundColor: "white",   color: "#08c29a",
                          fontWeight: "bold",   fontSize: "0.8rem", }}>
                  {basket.length}
            </Box>
          </Button>
        )}



          {/* <Button
            color="inherit"
            component={Link}
            to="/basket">
            My Basket 
          <Box  sx={{ ml: 1,  px: 1, borderRadius: "12px",   backgroundColor: "white",
              color: "#08c29a",  fontWeight: "bold", fontSize: "0.8rem",
                    }}>
                  {basket.length}
          </Box>
          </Button> */}
        </Box>
        {!isLoggedIn ? (
  <Button component={Link} to="/login">Login</Button>
) : (
  <>
    <Typography>{role}</Typography>
    <Button onClick={logout}>Logout</Button>
  </>
)}
      </Toolbar>
    </AppBar>
  );
}