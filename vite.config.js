import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env, // Définit les variables d'environnement
  },
  server: {
    host: "0.0.0.0",
  },
});
