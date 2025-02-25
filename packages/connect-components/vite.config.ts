// Import necessary plugins and modules
import react from '@vitejs/plugin-react' // React plugin for Vite
import { defineConfig } from 'vite' // Function to define Vite configuration
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js' // Plugin to inject CSS via JS
import dts from 'vite-plugin-dts' // Plugin to generate TypeScript declaration files
import svgr from 'vite-plugin-svgr' // Plugin to import SVG as React components

// Vite configuration export
// https://vite.dev/config/
export default defineConfig({
  build: {
    // Configuration for building the library
    lib: {
      entry: 'src/index.ts', // Entry file of the library
      name: '@polkadot/connect-components', // Library name for global usage
      formats: ['es', 'cjs'], // Build formats: ES Module and CommonJS
      fileName: 'connect-components', // Output file name (without extension)
    },
    rollupOptions: {
      // Rollup options for the build
      external: ['react', 'react-dom'], // Mark react and react-dom as external dependencies
    },
    emptyOutDir: false, // Do not empty the output directory before building
  },
  plugins: [
    react(), // Add the React plugin for JSX support
    svgr(), // Add the SVGR plugin to handle SVG files
    cssInjectedByJsPlugin({ dev: { enableDev: true } }), // Enable CSS-in-JS injection during development
    dts({ tsconfigPath: './tsconfig.app.json', rollupTypes: true }), // Generate TypeScript definitions
  ],
})
