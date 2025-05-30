import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Chrono',
      fileName: (format) => `chrono.${format}.js`,
      formats: ['es', 'umd', 'cjs']
    },
    sourcemap: true,
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
});
