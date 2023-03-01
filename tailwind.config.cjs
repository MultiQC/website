/** @type {import('tailwindcss').Config} */
/* eslint-disable no-multi-spaces, key-spacing */

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "node_modules/website-components/**/*.jsx",
  ],
  theme: {
    fontFamily: {
      display: ["SF UI Display", "Helvetica", "sans-serif"],
      body: ["SF UI Display", "Helvetica", "sans-serif"],
      sans: ["SF UI Display", "Helvetica", "sans-serif"],
    },
    fontSize: {
      xs: ["0.875rem", "1.5rem"],
      sm: ["1rem", "1.5rem"],
      base: ["1.125rem", "2rem"],
      lg: ["1.25rem", "2rem"],
      xl: ["1.5rem", "1.6"],
      "2xl": ["2rem", "2.5rem"],
      "3xl": ["2.5rem", "3.5rem"],
      "4xl": ["3rem", "4rem"],
      "5xl": ["4rem", "5rem"],
      "6xl": ["5rem", "6.5rem"],
      "7xl": ["4.5rem", "1"],
      "8xl": ["5.5rem", "1"],
      "9xl": ["7.5rem", "1"],
    },
    borderRadius: {
      sm: "4px",
      md: "12px",
      full: "9999px",
    },
    extend: {
      keyframes: {
        scroll: {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(calc(-100% - 32px))",
          },
        },
        flow: {
          "0%": {
            "background-position": "-2000px -2000px",
          },
          "10%": {
            "background-position": "-1500px -1500px",
          },
          "30%": {
            "background-position": "-400px -400px",
          },
          "50%": {
            "background-position": "-100px -100px",
          },
          "70%": {
            "background-position": "-300px -500px",
          },
          "100%": {
            "background-position": "500px 500px",
          },
        },
      },
      animation: {
        scroll: "scroll 6s linear infinite",
        flow: "flow 8s linear infinite",
      },
      colors: {
        gray: {
          50: "#F8F9FA",
          100: "#F3F4F6",
          200: "#E1E1E1",
          300: "#A9ADB4",
          500: "#6F757B",
          600: "#5B6166",
          700: "#444444",
          800: "#282828",
          900: "#111111",
        },
        blue: {
          600: "#1d71b8",
          800: "#283242",
        },
        indigo: {
          100: "#E8EAFF",
          200: "#DEEBFD",
          500: "#6971FC",
          600: "#4256e7",
        },
        white: "#F8F9FA", //colors.gray[50],
      },
      margin: {
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        "-1/12": "-8.333333%",
        "-2/12": "-16.666667%",
        "-3/12": "-25%",
        "-4/12": "-33.333333%",
        "-5/12": "-41.666667%",
        "-6/12": "-50%",
        "-7/12": "-58.333333%",
        "-8/12": "-66.666667%",
        "-9/12": "-75%",
        "-10/12": "-83.333333%",
        "-11/12": "-91.666667%",
      },
      flex: {
        "1/1": "0 0 100%",
        "1/12": "0 0 8.333333%",
        "2/12": "0 0 16.666667%",
        "3/12": "0 0 25%",
        "4/12": "0 0 33.333333%",
        "5/12": "0 0 41.666667%",
        "6/12": "0 0 50%",
        "7/12": "0 0 58.333333%",
        "8/12": "0 0 66.666667%",
        "9/12": "0 0 75%",
        "10/12": "0 0 83.333333%",
        "11/12": "0 0 91.666667%",
      },
      height: {
        18: "4.5rem",
      },
      minWidth: {
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
      },
      minHeight: {
        96: "24rem",
      },
      transitionDuration: {
        1500: "1500ms",
      },
      shadow: {
        default: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        xl: "0 2px 21px 11px rgba(0,0,0,0.05)",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // Match style to main site
            "h1, h2, h3, h4, h5, h6, p, code, pre, ul": {
              "-webkit-font-smoothing": "antialiased",
              "-moz-osx-font-smoothing": "grayscale",
            },
            "h1, h2, h3, h4, h5, h6": {
              fontWeight: "600",
            },
            "p, ul": {
              // fontSize: "1.125rem",
              // lineHeight: "2rem",
              color: theme("colors.gray.700"),
            },
            a: {
              wordWrap: "break-word", // long links break layout on small screens
            },
            "a.btn-primary, a.btn-secondary": {
              textDecoration: "none",
            },
            // Some colour to inline code
            ":not(pre) > code": {
              color: theme("colors.sky.900"),
              backgroundColor: theme("colors.sky.100"),
              borderRadius: theme("borderRadius.sm"),
              padding: "0.15rem 0.3rem",
              margin: "0 0.1rem",
            },

            // No backticks for inline code
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
        invert: {
          css: {
            // Custom colours as above, but for dark mode
            "p, ul": {
              color: theme("colors.gray.300"),
            },
            ":not(pre) > code": {
              color: theme("colors.sky.200"),
              backgroundColor: theme("colors.sky.900 / 25%"),
            },

            // No backticks for inline code
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
