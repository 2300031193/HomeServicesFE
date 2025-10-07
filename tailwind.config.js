export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#FF6A3D", // sunset orange
        soft: "#F8F6F4",
        deep: "#0F1724"
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out'
      }
    }
  },
  plugins: []
}