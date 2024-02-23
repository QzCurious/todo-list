import { unstable_vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  optimizeDeps: {
    holdUntilCrawlEnd: false,
  },
  css: {
    preprocessorMaxWorkers: true,
  },
  server: {
    port: 13001,
  },
  plugins: [remix({ unstable_ssr: false }), tsconfigPaths()],
})
