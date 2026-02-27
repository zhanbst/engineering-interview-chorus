import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: __dirname,
    setupFiles: ['./src/test-setup.ts'],
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
      jsc: {
        transform: {
          decoratorMetadata: true,
        },
      },
    }),
  ],
});
