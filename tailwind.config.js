/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary" : "rgba(var(--primary))", 
        "secondary" : "rgba(var(--secondary))", 
        "foreground" : "rgba(var(--foreground))", 
        "background" : "rgba(var(--background))", 
        "background-dark" : "rgba(var(--background-dark))", 
        "copy" : "rgba(var(--copy))", 
        "copy-light" : "rgba(var(--copy-light))", 
      },
      dropShadow : {
        "box" : "0 0 5px rgba(0,0,0,.1)"
      },
      fontFamily : {
        "montserrat" : "'Montserrat', sans-serif"
      }
    },
  },
  plugins: [],
}

