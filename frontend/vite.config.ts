import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@api': path.resolve(__dirname, 'src/api'),
        },
    },
    plugins: [react(), tailwindcss()],
});
