/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './app/**/*.{vue,ts}',
        './components/**/*.{vue,ts}',
        './pages/**/*.{vue,ts}',
        './layouts/**/*.{vue,ts}',
        './server/**/*.{ts,js}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                business: {
                    "primary": "#0ea5e9",
                    "secondary": "#64748b",
                    "accent": "#f97316",
                    "neutral": "#1f2937",
                    "base-100": "#ffffff",
                    "info": "#3b82f6",
                    "success": "#22c55e",
                    "warning": "#facc15",
                    "error": "#ef4444",
                    "base-200": "#1f2937",
                    "base-300": "#111827"
                },
            },
        ],
        defaultTheme: "business",   // thème par défaut
        darkTheme: "business",      // thème utilisé pour le mode dark
    },
};
