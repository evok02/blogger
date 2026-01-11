/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Roboto", "sans-serif"]
            }, 
            girdTemplateColumns: {
                '70/30': '70% 28%',
            },
        },
    },
plugins: [
 ],
}
