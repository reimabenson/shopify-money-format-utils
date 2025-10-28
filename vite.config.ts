import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ShopifyMoneyFormatUtils',
      fileName: (format) => `shopify-money-format-utils.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [],
      output: {
        exports: 'named',
        compact: true
      }
    },
    minify: 'esbuild',
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      rollupTypes: true
    })
  ]
});
