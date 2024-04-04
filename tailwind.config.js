// tailwind.config.js
const { nextui } = require("@nextui-org/react");
const defaultColors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920rem',
      '4xl': '2560px',

    },
    colors: {
      ...defaultColors,
      'grey': {
        100: 'red',
        200: "#bdc8ff17",
        300: "#eff5ffb1",
        400: "#d4e4fe31",
        500:'rgb(220,220,220)',
        600: '#4B5563'
      },
      'primary-color': "rgb(74,153,157)",
      'card-color': "rgb(249,250,251)",
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontWeight: {
      'thin': '100',
      'extralight': '200',
      'light': '300',
      'normal': '400',
      'medium': '500',
      'semibold': '600',
      "bold": '700',
      'extra-bold': '800',
      "black": '900',
    },
    // fontSize: {
    //   "sm": '0.8rem',
    //   "base": '1rem',
    //   "xl": '1.25rem',
    //   '2xl': '1.563rem',
    //   '3xl': '1.953rem',
    //   '4xl': '2.441rem',
    //   '5xl': '3.052rem',
    // },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],

    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      zIndex: {
        '100': '100',
      }
    }
  },
  plugins: [nextui()],
};