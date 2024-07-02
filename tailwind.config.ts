import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glassmorph": "url('/assets/img/background/bg-glassmorphism.png')",
        "products": "url('/assets/img/background/bg-products.png')",
        "ice": "url('/assets/img/background/bg-ice.png')",
        "ice2": "url('/assets/img/background/bg-ice2.png')",
      },
      colors: {
        primary: {
          50: '#ECFEFF',
          100: '#D0FAFD',
          200: '#A7F2FA',
          300: '#6BE7F5',
          400: '#27D1E9',
          500: '#0BB5CF',
          600: '#0D99B8',
          700: '#11748D',
          800: '#175E73',
          900: '#184E61',
          950: '#0B3341',
          black: '#000000',
          white: '#FFFFFF',
        },
        text: {
          primary: '#101720'
        },
        glass: {
          primary: {
            600: {
              30: 'rgb(13, 153, 184, 0,30)'
            }
          },
          white: {
            10: 'rgba(255, 255, 255, 0.10)',
            15: 'rgba(255, 255, 255, 0.15)',
            20: 'rgba(255, 255, 255, 0.20)',
            30: 'rgba(255, 255, 255, 0.30)',
            40: 'rgba(255, 255, 255, 0.40)',
          }
        }
      },
      boxShadow: {
        'primary': '2px 6px 4px 0px rgba(0, 0, 0, 0.12)',
        'primary-hover': '4px 10px 10px 0px rgba(0, 0, 0, 0.25)',
        'secondary': '4px 10px 12px 0px rgba(0, 0, 0, 0.25)',
        'glass': '5px 8px 20px 0px rgba(0, 0, 0, 0.12)'
      },
      fontSize: {
        'text-h1': '1rem',
        'text-h1-bold': '1rem',
      },
      spacing: {
        '26': '6.25rem',
      },
      borderRadius: {
        '2lg': '0.625rem',
      }
    },
  },
  plugins: [],
};
export default config;
