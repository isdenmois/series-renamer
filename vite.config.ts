import { resolve } from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  build: {
    rollupOptions: {
      input: [
        './src/main.tsx',
        './src/background.ts',
      ],
      output: {
        manualChunks: undefined,
        format: 'commonjs',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  plugins: [solidPlugin()],
  resolve: {
    alias: {
      api: resolve(__dirname, './src/api'),
      components: resolve(__dirname, './src/components'),
      features: resolve(__dirname, './src/features'),
      libs: resolve(__dirname, './src/libs'),
      pages: resolve(__dirname, './src/pages'),
    },
  },
})
