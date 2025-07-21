/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: { 
      colors: { 
        // Primary Colors
        "hc-dark-blue": "#0A1C2B", // Dark Jungle
        "hc-orange": "#F04D25", // Flame
        
        // Secondary Colors
        "hc-navy": "#1B2E58", // Space Cadet
        "hc-beige": "#EEEEEC", // Bright Grey
        "hc-light-blue": "#849AB4", // Weldon Blue
        
        // Tertiary Colors
        "hc-grey": "#6D6E71", // Dark Silver
        
        // Legacy brand colors for compatibility
        brand: "#F04D25", // HC Orange
        "brand-dark": "#0A1C2B", // HC Dark Blue
        "hypercharge-blue": "#0A1C2B", // HC Dark Blue
        "hypercharge-blue-light": "#1B2E58", // HC Navy
        "hypercharge-orange": "#F04D25", // HC Orange
        "hypercharge-orange-light": "#F04D25", // HC Orange
      } 
    },
  },
  plugins: [],
};
  