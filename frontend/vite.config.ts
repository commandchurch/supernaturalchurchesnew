import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    tailwindcss(),
    react({
      // Remove unnecessary JSX transform for modern browsers
      jsxRuntime: 'automatic',
      // Optimize for modern browsers
      fastRefresh: mode === 'development',
    }),
  ],
  base: './',
  build: {
    outDir: 'dist',
    minify: mode === 'production' ? 'terser' : false,
    // Target modern browsers to reduce polyfills
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react'],
          // Separate Clerk to reduce initial bundle
          auth: ['@clerk/clerk-react'],
          // Separate Stripe for better loading
          payments: ['@stripe/stripe-js'],
        },
      },
      // Remove unnecessary polyfills
      external: mode === 'production' ? [] : undefined,
    },
    sourcemap: mode === 'development',
    chunkSizeWarningLimit: 1000,
    // Optimize CSS
    cssCodeSplit: true,
    // Reduce bundle size
    reportCompressedSize: false,
  },
  server: {
    port: 5173,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    // Exclude Clerk from pre-bundling for better tree-shaking
    exclude: ['@clerk/clerk-react'],
  },
  // Optimize for modern browsers
  esbuild: {
    target: 'esnext',
    // Remove console logs in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}))
