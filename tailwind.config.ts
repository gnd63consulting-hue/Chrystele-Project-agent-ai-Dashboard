import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CARIBEquity Brand Colors
        turquoise: {
          DEFAULT: "#00B7B1",
          50: "#E6F9F8",
          100: "#B3EFED",
          200: "#80E5E2",
          300: "#4DDBD7",
          400: "#1AD1CC",
          500: "#00B7B1",
          600: "#009A95",
          700: "#007D79",
          800: "#00605D",
          900: "#004341",
        },
        coral: {
          DEFAULT: "#FF6F61",
          50: "#FFF0EE",
          100: "#FFD9D5",
          200: "#FFC2BB",
          300: "#FFABA1",
          400: "#FF9487",
          500: "#FF6F61",
          600: "#FF4A38",
          700: "#FF250F",
          800: "#E50B00",
          900: "#BC0900",
        },
        "deep-sea": {
          DEFAULT: "#0C2A3E",
          50: "#E8EDF1",
          100: "#C5D3DC",
          200: "#A2B9C7",
          300: "#7F9FB2",
          400: "#5C859D",
          500: "#3D6680",
          600: "#2E4D60",
          700: "#1F3440",
          800: "#0C2A3E",
          900: "#061520",
        },
        "plantain-green": {
          DEFAULT: "#2FA856",
          50: "#E9F7ED",
          100: "#C8EBD3",
          200: "#A7DFB9",
          300: "#86D39F",
          400: "#65C785",
          500: "#2FA856",
          600: "#268A47",
          700: "#1D6C38",
          800: "#144E29",
          900: "#0B301A",
        },
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
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
