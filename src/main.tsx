import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/index.tsx";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router";
import './i18n/i18n'; // Import i18n configuration


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
            <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
