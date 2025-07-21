/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: { 
      colors: { 
        brand: "#FF6B35", // Hypercharge Orange
        "brand-dark": "#E55A2B",
        "hypercharge-blue": "#1E3A8A", // Dark Blue
        "hypercharge-blue-light": "#3B82F6",
        "hypercharge-orange": "#FF6B35",
        "hypercharge-orange-light": "#FF8A65"
      } 
    },
  },
  plugins: [],
};
  