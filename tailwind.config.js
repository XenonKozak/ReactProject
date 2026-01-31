/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cinema: {
                    900: '#000000', // Pure Black
                    800: '#121212', // Dark Gray (Material Design Standard)
                    700: '#1e1e1e', // Slightly lighter gray
                    accent: '#b91c1c', // Deep Red (Classic Cinema)
                    highlight: '#374151', // Neutral Gray Highlight
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
