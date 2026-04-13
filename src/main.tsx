import ReactDOM from "react-dom/client";
import { AuthProvider } from "./components/AuthContext";
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import React from "react";

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,

// )

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
