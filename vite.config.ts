import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 项目页部署在 /<仓库名>/ 下，构建时用相对路径避免写死仓库名
  base: process.env.GITHUB_ACTIONS ? './' : '/',
  plugins: [vue()],
})
