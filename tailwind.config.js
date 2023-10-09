/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      fontFamily: {
        roboto : ['Roboto', 'Sans Serif']
      },

      fontSize : {
        'xl': ['1.5rem', {
          lineHeight: '1.875rem',
          letterSpacing: '0px',
          fontWeight: '700',
        }],
        'l': ['1.125rem', {
          lineHeight: '1.4375rem',
          letterSpacing: '0px',
          fontWeight: '700',
        }],
        'md': ['0.9375rem', {
          lineHeight: '1.1875rem',
          letterSpacing: '0px',
          fontWeight: '700',
        }],
        'sm': ['0.75rem', {
          lineHeight: '0.9375rem',
          letterSpacing: '0px',
          fontWeight: '700',
        }],
        'body-l': ['0.8125rem', {
          lineHeight: '1.4375rem',
          letterSpacing: '0px',
          fontWeight: '500',
        }],
        'body-md': ['0.75rem', {
          lineHeight: '0.9375rem',
          letterSpacing: '0px',
          fontWeight: '500',
        }],
        'body-sm-mod': ['0.75rem', {
          lineHeight: '1.5rem',
          letterSpacing: '0px',
          fontWeight: '500',
        }],
      },

      colors: {
        'primary' : '',
        'primary-light': '',
        'primary-dark': '',
        'secondary': '',
        'secondary-light':'',
        'secondary-dark' : '',
        'accent-one': '',
        'accent-two': '',
      },

      screens : {
        mob : '378px',
        tb : '768px',
        dk : '1440px'
       },

       borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }
    },
  },
  plugins: [],
}