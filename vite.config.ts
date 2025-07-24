import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'AQueryHeader',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', '@arco-design/web-vue'],
      output: {
        globals: {
          vue: 'Vue',
          '@arco-design/web-vue': 'ArcoVue',
        },
      },
    },
  },
  plugins: [vue(), dts()],
}); 