
import { BrowserRouter, Routes, Route, data, resolvePath } from "react-router-dom";
import './App.css'
import DairyManager from './components/DairyManager';
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { BasketProvider } from "./components/BasketContext";
import { BasketPage } from "./components/BasketPage";
import { useContext, useEffect, useRef, useState, type ChangeEvent } from "react";
import type { Dairy } from "./types/Dairy";
import AuthContext from "./components/AuthContext";
import axios from "axios";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";



function App() {
  const renderCount = useRef(0);
  renderCount.current++;
  const [editingDairy, setEditingDairy] = useState<Dairy | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const { role} = useContext(AuthContext)!;
  //const { data: dairys = [] } =  useFetch<Dairy[]>("http://localhost:3000/dairy");
  const [dairys, setDairys] = useState<Dairy[]>([]);
  useEffect(() => {  fetchDairys();}, []);

  const fetchDairys = async () => {
  // const res = await axios.get<Dairy[]>("http://localhost:3000/dairy");
  // setDairys(res.data);
   try {
      const res = await axios.get<Dairy[]>("http://localhost:3000/dairy");
      setDairys(res.data);
    } catch (error) {
      console.error("Failed to fetch dairys", error);
    }
  };

 const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: "success" | "error";
    msg: string;
  }>({
    open: false,
    type: "success",
    msg: "",
  });
   useEffect(() => { fetchDairys(); }, []);

  const handleAddDairy = async (newDairy:Dairy) => {
      try {
      const res= await axios.post<Dairy>("http://localhost:3000/dairy", newDairy);
      setDairys(prev => [...prev, res.data]);
     // await fetchDairys();
      setSnackbar({
        open: true,
        type: "success",
        msg: "Dairy added successfully!",
      });
    } catch {
      setSnackbar({
        open: true,
        type: "error",
        msg: "Failed to add dairy",
      });
    }
    
   };
const handleEditDairy = (dairy: Dairy) => {
  setEditingDairy(dairy);   // preload selected card data
  setOpenEdit(true);        // open edit dialog
};
 const  handleUpdateDairy = async () => {
  
  if (!editingDairy) return;
    try {
        
        const res =await axios.put<Dairy>(`http://localhost:3000/dairy/${editingDairy.id}`, editingDairy);
        setDairys(prev =>   prev.map(d => (d.id === editingDairy.id ? res.data : d)));
      
      setSnackbar({
        open: true,
        type: "success",
        msg: "Dairy updated successfully!",
      });
       setOpenEdit(false);
    setEditingDairy(null);
      
    } catch {
      setSnackbar({
        open: true,
        type: "error",
        msg: "Failed to update dairy",
      });
    }
    
  };

  const handleDeleteDairy = async (id: string) => {
    if (!id) {
    console.error("Missing ID, cannot delete");
    return;
  }
    try {
      await axios.delete(`http://localhost:3000/dairy/${id}`);
      setDairys(prev => prev.filter(d => d.id !== id));


      setSnackbar({
        open: true,
        type: "success",
        msg: "Dairy deleted successfully!",
      });
    } catch {
      setSnackbar({
        open: true,
        type: "error",
        msg: "Failed to delete dairy",
      });
    }
};


  return (
    <>
       <div style={{ minHeight: "100vh", backgroundColor: "#08c29a" }}>
       <BasketProvider>
       {/* {isLoggedIn && <Header />} */}
        <Header /> 
       <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/"  element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <DairyManager  dairys={dairys}
                onAddDairy={handleAddDairy} 
               onEditDairy={handleEditDairy}
                      onDeleteDairy={handleDeleteDairy}/>
          </ProtectedRoute>}/>    

        <Route  path="/basket"   element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <BasketPage />
            </ProtectedRoute>}/>

            {/* Admin Only */}
       <Route  path="/admin" element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                 <AdminDashboard  dairys={dairys}
                      onAddDairy={handleAddDairy}
                      onEditDairy={handleEditDairy}
                      onDeleteDairy={handleDeleteDairy}/>
              </ProtectedRoute>}/>
      </Routes>
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
      <DialogTitle>Edit Dairy</DialogTitle>
      <DialogContent>
        <TextField  label="Dairy Name"
                    value={editingDairy?.name || ""}
                    onChange={(e) => setEditingDairy(prev =>
                          prev ? { ...prev, name: e.target.value } : prev )}
                   // error={!!editingDairy?.name}
                    fullWidth      margin="normal"/>
       <TextField  label="Dairy Type"
                     value={editingDairy?.type|| ""}
                    onChange={(e) => setEditingDairy(prev =>
                          prev ? { ...prev, type: e.target.value as Dairy["type"]} : prev )}
                    //error={!!editingDairy?.type}
                    fullWidth      margin="normal"/>  
      <TextField  label="Dairy Price" type="number"
                     value={editingDairy?.price|| ""}
                    onChange={(e) =>  setEditingDairy(prev =>
                          prev ? { ...prev, price: +e.target.value } : prev)}
                   // error={!!editingDairy?.price}
                    fullWidth      margin="normal"/>                     
      <TextField  label="Fat Percentage" type="number"
                    name="fatpercentage" value={editingDairy?.fatPercentage ?? ""}
                    onChange={(e) =>  setEditingDairy(prev =>
                     prev ? { ...prev, fatPercentage: Number(e.target.value) } : prev)}
                    fullWidth      margin="normal"/>         
      </DialogContent>
      <DialogActions><Button onClick={() => setOpenEdit(false)}>Cancel</Button>
              <Button onClick={handleUpdateDairy} variant="contained">
                Save
              </Button>
      </DialogActions>
    </Dialog>
      <Footer/>
    
    </BasketProvider>
    </div>
    </>
  )
}

export default App
{/* {isLoggedIn && <Footer />} */}