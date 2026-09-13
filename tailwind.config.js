/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#0a0d0b",
          deep: "#050706",
          soft: "#10140f",
        },
        stone: {
          100: "#dfe3dd",
          200: "#b9c0b6",
          300: "#93a08f",
          400: "#727f6d",
          500: "#565f52",
          600: "#42493f",
          700: "#31362c",
          800: "#22251d",
          900: "#171911",
        },
        moon: "#cfd8ce",
        ember: "#8a5a3c",
        will: {
          DEFAULT: "#6fae8c",
          dim: "#4c7e64",
          bright: "#a8e0c4",
        },
        parchment: "#e9e4d6",
      },
      fontFamily: {
        display: ["'Cinzel'", "serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        stone: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -12px 24px rgba(0,0,0,0.45), 0 12px 30px rgba(0,0,0,0.55)",
        glow: "0 0 24px rgba(111, 174, 140, 0.25)",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateX(-8%) translateY(0)" },
          "50%": { transform: "translateX(4%) translateY(-2%)" },
          "100%": { transform: "translateX(-8%) translateY(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: 0.55 },
          "45%": { opacity: 0.9 },
          "50%": { opacity: 0.4 },
          "55%": { opacity: 0.85 },
        },
        riseIn: {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        emerge: {
          "0%": { opacity: 0, transform: "translateY(40px) scale(0.92)" },
          "60%": { opacity: 1 },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        shimmerText: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        drift: "drift 34s ease-in-out infinite",
        "drift-slow": "drift 52s ease-in-out infinite reverse",
        flicker: "flicker 6s ease-in-out infinite",
        "rise-in": "riseIn 0.7s cubic-bezier(0.16,1,0.3,1) both",
        emerge: "emerge 0.8s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmerText 6s linear infinite",
      },
    },
  },
  plugins: [],
};
