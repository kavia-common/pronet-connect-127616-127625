import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Mounts the entire app, with routing, context etc.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
