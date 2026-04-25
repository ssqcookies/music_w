import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 导入 Node.js 的 path 模块


export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic' // 开启自动 JSX 运行时，无需手动导入 React
  })],
  server: {
    port: 5173, // Vite 默认端口，可根据需要修改
    proxy: {
      // 代理所有以 '/api' 开头的请求
      '/api': {
        // 将请求代理到你的 Vercel 生产环境
        // target: 'https://music-w-nine.vercel.app', 
        target: 'https://music-w-nine.vercel.app', 
        changeOrigin: true, // 改变请求头中的 origin，通常需要开启
        secure: false, // 如果代理目标是 HTTPS，但证书无效，设为 false (本地开发常用)
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Host', 'music-w-nine.vercel.app');
            proxyReq.setHeader('Origin', 'http://localhost:5173'); // 可选，但推荐
          });
        },
      },
    }
  },
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
