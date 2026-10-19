import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import { PrivacyPage } from "./components/PrivacyPage";
import "./index.css";

const root = document.getElementById("privacy-root");

if (!root) {
  throw new Error("Privacy root element missing");
}

createRoot(root).render(
  <StrictMode>
    <PrivacyPage />
  </StrictMode>,
);
