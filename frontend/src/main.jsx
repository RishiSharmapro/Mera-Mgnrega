import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App.jsx'
import { LanguageProvider } from "./context/LanguageContextProvider.jsx";
import { BrowserRouter } from "react-router";


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
