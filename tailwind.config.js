/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '380px',
        'mobile-land': { raw: '(orientation: landscape) and (max-height: 500px)' },
      },
      fontFamily: {
        display: ['Fredoka', 'ui-rounded', 'system-ui', 'sans-serif'],
        sans: ['Quicksand', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      // Semantic colors backed by CSS variables that flip per [data-theme].
      // Defined in src/index.css.
      colors: {
        ink: 'var(--ink)',
        soft: 'var(--soft)',
        glass: 'var(--glass)',
        gline: 'var(--gline)',
        gsh: 'var(--gsh)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        chip: 'var(--chip)',
        bar: 'var(--bar)',
        card: 'var(--card)',
      },
      keyframes: {
        bob: {
          '0%,100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1deg)' },
        },
        noteFloat: {
          '0%': { transform: 'translateY(0) scale(.6)', opacity: '0' },
          '15%': { opacity: '1' },
          '100%': { transform: 'translateY(-130px) translateX(18px) scale(1.3) rotate(20deg)', opacity: '0' },
        },
        popIn: {
          '0%': { transform: 'scale(.85) translateY(20px)', opacity: '0' },
          '60%': { transform: 'scale(1.02) translateY(0)' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(26px)' },
          '100%': { transform: 'translateY(0)' },
        },
        twinkle: {
          '0%,100%': { opacity: '.2', transform: 'scale(.7)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        overlayIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatHint: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(0deg) scale(1.12)' },
          '25%': { transform: 'rotate(-14deg) scale(1.12)' },
          '75%': { transform: 'rotate(14deg) scale(1.12)' },
        },
        // Two identical keyframes so the toggle can re-trigger the spin on
        // every click by alternating the animation-name.
        spinOnce: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinOnceB: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        bob: 'bob 4.5s ease-in-out infinite',
        note: 'noteFloat 1.6s ease-out forwards',
        'pop-in': 'popIn .42s cubic-bezier(.2,.9,.25,1) both',
        'fade-up': 'fadeUp .9s cubic-bezier(.2,.8,.2,1) both',
        twinkle: 'twinkle 3s ease-in-out infinite',
        overlay: 'overlayIn .25s ease both',
        'float-hint': 'floatHint 2.6s ease-in-out infinite',
        wiggle: 'wiggle 0.35s ease-in-out',
        'spin-once': 'spinOnce .6s cubic-bezier(.34,1.45,.5,1)',
        'spin-once-b': 'spinOnceB .6s cubic-bezier(.34,1.45,.5,1)',
      },
    },
  },
  plugins: [],
};
