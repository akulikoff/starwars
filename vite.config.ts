import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
function _resolve(dir) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0", // listen to all ip
    port: 3010, // Project Port
  },
  resolve: {
    alias: {
      "@": _resolve("src"), // Other name
    },
  },
})
