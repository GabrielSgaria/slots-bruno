import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'fortune-rabbit-color': '#312e81',
        'fortune-tiger-color': '#dc2626',
        'fortune-ox-color': '#dc2626',
        'fortune-mouse-color': '#f59e0b',
        'fortune-dragon-color': '#312e81'

      },
      animation: {
        'pulse-slow': 'pulse 3s linear infinite',
      },
      backgroundImage: {
        'custom-mask': 'linear-gradient(to bottom, transparent 0%, transparent 60%, #000 94%, #000 100%)',
        'image-desktop': 'url(../../public/bg-casino.png)',
        'image-mobile': 'url(../../public/bg-casino-mobile.png)',
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
  plugins: [
    require('tailwind-scrollbar')
  ],
};
export default config;
