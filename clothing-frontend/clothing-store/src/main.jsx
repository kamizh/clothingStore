import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import { CityProvider } from "./context/CityContext.jsx";

createRoot(document.getElementById('root')).render(
    <CityProvider>
      <App/>
  </CityProvider>
  
)
