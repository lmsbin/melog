import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                nexon_gothic: ['nexon_gothic'],
            },
            colors: {
                primary: {
                    DEFAULT: '#1f2937', // gray-800
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                },
                // 어빌리티 등급별 색상 (기존 + 의미 있는 이름)
                ability: {
                    legendary: '#800080', // purple
                    unique: '#FFD700', // gold
                    epic: '#0000FF', // blue
                    rare: '#00FF00', // green (기존 legendary에서 변경)
                },
            },
            // 간격 시스템
            spacing: {
                xs: '0.5rem', // 8px
                sm: '0.75rem', // 12px
                md: '1rem', // 16px
                lg: '1.5rem', // 24px
                xl: '2rem', // 32px
                '2xl': '3rem', // 48px
            },
            // Border Radius
            borderRadius: {
                sm: '0.375rem', // 6px
                md: '0.5rem', // 8px
                lg: '0.75rem', // 12px
                xl: '1rem', // 16px
            },
            // Shadow 시스템
            boxShadow: {
                sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
            // Transition 지속 시간
            transitionDuration: {
                fast: '150ms',
                normal: '200ms',
                slow: '300ms',
            },
        },
    },
    plugins: [],
} satisfies Config;

export default config;
