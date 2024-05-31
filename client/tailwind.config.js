/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
    extend: {
        colors: {
            headerBg: {
                DEFAULT: '#00628B',
            },
            backgroundImage: {
                'bg-img': "url('src/public/bg.jpg')",
            },
        },
    },
};


