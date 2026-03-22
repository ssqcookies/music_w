import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // 👈 关键！启用全局 API（vi, expect 等）
    setupFiles: './src/setupTests.js', // 可选
  },
})
