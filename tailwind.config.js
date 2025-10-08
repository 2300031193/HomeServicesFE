export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'light-cream': '#FAF8F1',
        'light-yellow': '#FAEAB1',
        'teal-dark': '#34656D',
        'charcoal': '#334443',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out'
      }
    }
  },
  plugins: []
}