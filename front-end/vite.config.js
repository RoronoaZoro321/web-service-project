import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            "/api/v1/esb/auth": {
                target: "http://127.0.0.1:3000",
                changeOrigin: true,
                secure: false,
            },
            "/api/v1/esb/users": {
                target: "http://127.0.0.1:3000",
                changeOrigin: true,
                secure: false,
            },
            "/api/v1/esb/transaction": {
                target: "http://127.0.0.1:3000",
                changeOrigin: true,
                secure: false,
            },
            "/api/v1/esb/topup": {
                target: "http://127.0.0.1:3000",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
