import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'fortune-rabbit-color': 'rgb(13, 28, 124)',
        'fortune-tiger-color': 'rgb(173, 3, 10)',
        'fortune-ox-color': 'rgb(122, 1, 0)',
        'fortune-mouse-color': 'rgb(103, 2, 9)',
        'fortune-dragon-color': 'rgb(121, 75, 164)',
        'yellow-fp': 'rgba(254,230,21,255)',
        'green-fp': 'rgba(35,101,74,255)',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'pulse-slow': 'pulse 3s linear infinite',
      },
      backgroundImage: {
        'image-insta': 'url(../../public/image/banner/botão-site-sem-fundo.png)',
        'image-dolar': 'url(../../public/image/fundo-dolar.png)', 
        'custom-mask': 'linear-gradient(to bottom, transparent 0%, transparent 60%, #000 94%, #000 100%)',
        'image-desktop': 'url(../../public/09-11-2banner.jpg)',
        'image-mobile': 'url(../../public/09-11-2banner.jpg)',
        'fortune-rabbit': 'url(/image/bg-sinais/bg-rabbit.jpg)',
        'fortune-tiger': '/image/bg-sinais/bg-tiger.jpg',
        'fortune-ox': 'url(/image/bg-sinais/bg-ox.jpg)',
        'fortune-mouse': 'url(/image/bg-sinais/bg-mouse.jpg)',
        'fortune-dragon': 'url(/image/bg-sinais/bg-dragon.png)'
      },
      maskImage: {
        'custom-mask': 'linear-gradient(to bottom, transparent 0%, transparent 60%, #000 94%, #000 100%)',
      },
      WebkitMaskImage: {
        'custom-mask': '-webkit-gradient(linear, left top, left bottom, color-stop(0%, transparent), color-stop(60%, transparent), color-stop(94%, #000), color-stop(100%, #000))',
      },
    },
  },
  plugins: [animate, require('tailwind-scrollbar')],
} satisfies Config

export default config