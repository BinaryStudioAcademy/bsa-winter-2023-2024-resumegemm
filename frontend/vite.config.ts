import { fileURLToPath } from 'node:url';

import svgr from 'vite-plugin-svgr';
import reactPlugin from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
    const {
        VITE_APP_PROXY_SERVER_URL,
        VITE_APP_API_ORIGIN_URL,
        VITE_APP_DEVELOPMENT_PORT,
    } = loadEnv(mode, process.cwd());

    return defineConfig({
        build: {
            outDir: 'build',
        },
        plugins: [tsconfigPathsPlugin(), reactPlugin(), svgr()],
        server: {
            port: Number(VITE_APP_DEVELOPMENT_PORT),
            proxy: {
                [VITE_APP_API_ORIGIN_URL]: {
                    target: VITE_APP_PROXY_SERVER_URL,
                    changeOrigin: true,
                },
            },
        },
        resolve: {
            alias: [
                {
                    find: '~',
                    replacement: fileURLToPath(new URL('src', import.meta.url)),
                },
            ],
        },
    });
};

export default config;
