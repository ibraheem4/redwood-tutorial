/** @type {import('tailwindcss').Config} */

const isStorybook = process.env.IS_STORYBOOK === 'true'

module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: isStorybook ? 'class' : 'media',
}
