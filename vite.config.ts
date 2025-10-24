import {defineConfig} from 'vite';
import eslint from 'vite-plugin-eslint';
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
    plugins: [
        eslint({
            cache: false,
            include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
            exclude: ['node_modules'],
        }),
        dts(),
    ],
});