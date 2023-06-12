/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./popup/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#358EF4",
        secondary: "#2F353C",
        danger: "#FF4233",
        muted: "#8E8EAE",
        warning: "#ff6600",
        hover: "#e7f1ffb0",
        success: "#2FEB50",
        background: "#DBE1F9",
        modal: "#DBE1F9",
        border: "#C9C9E6",
        notification: "#8E8EAE",
        card: "#E7F1FF",
        button: "#F6F9FF",
        text: "#32335A",
      },
    },
  },
  plugins: [],
};
