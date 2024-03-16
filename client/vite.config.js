import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // server: {
  // https: {
  //   key: "key.pem",
  //   cert: "cert.pem",
  //   // Specify supported protocols
  //   minVersion: "TLSv1.2",
  // },
  // },
});
