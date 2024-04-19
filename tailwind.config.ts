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
        'fortune-rabbit-color': '#9d2525',
        'fortune-tiger-color': '#9d2525',
        'fortune-ox-color': '#ffff',
        'fortune-mouse-color': '#ffff',
        'fortune-dragon-color': '#9d2525'

      },
      animation: {
        'pulse-slow': 'pulse 3s linear infinite',
      },
      backgroundImage: {
        'fortune-rabbit': 'url(/image/bg-sinais/bg-rabbit.jpg)',
        'fortune-tiger': 'url(/image/bg-sinais/bg-tiger.jpg)',
        'fortune-ox': 'url(/image/bg-sinais/bg-ox.jpg)',
        'fortune-mouse': 'url(/image/bg-sinais/bg-mouse.jpg)',
        'fortune-dragon': 'url(/image/bg-sinais/bg-dragon.png)'
      },
    },
  },
  plugins: [],
};
export default config;
