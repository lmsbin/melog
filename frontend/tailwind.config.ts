import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                nexon_gothic: ['nexon_gothic'],
            },
        },
    },
    plugins: [],
};

export default config;
