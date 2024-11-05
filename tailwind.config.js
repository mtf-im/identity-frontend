/** @type {import('tailwindcss').Config} */
import { presetVarlet } from "@varlet/preset-tailwindcss";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {},
  },
  presets: [presetVarlet()],
  plugins: [],
};
