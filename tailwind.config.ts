import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
  	extend: {
  		fontFamily: {
  			poppins: ['Poppins', 'sans-serif']
  		},
  		colors: {
  			'fortune-rabbit-color': 'rgb(13, 28, 124)',
  			'fortune-tiger-color': 'rgb(173, 3, 10)',
  			'fortune-ox-color': 'rgb(122, 1, 0)',
  			'fortune-mouse-color': 'rgb(103, 2, 9)',
  			'fortune-dragon-color': 'rgb(121, 75, 164)',
  			'yellow-fp': 'rgba(254,230,21,255)',
  			'green-fp': 'rgba(35,101,74,255)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			'pulse-slow': 'pulse 3s linear infinite'
  		},
  		backgroundImage: {
  			'image-insta': 'url(../../public/image/banner/botão-site-sem-fundo.png)',
  			'image-dolar': 'url(../../public/image/fundo-dolar.png)',
  			'custom-mask': 'linear-gradient(to bottom, transparent 0%, transparent 60%, #000 94%, #000 100%)',
  			'image-desktop': 'url(../../public/bg-teste1.jpg)',
  			'image-mobile': 'url(../../public/bg-teste1.jpg)',
  			'fortune-rabbit': 'url(/image/bg-sinais/bg-rabbit.jpg)',
  			'fortune-tiger': '/image/bg-sinais/bg-tiger.jpg',
  			'fortune-ox': 'url(/image/bg-sinais/bg-ox.jpg)',
  			'fortune-mouse': 'url(/image/bg-sinais/bg-mouse.jpg)',
  			'fortune-dragon': 'url(/image/bg-sinais/bg-dragon.png)'
  		},
  		maskImage: {
  			'custom-mask': 'linear-gradient(to bottom, transparent 0%, transparent 60%, #000 94%, #000 100%)'
  		},
  		WebkitMaskImage: {
  			'custom-mask': '-webkit-gradient(linear, left top, left bottom, color-stop(0%, transparent), color-stop(60%, transparent), color-stop(94%, #000), color-stop(100%, #000))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require('tailwind-scrollbar'),
      require("tailwindcss-animate")
],
};
export default config;