/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
    extend: {
        colors: {
            headerBg: {
                DEFAULT: '#00628B',
            },
            buttonBg: {
                DEFAULT: '#00F4F4',
            },
            buttonBg2: {
                DEFAULT: '#0D2144',
            },
        },
        backgroundImage: theme => ({
            'img': "url('/bg.jpg')",
        }),
    },
};


