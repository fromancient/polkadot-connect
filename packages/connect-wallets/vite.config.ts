// Importing necessary plugins and dependencies
import react from '@vitejs/plugin-react' // React plugin for Vite
import { defineConfig } from 'vite' // Function to define the Vite configuration
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js' // Plugin to inject CSS via JS
import dts from 'vite-plugin-dts' // Plugin for TypeScript definition generation
import svgr from 'vite-plugin-svgr' // Plugin to import SVGs as React components

// Vite configuration for building the library
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts', // Entry file for the library
      name: '@talismn/connect-wallets', // Library name
      formats: ['es', 'cjs'], // Output formats: ES module and CommonJS
      fileName: 'connect-wallets', // Output file name
    },
    rollupOptions: {
      external: [
        // External dependencies to exclude from the bundle
        '@polkadot/api', // Polkadot API
        '@polkadot/extension-inject', // Polkadot extension injection
        'react', // React
        'react-dom', // React DOM
      ],
    },
    emptyOutDir: false, // Prevents emptying the output directory before build
  },
  plugins: [
    react(), // Add React plugin
    svgr(), // Add SVGR plugin
    cssInjectedByJsPlugin({ dev: { enableDev: true } }), // Add CSS-injected-by-JS plugin with dev mode
    dts({ tsconfigPath: './tsconfig.app.json', rollupTypes: true }), // Add DTS plugin with specified TypeScript config
  ],
})
