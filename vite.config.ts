import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/app.ts'),
      name: 'app',
      fileName: 'app',
    },
  },
  plugins: [dts()],
});