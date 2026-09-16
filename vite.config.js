import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep the long-lived vendor code in its own chunks so a content edit
    // doesn't invalidate the whole bundle for returning visitors.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          // Matches react and react-dom, but not lucide-react.
          if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
            return 'react'
          }
          if (id.includes('framer-motion') || id.includes('motion-dom')) {
            return 'motion'
          }
          return undefined
        },
      },
    },
  },
})
