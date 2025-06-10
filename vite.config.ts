import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: "./dist/report.html",
      open: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          gltfLoader: ["three/examples/jsm/loaders/GLTFLoader.js"],
          orbitControls: ["three/examples/jsm/controls/OrbitControls.js"],
          dracoLoader: ["three/examples/jsm/loaders/DRACOLoader.js"],
          environment: ["@/entities/environment/system/environment.ts"],
          tree: ["@/entities/environment/tree/tree.ts", "@/entities/environment/tree/presets"],
        },
      },
    },
  },
});
