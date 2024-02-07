module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat Variable','sans-serif'],
        logo: ['Fira Mono','sans-serif'],
      },
      colors: {
        'mypurple': '#6B43B8',
        'mypink':'#FF84E9',
        'mycoral':'#ff7f50',
        'mydarkbg':'#433E79',
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}