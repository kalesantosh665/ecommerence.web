// src/main.jsx (or src/index.jsx)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Get the root DOM element
const container = document.getElementById("root");
const root = createRoot(container);

// Render the React app
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
