import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-modal'],  // Ensure react-modal is included
  }
  // server: {
  //   host: true,
  //   port: 3000,
  // },
})
