import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    proxy: {
        "/api/v1/esb/auth/login": {
            target: "http://localhost:3000",
            changeOrigin: true,
        },
    },
});
