import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Card,
  CardContent,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import type { JSX } from "react";
import type { SelectChangeEvent } from "@mui/material";
import { PRODUCT_TYPES, type Dairy, type ProductType } from "../types/Dairy";

type AddDairyFormProps = {
  onAddDairy: (dairy:Dairy) => void;
  
};

export default function AddDairyForm({ onAddDairy}: AddDairyFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    type:"",
    price: "",
    lactoseFree: true,
    fatPercentage: "",
    image:"",
    
  });

  const [expanded, setExpanded] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showAlert, setShowAlert] = useState(false);

  const validateInput = ( name: string,  value: string | number | boolean): boolean => {
    const newErrors = { ...errors };
    if (name === "name") {
      if (!value || (typeof value === "string" && value.length < 3)) {
        newErrors.name = "Dairy name must be at least 2 characters.";
      } else delete newErrors.name;
    }
    if (name === "type") {
      if (!value || (typeof value === "string" && value.length < 3)) {
        newErrors.type = "Dairy type must be at least 2 characters.";
      } else delete newErrors.type;
    }

    if (name === "price") {
      if (!value || isNaN(Number(value)) || Number(value) <= 0) {
        newErrors.price = "Enter a valid positive price.";
      } else delete newErrors.price;
    }
    
    if (name === "lactoseFree") {
      if (!value || isNaN(Number(value)) || Number(value) <= 0) {
        newErrors.lactoseFree = "Enter a valid positive lactoseFree.";
      } else delete newErrors.lactoseFree;
    }
     if (name === "lactoseFree") {
      if (!value || isNaN(Number(value)) || Number(value) <= 0) {
        newErrors.lactoseFree = "Enter a valid positive lactoseFree.";
      } else delete newErrors.lactoseFree;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSelectChange = (e: SelectChangeEvent<string | string[]>) => {
  //   const { name, value } = e.target;
  //   if (name) {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const clearFormData = () => {
    setFormData({
      name: "",
      type:"",
      price: "",
      lactoseFree:true,
      fatPercentage: "",
       image:"",
   
    });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //validate before submit
    if (
      !validateInput("name", formData.name) ||
      !validateInput("type", formData.type) ||
      !validateInput("price", formData.price) ||
      !validateInput("fatPercentage", formData.fatPercentage) 
     ) return;
    try {
      const name = formData.name.toLowerCase();
      const newDairy: Dairy = {
        id: String(Date.now()),
        name: name,
        type: formData.type as ProductType,
        price: Number(formData.price),
        lactoseFree: formData.lactoseFree,
        fatPercentage: Number(formData.fatPercentage),
        image: `${formData.name.toLowerCase().replace(/\s+/g, "-")}.jpg`,
       
      };
         onAddDairy(newDairy as Dairy);
         setShowAlert(true);
         clearFormData();
         setExpanded(false);
        setTimeout(() => setShowAlert(false), 3000);           
    } catch (error) {
      console.error("Error submitting form:", error);
      clearFormData();
    }
   
  };



  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Card sx={{ bgcolor: "#fafafa", boxShadow: 3 }}>
        <CardContent onClick={handleExpandClick}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Add Dairy Details
          </Typography>
          <ExpandMoreIcon
            sx={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Dairy Name"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                //onBlur={() => validateInput("name", formData?.name)}
                error={!!errors?.name}
                helperText={errors.name}
                fullWidth
                margin="normal"
              />

               <TextField
              select
              label="Dairy Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.type}
              helperText={errors.type}
            >
              {PRODUCT_TYPES.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

              <TextField
                label="Price (Rs)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                //onBlur={() => validateInput("price", formData.price)}
                error={!!errors.price}
                helperText={errors.price}
                fullWidth
                margin="normal"
              />

               <TextField
              label="LactoseFree"
              name="lactoseFree"
              value={formData.lactoseFree}
              type="number"
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.lactoseFree}
              helperText={errors.lactoseFree}
            />

                 <TextField
              label="Fat Percentage"
              name="fatPercentage"
              value={formData.fatPercentage}
              type="number"
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.fatPercentage}
              helperText={errors.fatPercentage}
            />         

              {/* Buttons */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  onClick={clearFormData}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    color: "#2F4F4F",
                    borderColor: "#2F4F4F",
                    "&:hover": { borderColor: "#1e3535", color: "#1e3535" },
                  }}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    bgcolor: "#2E7D32",
                    "&:hover": { bgcolor: "#256628" },
                  }}
                >
                  Add Dairy
                </Button>
              </Box>
            </form>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}
