import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 导入 Node.js 的 path 模块


export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic' // 开启自动 JSX 运行时，无需手动导入 React
  })],
  test: {
    environment: 'jsdom',
    globals: true, // 👈 关键！启用全局 API（vi, expect 等）
    setupFiles: './src/setupTests.ts', // 可选
    // 确保 include 能匹配到你的测试文件路径
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', 'dist']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 设置 '@' 指向 'src' 目录
    },
  },
})
