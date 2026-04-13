// src/pages/AdminDashboard/AdminDashboard.tsx
import { Box, Typography } from "@mui/material";
import type { JSX } from "react";
import type { Dairy } from "../types/Dairy";
import DairyManager from "./DairyManager";

interface AdminDashboardProps {
  dairys: Dairy[];
  onAddDairy: (dairy: Dairy) => void;
  onEditDairy: (dairy: Dairy) => void;
  onDeleteDairy: (id: string) => void;
}

export default function AdminDashboard({ dairys, onAddDairy,   onEditDairy,  onDeleteDairy}: AdminDashboardProps): JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom>
        Admin Dashboard
      </Typography>

    <DairyManager dairys={dairys}
        onAddDairy={onAddDairy}
        onEditDairy={onEditDairy}
        onDeleteDairy={onDeleteDairy}
      />
     
    </Box>
  );
}
