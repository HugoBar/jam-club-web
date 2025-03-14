import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.API_URL': JSON.stringify(env.API_URL),
      'process.env.BUG_REPORT_LINK': JSON.stringify(env.BUG_REPORT_LINK)
    },
    plugins: [react()],
    base: "/"
  }
})