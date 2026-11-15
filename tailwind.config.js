/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1F1611', deep: '#2D1F17', ink: '#140D09' },
        electric: '#F2611D', // warm signal orange (accent)
        cyan: { accent: '#FFB067' }, // amber highlight
        soft: '#FBF1EA',
        ink: '#2A2420',
        muted: '#7A6D66',
      },
      fontFamily: {
        worksans: ['"Work Sans Variable"', '"Work Sans"', 'system-ui', 'sans-serif'],
        manrope: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1.5rem', sm: '2.5rem', lg: '4rem', xl: '5rem' },
        screens: { '2xl': '1440px' },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #F2611D 0%, #F98A3C 60%, #FFB067 100%)',
      },
      keyframes: {
        marqueeRtl: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        marqueeLtr: { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
      },
      animation: {
        'marquee-rtl': 'marqueeRtl 34s linear infinite',
        'marquee-ltr': 'marqueeLtr 28s linear infinite',
      },
    },
  },
  plugins: [],
}
