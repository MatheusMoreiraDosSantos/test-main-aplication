import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  esbuild: {
    target: "es2022",
  },
  plugins: [
    react(),
    federation({
      remotes: {
        partnerApplication: "http://localhost:5174/dist/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
