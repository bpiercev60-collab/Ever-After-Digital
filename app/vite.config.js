import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function serveSharedData() {
  return {
    name: 'serve-shared-data',
    configureServer(server) {
      const sharedTemplates = '/home/team/shared/templates'
      const sharedBranding = '/home/team/shared/branding'

      server.middlewares.use('/shared-data/templates.json', (_req, res) => {
        const fp = path.join(sharedTemplates, 'templates.json')
        try {
          const data = fs.readFileSync(fp, 'utf-8')
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
          res.end(data)
        } catch {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Failed to load templates.json' }))
        }
      })

      server.middlewares.use('/shared-data/branding.json', (_req, res) => {
        const fp = path.join(sharedBranding, 'branding.json')
        try {
          const data = fs.readFileSync(fp, 'utf-8')
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
          res.end(data)
        } catch {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Failed to load branding.json' }))
        }
      })
    },
  }
}

export default defineConfig({
  base: '/editor/',
  plugins: [react(), serveSharedData()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
})