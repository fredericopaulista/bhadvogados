/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./**/*.html",
        "./scripts/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#0f172a',
                    darker: '#020617',
                    gold: '#d4af37',
                    gray: '#1e293b'
                }
            },
            fontFamily: {
                sans: ['Space Grotesk', 'sans-serif'],
                display: ['Outfit', 'sans-serif']
            }
        },
    },
    plugins: [],
}
