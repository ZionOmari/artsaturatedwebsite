/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {100:"#e0f2fe",500:"#0ea5e9",700:"#0369a1"},
        secondary:{100:"#fae8ff",500:"#d946ef",700:"#a21caf"},
        accent:   {100:"#fde68a",500:"#f59e0b",700:"#b45309"},
        dark:     {100:"#f3f4f6",500:"#6b7280",900:"#111827"}
      },
      fontFamily: {
        display:["Inter","system-ui","sans-serif"],
        body:["Inter","system-ui","sans-serif"]
      }
    }
  },
  plugins:[]
} 