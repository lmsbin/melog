import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                nexon_gothic: ['nexon_gothic'],
            },
            colors: {
                ability: {
                    legendary: '#00FF00',
                    unique: '#FFD700',
                    epic: '#800080',
                    rare: '#0000FF',
                },
            },
        },
    },
    plugins: [],
};

export default config;
