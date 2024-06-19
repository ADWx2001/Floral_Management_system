  import flowbitePlugin from 'flowbite/plugin';
  import tailwindScrollbar from 'tailwind-scrollbar';

  /** @type {import( 'tailwindcss' ).Config} */
  
  export default {
    
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      'node_modules/flowbite-react/lib/esm/**/*.js',
    ],
    theme: {
      extend: {
        colors:{
          'primary':'#D63096'
        },
        fontFamily:{
          tangerine:['Tangerine'],
          cinzel:['Cinzel'],
          Lavish:['sans-serif'],
        },
        keyframes: {
          fadeInLeft: {
            '0%': { opacity: '0', transform: 'translateX(-50px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          fadeInRight: {
            '0%': { opacity: '0', transform: 'translateX(50px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          fadeInBottom: {
            '0%': { opacity: '0', transform: 'translateY(50px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
        animation: {
          fadeInBottom: 'fadeInBottom 1s ease-in-out forwards',
          fadeInLeft: 'fadeInLeft 1.5s ease-in-out forwards',
          fadeInRight: 'fadeInRight 1.5s ease-in-out  forwards'
        },
      },

    },
    plugins: [
      flowbitePlugin, tailwindScrollbar,
    ],
  }
