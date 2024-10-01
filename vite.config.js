import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      //registerType: "autoUpdate",

      devOptions: {
        enabled: false,
      },

      includeAssets: ["IB_icon.png"],
      manifest: {
        name: "Signature",
        short_name: "Sign",
        description: "Easy signature with wallet",
        theme_color: "#ffffff",
        id: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "apple touch icon",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        display: "standalone",
        display_override: ["window-controls-overlay"],
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
    }),
  ],
});
