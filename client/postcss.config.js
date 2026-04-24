//We use postcss.config.js to transform our tailwind into actual css code so that the browser can understand it.
//It's like Babel for tailwind. 
export default {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {},
    },
}